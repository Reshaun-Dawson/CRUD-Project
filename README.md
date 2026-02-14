# CRUD-Project

A data entry management application for tracking daily operational metrics including inventory, sales, and meter readings.

## Overview

This project is a CRUD (Create, Read, Update, Delete) application designed to manage daily entry logs with detailed tracking of:
- Date and shift information
- Meter readings (in/out)
- Product inventory by size (500ml, 1L, 5L, 5-gallon bottles)
- Caps inventory (in/out)
- Sales data (cash and cap sales)
- Notes and miscellaneous information

## Tech Stack

### Current Implementation
- **Frontend**: React 18+ with Vite
- **Backend**: Supabase (PostgreSQL + Real-time APIs)
- **Component Architecture**: React functional components with hooks
- **Styling**: CSS

### Legacy Implementation (Deprecated)
- **Frontend**: HTML/CSS/JavaScript
- **Backend**: Google Apps Script with Google Sheets
- **Legacy Files**: `add.html`, `edit.html`, `view.html`, `index.html`, `GoogleAppsScript.js`

## Project Structure

```
CRUD-Project/
├── client/                          # React application
│   ├── src/
│   │   ├── components/
│   │   │   ├── AddEntry.jsx        # Add new entry form
│   │   │   ├── EditEntry.jsx       # Edit existing entry
│   │   │   ├── Home.jsx            # Main dashboard
│   │   │   ├── Landing.jsx         # Landing page
│   │   │   ├── ViewEntry.jsx       # View/list entries
│   │   │   └── supabase-client.ts  # Supabase configuration
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── index.html
│   └── package.json
├── add.html                         # Legacy add entry page
├── edit.html                        # Legacy edit entry page
├── view.html                        # Legacy view entries page
├── index.html                       # Legacy landing page
├── GoogleAppsScript.js              # Legacy backend script
├── package.json
└── README.md
```

## Features

### Data Entry Management
- ✅ **Add entries** with auto-populated form from latest entry
- ✅ **Edit entries** with controlled form inputs
- ✅ **View all entries** with sorting and filtering
- ✅ **Real-time sync** with Supabase backend
- ✅ **Responsive design** for desktop and mobile
- ✅ **Status notifications** for user feedback

### Tracked Fields
- **Date** (DD-MM-YYYY format)
- **Name** (operator/shift manager)
- **Shift** (morning/evening selection)
- **Meter readings** (in/out counts)
- **Caps inventory** (in/out counts)
- **Bottle inventory**:
  - 500ml (in/out)
  - 1L (in/out)
  - 5L (in/out)
  - 5-gallon (in/out)
- **Sales**:
  - Cash sales
  - Cap sales
- **Notes** (optional)

## Getting Started

### Prerequisites
- Node.js 16+ and npm
- Supabase account ([supabase.com](https://supabase.com))

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd CRUD-Project
   ```

2. **Install dependencies**
   ```bash
   cd client
   npm install
   ```

3. **Set up Supabase**
   - Create a new Supabase project at [supabase.com](https://supabase.com)
   - Create a table named `entires` with the following columns:
     ```sql
     id (UUID, primary key)
     date (text)
     name (text)
     shift (text)
     meter_in (numeric)
     meter_out (numeric)
     caps_in (numeric)
     caps_out (numeric)
     size_500ml_in (numeric)
     size_500ml_out (numeric)
     size_1l_in (numeric)
     size_1l_out (numeric)
     size_5l_in (numeric)
     size_5l_out (numeric)
     size_5gallon_in (numeric)
     size_5gallon_out (numeric)
     notes (text)
     cash_sale (numeric)
     cap_sale (numeric)
     ```
   - Get your Supabase URL and API key from the project settings

4. **Configure Supabase credentials**
   - Update `client/src/components/supabase-client.ts`:
     ```typescript
     export const supabase = createClient(
       'YOUR_SUPABASE_URL',
       'YOUR_SUPABASE_ANON_KEY'
     )
     ```

5. **Start development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

6. **Build for production**
   ```bash
   npm run build
   ```

## Usage

### Adding an Entry
1. Navigate to the "Add New Entry" page
2. The form automatically loads the latest entry data for reference
3. Update the fields with new information
4. Click "Add Entry" to save to the database

### Editing an Entry
1. Go to "View Entries"
2. Select an entry to edit
3. Update the desired fields
4. Click "Update Entry" to save changes

### Viewing Entries
1. Navigate to "View Entries"
2. Entries are displayed in reverse chronological order (newest first)
3. Click on an entry to view full details or edit

## Architecture

### Component Structure
```
App
├── Landing (home page)
├── Home (dashboard)
├── AddEntry (new entry form with auto-fetch)
├── ViewEntry (list and view entries)
└── EditEntry (edit form)
```

### State Management
- React hooks (`useState`, `useEffect`) for local component state
- Supabase client for database operations and real-time sync

### Key Features
- **AddEntry Auto-Load**: Component fetches the latest entry on mount to pre-populate form fields
- **Controlled Inputs**: Form inputs maintain state through React's controlled component pattern
- **Real-time Database**: Supabase provides real-time data synchronization

## Recent Changes

- ✨ Migrated from Google Apps Script to React + Supabase
- ✨ Added controlled form inputs for better state management
- ✨ Implemented auto-load of latest entry on AddEntry component mount
- ✨ Improved UX with real-time feedback and status messages

## Database Notes

⚠️ **Important**: The database table is named `entires` (note the spelling - likely a historical typo). All database queries reference this exact table name.

## Deprecated Files

The following files are from the legacy Google Apps Script implementation and can be removed:
- `add.html`
- `edit.html`
- `view.html`
- `index.html` (root level)
- `GoogleAppsScript.js`

## Development Scripts

```bash
npm run dev      # Start Vite dev server with hot reload
npm run build    # Build optimized production bundle
npm run preview  # Preview production build locally
```

## Future Enhancements

- User authentication and authorization
- Role-based access control (admin, operator, viewer)
- Data export functionality (CSV, Excel)
- Advanced filtering and search
- Analytics dashboard
- Mobile app version
- Offline support

## Troubleshooting

### "Table 'entires' not found" error
- Verify the Supabase table is created with the exact name `entires`
- Check your Supabase credentials in `supabase-client.ts`

### Form not auto-loading data
- Ensure the database has at least one entry
- Check browser console for Supabase connection errors
- Verify RLS (Row Level Security) policies allow reads

### Styling issues
- Clear browser cache (Ctrl+Shift+Delete)
- Restart the development server

## License

[Add your license here]

## Contact

[Add your contact information here]
