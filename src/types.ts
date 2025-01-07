export interface Song {
  id: string;
  title: string;
  originalKey: string;
  duration: number;
  url: string;
  minister?: string;
}

export interface Repertoire {
  date: string;
  songs: Song[];
}