import React, { useState } from 'react';
import { Music, Calendar, Moon, Sun } from 'lucide-react';
import { songs } from './data/songs';
import AudioPlayer from './components/AudioPlayer';
import RepertoireList from './components/RepertoireList';

function App() {
  const [activeTab, setActiveTab] = useState<'songs' | 'calendar'>('songs');
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-100'}`}>
      <header className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              IFA Music
            </h1>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full ${
                darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-200 text-gray-700'
              } hover:opacity-80`}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </header>

      <nav className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab('songs')}
              className={`px-3 py-2 flex items-center space-x-2 ${
                activeTab === 'songs'
                  ? 'border-b-2 border-blue-500 text-blue-500'
                  : darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              <Music size={20} />
              <span>Músicas</span>
            </button>
            <button
              onClick={() => setActiveTab('calendar')}
              className={`px-3 py-2 flex items-center space-x-2 ${
                activeTab === 'calendar'
                  ? 'border-b-2 border-blue-500 text-blue-500'
                  : darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              <Calendar size={20} />
              <span>Calendário</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'songs' ? (
          <div className="grid gap-6 md:grid-cols-2">
            {songs.map(song => (
              <AudioPlayer key={song.id} song={song} darkMode={darkMode} />
            ))}
          </div>
        ) : (
          <RepertoireList darkMode={darkMode} />
        )}
      </main>
    </div>
  );
}

export default App;