import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import TimeTracker from './TimeTracker';
import WeeklySummary from './WeeklySummary';
// import { Timer } from 'lucide-react'; // Install dulu: npm install lucide-react

interface TimeEntry {
  id: string;
  date: string;
  type: 'studying' | 'break' | 'procrastination';
  duration: number;
}

function App() {
  const [entries, setEntries] = useState<TimeEntry[]>([]);

  useEffect(() => {
    console.log('App mounted');
    const storedEntries = localStorage.getItem('timeEntries');
    if (storedEntries) {
      setEntries(JSON.parse(storedEntries));
    }
  }, []);

  const handleEntriesChange = (newEntries: TimeEntry[]) => {
    console.log('Entries updated:', newEntries);
    setEntries(newEntries);
    localStorage.setItem('timeEntries', JSON.stringify(newEntries));
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f3f4f6', 
      padding: '2rem 1rem',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: '0.75rem',
            marginBottom: '0.5rem'
          }}>
            {/* Timer icon */}
            <span style={{ fontSize: '2rem', color: '#2563eb' }}>⏱️</span>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>
              Time Tracker
            </h1>
          </div>
          <p style={{ color: '#4b5563' }}>
            Track your studying, breaks, and procrastination time
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div style={{ 
            backgroundColor: 'white', 
            borderRadius: '0.5rem', 
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)', 
            padding: '1.5rem'
          }}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>
              Log Your Time
            </h2>
            <TimeTracker onEntriesChange={handleEntriesChange} />
          </div>

          <div>
            <WeeklySummary entries={entries} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ⚠️ INI YANG PENTING: RENDER APLIKASI
const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<App />);
  console.log('✅ App rendered successfully!');
} else {
  console.error('❌ Root element not found!');
}

export default App;