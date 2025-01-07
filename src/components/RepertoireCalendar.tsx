import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns';
import { repertoires } from '../data/songs';
import AudioPlayer from './AudioPlayer';

export default function RepertoireCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const getRepertoire = (date: Date | null) => {
    if (!date) return null;
    const formattedDate = format(date, 'yyyy-MM-dd');
    return repertoires.find(rep => rep.date === formattedDate);
  };

  const selectedRepertoire = getRepertoire(selectedDate);

  return (
    <div className="p-4">
      <div className="mb-6">
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="MMMM d, yyyy"
          className="w-full p-2 border rounded"
          placeholderText="Select a date"
        />
      </div>

      {selectedRepertoire ? (
        <div>
          <h2 className="text-xl font-bold mb-4">
            Repertoire for {format(selectedDate!, 'MMMM d, yyyy')}
          </h2>
          <div className="space-y-4">
            {selectedRepertoire.songs.map(song => (
              <AudioPlayer key={song.id} song={song} />
            ))}
          </div>
        </div>
      ) : (
        <p className="text-gray-500">No repertoire found for selected date</p>
      )}
    </div>
  );
}