import React, { useState } from 'react';

interface TimeEntry {
  id: string;
  date: string;
  type: 'studying' | 'break' | 'procrastination';
  duration: number;
}

interface TimeTrackerProps {
  onEntriesChange: (entries: TimeEntry[]) => void;
}

const TimeTracker: React.FC<TimeTrackerProps> = ({ onEntriesChange }) => {
  const [selectedType, setSelectedType] = useState<'studying' | 'break' | 'procrastination'>('studying');
  const [duration, setDuration] = useState<number>(0);
  const [isTracking, setIsTracking] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<Date | null>(null);

  const handleStartTracking = () => {
    setIsTracking(true);
    setStartTime(new Date());
  };

  const handleStopTracking = () => {
    if (startTime) {
      const endTime = new Date();
      const durationInMinutes = Math.round((endTime.getTime() - startTime.getTime()) / 60000);
      
      const newEntry: TimeEntry = {
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        type: selectedType,
        duration: durationInMinutes
      };

      // Get existing entries from localStorage
      const storedEntries = localStorage.getItem('timeEntries');
      const existingEntries: TimeEntry[] = storedEntries ? JSON.parse(storedEntries) : [];
      
      // Add new entry
      const updatedEntries = [...existingEntries, newEntry];
      
      // Save to localStorage
      localStorage.setItem('timeEntries', JSON.stringify(updatedEntries));
      
      // Notify parent
      onEntriesChange(updatedEntries);
      
      // Reset state
      setIsTracking(false);
      setStartTime(null);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
          Select Activity Type:
        </label>
        <select 
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value as any)}
          style={{
            width: '100%',
            padding: '0.5rem',
            border: '1px solid #d1d5db',
            borderRadius: '0.375rem',
            marginBottom: '1rem'
          }}
        >
          <option value="studying">📚 Studying</option>
          <option value="break">☕ Break</option>
          <option value="procrastination">📱 Procrastination</option>
        </select>

        {!isTracking ? (
          <button
            onClick={handleStartTracking}
            style={{
              backgroundColor: '#10b981',
              color: 'white',
              padding: '0.5rem 1rem',
              border: 'none',
              borderRadius: '0.375rem',
              cursor: 'pointer',
              width: '100%'
            }}
          >
            Start Tracking
          </button>
        ) : (
          <button
            onClick={handleStopTracking}
            style={{
              backgroundColor: '#ef4444',
              color: 'white',
              padding: '0.5rem 1rem',
              border: 'none',
              borderRadius: '0.375rem',
              cursor: 'pointer',
              width: '100%'
            }}
          >
            Stop Tracking
          </button>
        )}
      </div>
    </div>
  );
};

export default TimeTracker;