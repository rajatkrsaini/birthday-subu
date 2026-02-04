// src/types.ts
export type AppStage =
  | 'intro'
  | 'cake'
  | 'letter'
  | 'surprise'
  | 'contract'
  | 'skylantern';

export interface Photo {
  id: number;
  url: string;
  caption: string;
  rotation: number;
}
