import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'



export default function ViewEntry() {
  const { id } = useParams()
  const [item, setItem] = useState(null)

  const fetchEntry = async () => {
    const {error, data} = await supabase
      .from('entires')
      .select('*')
      .order('date', { ascending: false })
    if (error) {
      showStatus('✗ Error fetching entries', false)
      console.error('Error fetching entries:', error)
    }
    setItem(data);
  }

  useEffect(() => {
   
    fetchEntry();
  }, [])

  console.log(item);

  if (!item) return <div className="container"><p>Loading…</p></div>

  return (
    <div className="container">
      <h2>View Entry</h2>
      <div className="form-section">
        <p><strong>ID:</strong> {item.id}</p>
        <p><strong>Date:</strong> {item.date}</p>
        <p><strong>Name:</strong> {item.name}</p>
        <p><strong>Shift:</strong> {item.shift}</p>
        <p><strong>Meter In:</strong> {item.meterIn}</p>
        <p><strong>Meter Out:</strong> {item.meterOut}</p>
        <p><strong>Caps In:</strong> {item.capsIn}</p>
        <p><strong>Caps Out:</strong> {item.capsOut}</p>
        <p><strong>500ml In:</strong> {item.size500mlIn}</p>
        <p><strong>500ml Out:</strong> {item.size500mlOut}</p>
        <p><strong>5L In:</strong> {item.size5LIn}</p>
        <p><strong>5L Out:</strong> {item.size5LOut}</p>
        <p><strong>5 Gallon In:</strong> {item.size5GallonIn}</p>
        <p><strong>5 Gallon Out:</strong> {item.size5GallonOut}</p>
        <p><strong>Miscellaneous:</strong> {item.misc}</p>
        <p><strong>Cash Sale:</strong> {item.cashSale}</p>
        <p><strong>Cap Sale:</strong> {item.capSale}</p>
      </div>
      <div style={{marginTop:12}}>
        <Link to={`/edit/${encodeURIComponent(id)}`}>Edit this entry</Link>
      </div>
    </div>
  )
}
