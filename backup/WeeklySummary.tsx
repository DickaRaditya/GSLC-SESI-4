import React from 'react';

interface TimeEntry {
  id: string;
  date: string;
  type: 'studying' | 'break' | 'procrastination';
  duration: number;
}

interface WeeklySummaryProps {
  entries: TimeEntry[];
}

const WeeklySummary: React.FC<WeeklySummaryProps> = ({ entries }) => {
  // Get last 7 days entries
  const today = new Date();
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    return date.toISOString().split('T')[0];
  }).reverse();

  const summary = last7Days.map(date => {
    const dayEntries = entries.filter(entry => entry.date === date);
    const studying = dayEntries.filter(e => e.type === 'studying').reduce((acc, e) => acc + e.duration, 0);
    const breaks = dayEntries.filter(e => e.type === 'break').reduce((acc, e) => acc + e.duration, 0);
    const procrastination = dayEntries.filter(e => e.type === 'procrastination').reduce((acc, e) => acc + e.duration, 0);
    
    return { date, studying, breaks, procrastination };
  });

  return (
    <div style={{ 
      backgroundColor: 'white', 
      borderRadius: '0.5rem', 
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)', 
      padding: '1.5rem'
    }}>
      <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>
        📊 Weekly Summary
      </h2>
      
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f9fafb' }}>
              <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '2px solid #e5e7eb' }}>Date</th>
              <th style={{ padding: '0.75rem', textAlign: 'right', borderBottom: '2px solid #e5e7eb' }}>📚 Studying</th>
              <th style={{ padding: '0.75rem', textAlign: 'right', borderBottom: '2px solid #e5e7eb' }}>☕ Break</th>
              <th style={{ padding: '0.75rem', textAlign: 'right', borderBottom: '2px solid #e5e7eb' }}>📱 Procrastination</th>
              <th style={{ padding: '0.75rem', textAlign: 'right', borderBottom: '2px solid #e5e7eb' }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {summary.map((day) => {
              const total = day.studying + day.breaks + day.procrastination;
              return (
                <tr key={day.date} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '0.75rem' }}>{day.date}</td>
                  <td style={{ padding: '0.75rem', textAlign: 'right' }}>{day.studying}m</td>
                  <td style={{ padding: '0.75rem', textAlign: 'right' }}>{day.breaks}m</td>
                  <td style={{ padding: '0.75rem', textAlign: 'right' }}>{day.procrastination}m</td>
                  <td style={{ padding: '0.75rem', textAlign: 'right', fontWeight: 'bold' }}>{total}m</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {entries.length === 0 && (
        <p style={{ textAlign: 'center', color: '#6b7280', padding: '2rem' }}>
          No entries yet. Start tracking your time!
        </p>
      )}
    </div>
  );
};

export default WeeklySummary;