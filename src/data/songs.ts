import { Song, Repertoire } from '../types';

export const songs: Song[] = [
  {
    id: '1',
    title: 'Colossenses e suas linhas de amor - FHOP',
    originalKey: 'D',
    duration: 210,
    url: '/songs/Colossenses.mp3'
  },
  {
    id: '2',
    title: 'Eu sou teu - Felipe Rodrigues',
    originalKey: 'Eb',
    duration: 210,
    url: '/songs/EuSouTeu.mp3'
  },
  {
    id: '3',
    title: 'Uma vez - Fhop',
    originalKey: 'D',
    duration: 210,
    url: '/songs/UmaVez.mp3'
  },
  {
    id: '4',
    title: 'A Terra clama',
    originalKey: 'A',
    duration: 410,
    url: '/songs/ATerraClama.m4a'
  }
];

export const repertoires: Repertoire[] = [
  {
    date: '2025-01-11',
    songs: [songs[0], songs[1], songs[2]]
  }
];