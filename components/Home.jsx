import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from './supabase-client'



export default function Home() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

 const fetchEntry = async () => {
     const {error, data} = await supabase
       .from('entires')
       .select('*')
       .order('date', { ascending: false })
     if (error) {
       showStatus('✗ Error fetching entries', false)
       console.error('Error fetching entries:', error)
     }
     setItems(data);
     console.log('Fetched entries:', data);
   }
 
   useEffect(() => {
    
     fetchEntry();
     setLoading(false);
   }, [])
 
   console.log(items);

  async function deleteRecord(id) {
    if (!confirm('Are you sure you want to delete this entry?')) return
    try {
      const fd = new FormData(); fd.append('action', 'delete'); fd.append('id', id)
      const res = await fetch(GOOGLE_APPS_SCRIPT_URL, { method: 'POST', body: fd })
      const data = await res.json()
      if (data.success) loadRecords()
      else alert(data.message || 'Delete failed')
    } catch (e) { console.error(e); alert('Delete failed') }
  }

  function editRecord(record) {
    sessionStorage.setItem('editData', JSON.stringify(record))
    navigate(`/edit/${encodeURIComponent(record.id || '')}`)
  }

  return (
    <div className="container">
      <div className="header">
        <h1>👁️ View All Entries</h1>
      </div>

      <div className="status-message" style={{display:'none'}}></div>

      <div className="controls">
        <button className="btn-refresh" onClick={fetchEntry}>🔄 Refresh</button>
        <button className="btn-add" onClick={() => navigate('/add')}>➕ Add New Entry</button>
      </div>

      <div className="table-responsive">
        <table id="recordsTable">
          <thead>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>Shift</th>
              <th>Meter In</th>
              <th>Meter Out</th>
              <th>Caps In</th>
              <th>Caps Out</th>
              <th>500ml In</th>
              <th>500ml Out</th>
              <th>5L In</th>
              <th>5L Out</th>
              <th>5 Gallon In</th>
              <th>5 Gallon Out</th>
              <th>Notes</th>
              <th>Cash Sale</th>
              <th>Cap Sale</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="17" className="loading">Loading entries...</td></tr>
            ) : items.length === 0 ? (
              <tr>
                <td colSpan="17">
                  <div className="no-data">
                    <span className="no-data-icon">📭</span>
                    <p>No entries found yet</p>
                    <p><a className="no-data-link" onClick={() => navigate('/add')}>Add your first entry</a></p>
                  </div>
                </td>
              </tr>
            ) : (
              items.map((record, idx) => (
                <tr key={record.id || idx}>
                  <td>{record.date}</td>
                  <td>{record.name}</td>
                  <td>{record.shift}</td>
                  <td>{record.meter_in}</td>
                  <td>{record.meter_out}</td>
                  <td>{record.caps_in}</td>
                  <td>{record.caps_out}</td>
                  <td>{record.size_500ml_in}</td>
                  <td>{record.size_500ml_out}</td>
                  <td>{record.size_5l_in}</td>
                  <td>{record.size_5l_out}</td>
                  <td>{record.size_5gallon_in}</td>
                  <td>{record.size_5gallon_out}</td>
                  <td>{record.notes}</td>
                  <td>{record.cash_sale}</td>
                  <td>{record.cap_sale}</td>
                  <td>
                    <div className="actions">
                      <button className="btn-edit" onClick={() => editRecord(record)}>Edit</button>
                      <button className="btn-delete" onClick={() => deleteRecord(record.id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <p className="entry-count">Total Entries: {items.length}</p>
    </div>
  )
}
