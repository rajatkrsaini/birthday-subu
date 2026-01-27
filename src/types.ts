export type AppStage = 'intro' | 'cake' | 'letter' | 'surprise';

export interface Photo {
  id: number;
  url: string;
  caption: string;
  rotation: number;
}
