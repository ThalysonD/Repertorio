import React from 'react';
import { format } from 'date-fns';
import { repertoires } from '../data/songs';
import AudioPlayer from './AudioPlayer';

interface RepertoireListProps {
  darkMode: boolean;
}

export default function RepertoireList({ darkMode }: RepertoireListProps) {
  return (
    <div className="space-y-8">
      {repertoires.map((repertoire) => (
        <div 
          key={repertoire.date}
          className={`p-6 rounded-lg shadow-md ${
            darkMode ? 'bg-gray-800 text-white' : 'bg-white'
          }`}
        >
          <h2 className="text-xl font-bold mb-4">
            {format(new Date(repertoire.date), 'MMMM d, yyyy')}
          </h2>
          <div className="space-y-4">
            {repertoire.songs.map(song => (
              <AudioPlayer key={song.id} song={song} darkMode={darkMode} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}