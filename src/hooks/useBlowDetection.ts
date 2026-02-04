import { useState, useEffect, useRef, useCallback } from 'react';

type BlowHook = {
  isBlowing: boolean;
  level: number; // 0..1 loudness above noise floor
  startListening: () => Promise<void>;
  hasPermission: boolean;
};

export const useBlowDetection = (isActive: boolean, threshold: number = 0.12): BlowHook => {
  const [isBlowing, setIsBlowing] = useState(false);
  const [level, setLevel] = useState(0);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const rafRef = useRef<number | null>(null);

  // Noise floor calibration
  const noiseFloorRef = useRef<number>(0.02);
  const calibratingRef = useRef<boolean>(false);
  const calibrationSamplesRef = useRef<number>(0);
  const calibrationSumRef = useRef<number>(0);

  // Hysteresis (avoid flicker)
  const blowingRef = useRef<boolean>(false);

  const hardStop = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;

    try {
      streamRef.current?.getTracks().forEach((t) => t.stop());
    } catch {}

    streamRef.current = null;
    analyserRef.current = null;
    dataArrayRef.current = null;
    sourceRef.current = null;

    setIsBlowing(false);
    setLevel(0);
    blowingRef.current = false;

    if (audioContext && audioContext.state !== 'closed') {
      audioContext.close();
    }
    setAudioContext(null);
  }, [audioContext]);

  const startListening = useCallback(async () => {
    try {
      // If already started, do nothing
      if (audioContext) return;

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        } as any,
      });

      const ContextCtor = (window.AudioContext || (window as any).webkitAudioContext) as typeof AudioContext;
      const context = new ContextCtor();

      if (context.state === 'suspended') {
        await context.resume();
      }

      const analyser = context.createAnalyser();
      analyser.fftSize = 1024;
      analyser.smoothingTimeConstant = 0.85;

      const source = context.createMediaStreamSource(stream);
      source.connect(analyser);

      const dataArray = new Uint8Array(analyser.fftSize);

      analyserRef.current = analyser;
      dataArrayRef.current = dataArray;
      sourceRef.current = source;
      streamRef.current = stream;
      setAudioContext(context);

      // reset calibration
      noiseFloorRef.current = 0.02;
      calibratingRef.current = true;
      calibrationSamplesRef.current = 0;
      calibrationSumRef.current = 0;

      setLevel(0);
      setIsBlowing(false);
      blowingRef.current = false;
    } catch (err) {
      console.error('Microphone access denied or error:', err);
    }
  }, [audioContext]);

  // Stop when stage deactivates
  useEffect(() => {
    if (isActive) return;
    hardStop();
  }, [isActive, hardStop]);

  // Main analyzer loop
  useEffect(() => {
    if (!isActive || !audioContext || !analyserRef.current || !dataArrayRef.current) {
      setIsBlowing(false);
      setLevel(0);
      blowingRef.current = false;
      return;
    }

    const analyser = analyserRef.current;
    const dataArray = dataArrayRef.current;

    const check = () => {
      if (!analyser || !dataArray) return;

      analyser.getByteTimeDomainData(dataArray);

      let sumSquares = 0;
      for (let i = 0; i < dataArray.length; i++) {
        const v = (dataArray[i] - 128) / 128; // -1..1
        sumSquares += v * v;
      }
      const rms = Math.sqrt(sumSquares / dataArray.length);

      // Calibrate noise floor ~700ms (about 40 frames)
      if (calibratingRef.current) {
        calibrationSumRef.current += rms;
        calibrationSamplesRef.current += 1;

        if (calibrationSamplesRef.current >= 40) {
          const avg = calibrationSumRef.current / calibrationSamplesRef.current;
          noiseFloorRef.current = Math.min(0.15, Math.max(0.01, avg + 0.02));
          calibratingRef.current = false;
        }
      }

      const nf = noiseFloorRef.current;
      const normalized = Math.max(0, (rms - nf) / (0.6 - nf));
      const clamped = Math.min(1, normalized);

      // Smooth UI level
      setLevel((prev) => prev * 0.75 + clamped * 0.25);

      // Hysteresis
      const ON = threshold;
      const OFF = Math.max(0.04, threshold * 0.55);

      if (!blowingRef.current && clamped > ON) {
        blowingRef.current = true;
        setIsBlowing(true);
      } else if (blowingRef.current && clamped < OFF) {
        blowingRef.current = false;
        setIsBlowing(false);
      }

      rafRef.current = requestAnimationFrame(check);
    };

    check();

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [isActive, audioContext, threshold]);

  // Unmount cleanup
  useEffect(() => {
    return () => hardStop();
  }, [hardStop]);

  return { isBlowing, level, startListening, hasPermission: !!audioContext };
};
