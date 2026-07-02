import { useState, useEffect } from 'react';

// Define the exact structural contract for our data
interface Visitor {
  id?: number;
  name: string;
  email: string;
  purpose: string;
  checked_in_at?: string;
}

function App() {
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [purpose, setPurpose] = useState('Interview');

  // 1. Fetch visitors from your Express Backend API
  const fetchVisitors = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/visitors');
      const data = await response.json();
      setVisitors(data);
    } catch (err) {
      console.error("Error fetching visitors:", err);
    }
  };

  useEffect(() => {
    fetchVisitors();
  }, []);

  // 2. Handle Form Submission to save data to PostgreSQL
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return alert("Please fill in fields");

    const newVisitor: Visitor = { name, email, purpose };

    try {
      const response = await fetch('http://localhost:5001/api/visitors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newVisitor),
      });

      if (response.ok) {
        setName('');
        setEmail('');
        fetchVisitors(); // Refresh the grid data automatically!
      }
    } catch (err) {
      console.error("Error saving visitor:", err);
    }
  };

  // 3. Clear the Visitors Form
  const handleClear = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return alert("Please fill in fields");

    const newVisitor: Visitor = { name, email, purpose };

    try {
      const response = await fetch('http://localhost:5001/api/visitors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newVisitor),
      });

      if (response.ok) {
        setName('');
        setEmail('');
        fetchVisitors(); // Refresh the grid data automatically!
      }
    } catch (err) {
      console.error("Error saving visitor:", err);
    }
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '600px' }}>
      <h2>Visitor Management System</h2>
      
      {/* Check-in Form */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '30px' }}>
        <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} style={{ padding: '8px' }} />
        <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} style={{ padding: '8px' }} />
        <select value={purpose} onChange={(e) => setPurpose(e.target.value)} style={{ padding: '8px' }}>
          <option value="Interview">Interview</option>
          <option value="Contractor">Contractor Work</option>
          <option value="Visitor">General Visitor</option>
        </select>
        <button type="submit" style={{ padding: '10px', background: '#0070f3', color: '#fff', border: 'none', cursor: 'pointer' }}>Check In</button>
        <button type="button" onClick={handleClear} style={{ padding: '10px', background: '#0070f3', color: '#fff', border: 'none', cursor: 'pointer' }}>Clear Visitors</button>
      </form>

      {/* Visitor Grid / Table */}
      <h3>Live Visitor Log</h3>
      <table border={1} cellPadding={8} style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#eee' }}>
            <th>Name</th>
            <th>Email</th>
            <th>Purpose</th>
          </tr>
        </thead>
        <tbody>
          {visitors.length === 0 ? (
            <tr><td colSpan={3} style={{ textAlign: 'center' }}>No visitors checked in.</td></tr>
          ) : (
            visitors.map((v) => (
              <tr key={v.id}>
                <td>{v.name}</td>
                <td>{v.email}</td>
                <td>{v.purpose}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;