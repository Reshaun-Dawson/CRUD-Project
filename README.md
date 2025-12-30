# CRUD Application with Google Sheets - Setup Guide

## Overview
This is a complete CRUD (Create, Read, Update, Delete) application that connects to Google Sheets. Users can add, view, edit, and delete records containing names and ages.

## Components
1. **index.html** - Frontend with HTML, CSS, and JavaScript
2. **GoogleAppsScript.js** - Backend code for Google Apps Script
3. **Google Sheet** - Data storage

---

## Setup Instructions

### Step 1: Create a Google Sheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it something like "CRUD App Data"
4. Rename the first sheet tab to `Users` (if it's not already named that)
5. Copy the **Sheet ID** from the URL:
   ```
   https://docs.google.com/spreadsheets/d/[SHEET_ID]/edit
   ```

### Step 2: Set Up Google Apps Script
1. In your Google Sheet, go to **Tools** → **Script Editor**
2. Delete any existing code in the `Code.gs` file
3. Copy the entire content from `GoogleAppsScript.js` and paste it into `Code.gs`
4. Replace `YOUR_SHEET_ID` with your actual Sheet ID from Step 1:
   ```javascript
   const SHEET_ID = 'YOUR_SHEET_ID';
   ```
5. Save the script (Ctrl+S)

### Step 3: Initialize the Sheet
1. In the Apps Script editor, select the function `initializeSheet` from the dropdown
2. Click the **Run** button (play icon)
3. Authorize the script when prompted (click "Review permissions" → "Allow")
4. This creates the header row (ID, Name, Age, Timestamp) in your sheet

### Step 4: Deploy as Web App
1. In the Apps Script editor, click **Deploy** → **New Deployment**
2. Select **Web app** from the "Select type" dropdown
3. Configure:
   - **Execute as:** Select your email
   - **Who has access:** Select "Anyone"
4. Click **Deploy**
5. Copy the deployment URL provided (looks like: `https://script.google.com/macros/d/...`)
6. Click **Done**

### Step 5: Update Frontend
1. Open `index.html` in a text editor
2. Find this line near the top of the JavaScript section:
   ```javascript
   const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/d/YOUR_DEPLOYMENT_ID/usercache/dev';
   ```
3. Replace `YOUR_DEPLOYMENT_ID` with the deployment ID from the URL (the long string between `/d/` and `/usercache`)
   - Example: If your URL is `https://script.google.com/macros/d/1234567890ABCDEFG/usercache/dev`
   - The deployment ID is `1234567890ABCDEFG`
4. Save the file

### Step 6: Run the Application
1. Open `index.html` in a web browser (double-click the file or use a local server)
2. You should see the CRUD interface
3. Start adding records!

---

## Features

### Add Record
- Enter a name and age
- Click "Add Record"
- The record appears in the table below
- Data is saved to Google Sheets

### View Records
- All records are displayed in the table
- Refreshes automatically after each operation

### Edit Record
- Click the "Edit" button next to a record
- Form values populate with selected record data
- Form section turns yellow to indicate edit mode
- Click "Update Record" to save changes
- Original button text changes back to "Add Record" after saving

### Delete Record
- Click the "Delete" button next to a record
- Confirm the deletion
- Record is removed from the sheet

### Form Features
- **Name field:** Text input (required)
- **Age field:** Number input, validates 1-150 (required)
- **Enter key support:** Press Enter to move to next field or submit
- **Status messages:** Success/error feedback below the title
- **Clear button:** Resets the form and cancels edit mode

---

## Troubleshooting

### "Error connecting to server"
- Check that the `GOOGLE_APPS_SCRIPT_URL` is correct in index.html
- Verify the deployment ID matches your deployment URL
- Check that you deployed as "Anyone" (not just your account)

### "Failed to load records"
- Confirm the `SHEET_ID` in GoogleAppsScript.js is correct
- Verify the sheet tab is named exactly `Users`
- Ensure headers were initialized (run `initializeSheet()`)

### Script permissions error
- In Apps Script editor, go to **Project Settings**
- Enable "Show "appsscript.json" manifest file"
- Add these scopes if needed:
  ```json
  "oauthScopes": [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive"
  ]
  ```

### Changes not appearing
- Refresh the browser page (Ctrl+F5 or Cmd+Shift+R)
- Check Google Sheets to confirm data was saved
- Review browser console for error messages (F12)

---

## File Structure
```
CRUD-Project/
├── index.html              # Frontend interface (HTML + CSS + JS)
├── GoogleAppsScript.js     # Backend code (copy to Apps Script)
├── package.json            # Project metadata
└── README.md              # This file
```

---

## Security Notes
- This deployment is public ("Anyone" can access)
- For production, consider adding authentication
- The Apps Script validates input on the backend
- XSS protection is implemented in the frontend

---

## Browser Support
- Chrome/Edge/Firefox (latest versions)
- Mobile browsers supported (responsive design)
- Requires JavaScript enabled

---

## Future Enhancements
- Add search/filter functionality
- Implement user authentication
- Add data export to CSV
- Sort columns by name or age
- Add validation for duplicate entries
- Implement pagination for large datasets

---

## Support
For issues:
1. Check the troubleshooting section above
2. Verify all configuration steps were completed
3. Check browser console (F12) for error messages
4. Review Google Apps Script logs for backend errors

Enjoy your CRUD application! 🎉
