import React, { useState, useEffect } from 'react';
import * as Tone from 'tone';
import { Play, Pause, Plus, Minus, RotateCcw, User } from 'lucide-react';
import { Song } from '../types';

interface AudioPlayerProps {
  song: Song;
  darkMode: boolean;
}

export default function AudioPlayer({ song, darkMode }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [pitch, setPitch] = useState(0);
  const [player, setPlayer] = useState<Tone.Player | null>(null);
  const [pitchShift, setPitchShift] = useState<Tone.PitchShift | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [minister, setMinister] = useState(song.minister || '');
  const [isEditingMinister, setIsEditingMinister] = useState(false);

  useEffect(() => {
    const initAudio = async () => {
      await Tone.start();
      const newPitchShift = new Tone.PitchShift().toDestination();
      const newPlayer = new Tone.Player({
        url: song.url,
        onload: () => setIsLoaded(true),
      }).connect(newPitchShift);

      setPlayer(newPlayer);
      setPitchShift(newPitchShift);
    };

    initAudio();

    return () => {
      if (player?.state === 'started') {
        player.stop();
      }
      player?.dispose();
      pitchShift?.dispose();
    };
  }, [song.url]);

  const togglePlay = async () => {
    if (!player || !isLoaded) return;

    try {
      await Tone.start();

      if (player.state === 'started') {
        setCurrentPosition(player.immediate());
        player.stop();
        setIsPlaying(false);
      } else {
        player.start(undefined, currentPosition);
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Erro ao reproduzir áudio:', error);
    }
  };

  const restart = async () => {
    if (!player || !isLoaded) return;

    try {
      await Tone.start();
      setCurrentPosition(0);

      if (player.state === 'started') {
        player.stop();
      }

      player.start();
      setIsPlaying(true);
    } catch (error) {
      console.error('Erro ao reiniciar áudio:', error);
    }
  };

  const adjustPitch = (semitones: number) => {
    if (!pitchShift) return;
    const newPitch = Math.max(-12, Math.min(12, pitch + semitones));
    setPitch(newPitch);
    pitchShift.pitch = newPitch;
  };

  const getAdjustedKey = () => {
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const originalIndex = notes.indexOf(song.originalKey);
    const adjustedIndex = (originalIndex + pitch + 12) % 12;
    return notes[adjustedIndex];
  };

  return (
    <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
      } rounded-lg shadow-md p-4 mb-4`}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
        <h3 className="text-lg font-semibold">{song.title}</h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm whitespace-nowrap">
            Tom Original: {song.originalKey} | Atual: {getAdjustedKey()}
          </span>
        </div>
      </div>

      <div className="flex flex-col space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex space-x-2">
            <button
              onClick={togglePlay}
              disabled={!isLoaded}
              className={`p-2 rounded-full ${isLoaded
                  ? 'bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>

            <button
              onClick={restart}
              disabled={!isLoaded}
              className={`p-2 rounded-full ${isLoaded
                  ? 'bg-green-500 text-white hover:bg-green-600 active:bg-green-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
            >
              <RotateCcw size={24} />
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => adjustPitch(-1)}
              className={`${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                } p-2 rounded-full active:scale-95 transition-transform`}
            >
              <Minus size={20} />
            </button>

            <span className="text-lg font-semibold w-6 text-center">{pitch > 0 ? '+' : ''}{pitch}</span>

            <button
              onClick={() => adjustPitch(1)}
              className={`${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                } p-2 rounded-full active:scale-95 transition-transform`}
            >
              <Plus size={20} />
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <User size={20} className="text-gray-500 flex-shrink-0" />
          {isEditingMinister ? (
            <input
              type="text"
              value={minister}
              onChange={(e) => setMinister(e.target.value)}
              onBlur={() => setIsEditingMinister(false)}
              onKeyPress={(e) => e.key === 'Enter' && setIsEditingMinister(false)}
              className={`flex-1 px-2 py-1 rounded ${darkMode
                  ? 'bg-gray-700 text-white border-gray-600'
                  : 'bg-white text-gray-900 border-gray-300'
                } border`}
              placeholder="Digite o nome do ministro"
              autoFocus
            />
          ) : (
            <button
              onClick={() => setIsEditingMinister(true)}
              className={`flex-1 text-left px-2 py-1 rounded ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}
            >
              {minister || 'Adicionar ministro'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}