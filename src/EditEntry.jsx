import React, { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from './supabase-client'



export default function EditEntry() {
  const { id } = useParams()
  const navigate = useNavigate()
  const formRef = useRef(null)
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState(null)
  const [fieldData, setFieldData] = useState({
      date: '',
      name: '',
      shift: '',
      meter_in: 0,
      meter_out: 0,
      caps_in: 0,
      caps_out: 0,
      size_500ml_in: 0,
      size_500ml_out: 0,
      size_1l_in: 0,
      size_1l_out: 0,
      size_5l_in: 0,
      size_5l_out: 0,
      size_5gallon_in: 0,
      size_5gallon_out: 0,
      notes: '',
      cash_sale: 0,
      cap_sale: 0,
    })

  const editDataRaw = sessionStorage.getItem('editData');
  const editData = editDataRaw ? JSON.parse(editDataRaw) : {};
  console.log('Edit Data:', editData);

  const showStatus = (message, isSuccess = true) => {
    setStatus({ message, isSuccess })
    if (isSuccess) setTimeout(() => setStatus(null), 2000)
  }

  useEffect(() => {
    // populate form state from session-stored editData so unchanged fields keep their values
    if (editData && Object.keys(editData).length) {
      setFieldData(prev => ({ ...prev, ...editData }))
    }
    setLoading(false);
  }, [])

 const editEntry = async () => {
      // send entire object to update; supabase.update expects a single object
      const { error } = await supabase
        .from('entires')
        .update(fieldData)
        .eq('id', editData?.id || id)
      if (error) {
      console.error('Error details:', error)
      showStatus('✗ Failed to edit entry', false)
    } else {
      showStatus('✓ Entry edited successfully!', true)
      console.log('Entry edited successfully!')
      //formRef.current.reset()
    }
    setLoading(false)
    }
 

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    editEntry();
  }

  if (loading) return <div className="container"><p>Loading…</p></div>

  return (
    <div className="container">
      <div className="header">
        <div>
          <h1>✏️ Edit Entry <span className="edit-badge">EDIT MODE</span></h1>
        </div>
      </div>
      {status && (
        <div className={`status-message ${status.isSuccess ? 'success' : 'error'}`}>
          {status.message}
        </div>
      )}
      <p className="info-text">Update the details below and save your changes</p>
      <form ref={formRef} className="form-section edit" onSubmit={handleSubmit}>
         <div className="form-group">
          <label htmlFor="dateInput">Date (DD-MM-YYYY) *</label>
          <input type="text" id="dateInput" name="date" placeholder="31-12-2025" pattern="\d{2}-\d{2}-\d{4}" autoComplete="off" value={fieldData.date} onChange={(e)=> setFieldData((prev) => ({...prev, date: e.target.value}))} />
        </div>

        <div className="form-group">
          <label htmlFor="nameInput">Name </label>
          <input type="text" id="nameInput" name="name" placeholder="Enter name" autoComplete="off" value={fieldData.name} onChange={(e)=> setFieldData((prev) => ({...prev, name: e.target.value}))} />
        </div>

        <div className="form-group">
          <label htmlFor="shiftInput">Shift</label>
          <select id="shiftInput" name="shift" value={fieldData.shift} onChange={(e)=> setFieldData((prev) => ({...prev, shift: e.target.value}))} >
            <option value="">Select Shift</option>
            <option value="morning">Morning</option>
            <option value="evening">Evening</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="meterInInput">Meter In</label>
          <input type="number" id="meterInInput" name="meterIn" placeholder="0" min="0" autoComplete="off" value={fieldData.meter_in}
          onChange={(e)=> setFieldData((prev) => ({...prev, meter_in: parseFloat(e.target.value) || 0}))} />
        </div>

        <div className="form-group">
          <label htmlFor="meterOutInput">Meter Out</label>
          <input type="number" id="meterOutInput" name="meterOut" placeholder="0" min="0" autoComplete="off" value={fieldData.meter_out} onChange={(e)=> setFieldData((prev) => ({...prev, meter_out: parseFloat(e.target.value) || 0}))} />
        </div>

        <div className="form-group">
          <label htmlFor="capsInInput">Caps In</label>
          <input type="number" id="capsInInput" name="capsIn" placeholder="0" min="0" autoComplete="off" value={fieldData.caps_in} onChange={(e)=> setFieldData((prev) => ({...prev, caps_in: parseFloat(e.target.value) || 0}))} />
        </div>

        <div className="form-group">
          <label htmlFor="capsOutInput">Caps Out</label>
          <input type="number" id="capsOutInput" name="capsOut" placeholder="0" min="0" autoComplete="off" value={fieldData.caps_out}
           onChange={(e)=> setFieldData((prev) => ({...prev, caps_out: parseFloat(e.target.value) || 0}))}/>
        </div>

        <div className="form-group">
          <label htmlFor="size500mlInInput">500ml In</label>
          <input type="number" id="size500mlInInput" name="size500mlIn" placeholder="0" min="0" autoComplete="off" value={fieldData.size_500ml_in} onChange={(e)=> setFieldData((prev) => ({...prev, size_500ml_in: parseFloat(e.target.value) || 0}))} />
        </div>

        <div className="form-group">
          <label htmlFor="size500mlOutInput">500ml Out</label>
          <input type="number" id="size500mlOutInput" name="size500mlOut" placeholder="0" min="0" autoComplete="off" value={fieldData.size_500ml_out} onChange={(e)=> setFieldData((prev) => ({...prev, size_500ml_out: parseFloat(e.target.value) || 0}))} />
        </div>

        <div className="form-group">
          <label htmlFor="size1LInInput">1L In</label>
          <input type="number" id="size1LInInput" name="size1LIn" placeholder="0" min="0" autoComplete="off" value={fieldData.size_1l_in} onChange={(e)=> setFieldData((prev) => ({...prev, size_1l_in: parseFloat(e.target.value) || 0}))} />
        </div>

       <div className="form-group">
          <label htmlFor="size1LOutInput">1L Out</label>
          <input type="number" id="size1LOutInput" name="size1LOut" placeholder="0" min="0" autoComplete="off" value={fieldData.size_1l_out} onChange={(e)=> setFieldData((prev) => ({...prev, size_1l_out: parseFloat(e.target.value) || 0}))} />
        </div>

        <div className="form-group">
          <label htmlFor="size5LInInput">5L In</label>
          <input type="number" id="size5LInInput" name="size5LIn" placeholder="0" min="0" autoComplete="off" value={fieldData.size_5l_in} onChange={(e)=> setFieldData((prev) => ({...prev, size_5l_in: parseFloat(e.target.value) || 0}))} />
        </div>

        <div className="form-group">
          <label htmlFor="size5LOutInput">5L Out</label>
          <input type="number" id="size5LOutInput" name="size5LOut" placeholder="0" min="0" autoComplete="off" value={fieldData.size_5l_out} onChange={(e)=> setFieldData((prev) => ({...prev, size_5l_out: parseFloat(e.target.value) || 0}))} />
        </div>

        <div className="form-group">
          <label htmlFor="size5GallonInInput">5 Gallon In</label>
          <input type="number" id="size5GallonInInput" name="size5GallonIn" placeholder="0" min="0" autoComplete="off" value={fieldData.size_5gallon_in} onChange={(e)=> setFieldData((prev) => ({...prev, size_5gallon_in: parseFloat(e.target.value) || 0}))} />
        </div>

        <div className="form-group">
          <label htmlFor="size5GallonOutInput">5 Gallon Out</label>
          <input type="number" id="size5GallonOutInput" name="size5GallonOut" placeholder="0" min="0" autoComplete="off" value={fieldData.size_5gallon_out} onChange={(e)=> setFieldData((prev) => ({...prev, size_5gallon_out: parseFloat(e.target.value) || 0}))} />
        </div>

        <div className="form-group">
          <label htmlFor="notesInput">Notes</label>
          <input type="text" id="notesInput" name="notes" placeholder="Enter notes here..." autoComplete="off" value={fieldData.notes} onChange={(e)=> setFieldData((prev) => ({...prev, notes: e.target.value}))} />
        </div>

        <div className="form-group">
          <label htmlFor="cashSaleInput">Cash Sale</label>
          <input type="number" id="cashSaleInput" name="cashSale" placeholder="0" min="0" autoComplete="off" value={fieldData.cash_sale} onChange={(e)=> setFieldData((prev) => ({...prev, cash_sale: parseFloat(e.target.value) || 0}))} />
        </div>

        <div className="form-group">
          <label htmlFor="capSaleInput">Cap Sale</label>
          <input type="number" id="capSaleInput" name="capSale" placeholder="0" min="0" autoComplete="off" value={fieldData.cap_sale} onChange={(e)=> setFieldData((prev) => ({...prev, cap_sale: parseFloat(e.target.value) || 0}))} />
        </div>

        <div className="button-group">
          <button className="btn-submit btn-edit" type="submit">Update Entry</button>
          <button className="btn-cancel" type="button" onClick={() => navigate(-1)}>Cancel</button>
        </div>
      </form>
    </div>
  )
}

//TODO: Test how data is sorted in view when two entries of the same date are added.
//TODO: Add previous day's info to the default value of the current day's entry
