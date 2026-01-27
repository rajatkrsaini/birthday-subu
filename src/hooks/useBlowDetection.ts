import { useState, useEffect, useRef, useCallback } from 'react';

export const useBlowDetection = (isActive: boolean, threshold: number = 20) => {
  const [isBlowing, setIsBlowing] = useState(false);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const rafRef = useRef<number | null>(null);

  const startListening = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const context = new (window.AudioContext || (window as any).webkitAudioContext)();
      const analyser = context.createAnalyser();
      const source = context.createMediaStreamSource(stream);

      analyser.fftSize = 256;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      source.connect(analyser);
      
      analyserRef.current = analyser;
      dataArrayRef.current = dataArray;
      sourceRef.current = source;
      setAudioContext(context);
    } catch (err) {
      console.error("Microphone access denied or error:", err);
    }
  }, []);

  useEffect(() => {
    if (isActive && !audioContext) {
        // We delay init until user interaction usually, but here we assume permission request handles it
        // Or component triggers it manually. 
        // For simplicity, we expose the start function to be called on a button click if needed,
        // but here we try to call it if permissions are already good.
    }
    
    return () => {
      if (audioContext && audioContext.state !== 'closed') {
        audioContext.close();
      }
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isActive, audioContext]);

  useEffect(() => {
    if (!isActive || !analyserRef.current || !dataArrayRef.current) return;

    const checkVolume = () => {
      analyserRef.current!.getByteFrequencyData(dataArrayRef.current!);
      
      // Simple algorithm: Get average volume
      let sum = 0;
      // Focus on lower frequencies which blowing usually occupies more
      const length = dataArrayRef.current!.length;
      for (let i = 0; i < length; i++) {
        sum += dataArrayRef.current![i];
      }
      const average = sum / length;

      if (average > threshold) {
        setIsBlowing(true);
      } else {
        setIsBlowing(false);
      }
      
      rafRef.current = requestAnimationFrame(checkVolume);
    };

    checkVolume();

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isActive, threshold, audioContext]);

  return { isBlowing, startListening, hasPermission: !!audioContext };
};