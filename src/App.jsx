// Import necessary hooks and resources
import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient'; // Supabase client for DB operations
import './App.css'; // App-level styles
import CoverPage from './coverpage.jsx'; // Cover page component
import './coverpage.css'; // Cover page styles


function App() {
  // State to hold all SCP records from the database
  const [records, setRecords] = useState([]);

  // State to control which view is being shown: "Home", "detail", or "admin"
  const [view, setView] = useState('Home');

  // State to track the currently selected SCP for detailed view
  const [selectedSCP, setSelectedSCP] = useState(null);

  // Initial state structure for the SCP form
  const initialFormState = {
    item: '',
    class: '',
    image: '',
    description: '',
    containment_procedure: '',
  };

  // State to manage the form inputs (both for creating and editing SCPs)
  const [form, setForm] = useState(initialFormState);

  // On component mount, fetch all SCP records from Supabase
  useEffect(() => {
    fetchRecords();
  }, []);

  // Fetch records from Supabase
  async function fetchRecords() {
    const { data, error } = await supabase.from('SCP_Crud_Table').select();
    if (!error) setRecords(data);
    else console.error('Fetch error:', error);
  }

  // Handle changes in form inputs
  function handleInputChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  // Insert a new SCP record into Supabase
  async function handleSubmit() {
    const { error } = await supabase.from('SCP_Crud_Table').insert([form]);
    if (error) {
      console.error('Insert error:', error);
    } else {
      fetchRecords(); // Refresh the list
      setForm(initialFormState); // Clear the form
    }
  }

  // Delete an SCP record by ID
  async function handleDelete(id) {
    await supabase.from('SCP_Crud_Table').delete().eq('id', id);
    fetchRecords(); // Refresh the list
  }

  // Update an existing SCP record
  async function handleEdit(id) {
    await supabase.from('SCP_Crud_Table').update(form).eq('id', id);
    fetchRecords(); // Refresh the list
    setForm(initialFormState); // Clear the form
  }

  return (
    <div className="app">
      

      {/* Navigation buttons for each SCP and admin view */}
      <nav className="nav">
        {records.map((rec) => (
          <button
            key={rec.id}
            onClick={() => {
              setSelectedSCP(rec);
              setView('detail');
            }}
          >
            {rec.item}
          </button>
        ))}
        <button onClick={() => setView('admin')}>Admin</button>
      </nav>

      {/* Detail view for a selected SCP */}
      {view === 'detail' && selectedSCP && (
        <div className="detail">
          <h2>{selectedSCP.item}</h2>
          <h4>Class: {selectedSCP.class}</h4>
          <div className="image">
            <img
              src={selectedSCP.image}
              alt={selectedSCP.item}
              className="scp-image"
            />
          </div>
          <p><strong>Description:</strong> {selectedSCP.description}</p>
          <h4>Containment Procedure</h4>
          <p>{selectedSCP.containment_procedure}</p>
        </div>
      )}

      {/* Admin panel for viewing and editing all SCP records */}
      {view === 'admin' && (
        <div className="admin">
          <h2>Admin Panel</h2>

          {/* Table of existing SCP records */}
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Item</th>
                <th>Class</th>
                <th>Image</th>
                <th>Description</th>
                <th>Containment Procedure</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {records.map((rec) => (
                <tr key={rec.id}>
                  <td>{rec.id}</td>
                  <td>{rec.item}</td>
                  <td>{rec.class}</td>
                  <td>
                    {rec.image && <img src={rec.image} alt={rec.item} width="200" />}
                  </td>
                  <td>{rec.description}</td>
                  <td>{rec.containment_procedure}</td>
                  <td>
                    <button onClick={() => setForm(rec)}>Edit</button>
                    <br />
                    <button onClick={() => handleDelete(rec.id)}>Delete</button>
                    <br />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Form to add/edit SCPs */}
          <div className="form">
            <h3>{form.id ? 'Edit SCP' : 'Create New SCP'}</h3>
            <input
              name="item"
              value={form.item}
              onChange={handleInputChange}
              placeholder="Item (e.g., SCP-173)"
            />
            <input
              name="class"
              value={form.class}
              onChange={handleInputChange}
              placeholder="class (e.g., Euclid)"
            />
            <input
              name="image"
              value={form.image}
              onChange={handleInputChange}
              placeholder="Image URL"
            />
            <textarea
              name="description"
              value={form.description}
              onChange={handleInputChange}
              placeholder="Description"
            />
            <textarea
              name="containment_procedure"
              value={form.containment_procedure}
              onChange={handleInputChange}
              placeholder="Containment Procedure"
            />

            {/* Submit button shows Update or Create depending on form state */}
            {form.id ? (
              <button onClick={() => handleEdit(form.id)}>Update SCP</button>
            ) : (
              <button onClick={handleSubmit}>Create SCP</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
