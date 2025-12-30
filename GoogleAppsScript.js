// ============================================
// GOOGLE APPS SCRIPT - CRUD Backend
// ============================================
// Deploy as Web App with Execute as: Me
// Who has access: Anyone

const SHEET_ID = '1mKYT_lu9QUJjbAKMNcVDQ9TwwBgGOLiJSWbQd2L6-z0'; // Replace with your Google Sheet ID
const SHEET_NAME = 'Users'; // Name of the sheet tab

/**
 * Main entry point for all requests
 */
function doPost(e) {
  try {
    // Support both JSON POST and form submissions (urlencoded/multipart)
    let payload = {};

    // Be defensive: `e` or `e.postData` may be undefined depending on how the
    // request was made or if Apps Script invoked the function differently.
    const postDataContents = (e && e.postData && e.postData.contents) ? e.postData.contents : null;
    if (postDataContents) {
      try {
        payload = JSON.parse(postDataContents);
      } catch (jsonErr) {
        // Not JSON — fall back to parameters
        payload = {};
      }
    }

    // If no payload from JSON, use form parameters (works for x-www-form-urlencoded and multipart/form-data)
    if ((!payload || Object.keys(payload).length === 0) && e && e.parameter) {
      for (var key in e.parameter) {
        if (Object.prototype.hasOwnProperty.call(e.parameter, key)) {
          payload[key] = e.parameter[key];
        }
      }
    }

    var action = payload.action;
    var response;

    switch (action) {
      case 'create':
        response = createRecord(payload.date, payload.name, payload.meterIn, payload.meterOut, payload.capsIn, payload.capsOut, payload.size500mlIn, payload.size500mlOut, payload.size5LIn, payload.size5LOut, payload.size5GallonIn, payload.size5GallonOut, payload.misc, payload.cashSale, payload.capSale);
        break;
      case 'read':
        response = readRecords();
        break;
      case 'update':
        response = updateRecord(payload.id, payload.date, payload.name, payload.meterIn, payload.meterOut, payload.capsIn, payload.capsOut, payload.size500mlIn, payload.size500mlOut, payload.size5LIn, payload.size5LOut, payload.size5GallonIn, payload.size5GallonOut, payload.misc, payload.cashSale, payload.capSale);
        break;
      case 'delete':
        response = deleteRecord(payload.id);
        break;
      default:
        response = { success: false, message: 'Invalid action' };
    }

    return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, message: 'Server error: ' + error.toString() })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Create a new record
 */
function createRecord(date, name, meterIn, meterOut, capsIn, capsOut, size500mlIn, size500mlOut, size5LIn, size5LOut, size5GallonIn, size5GallonOut, misc, cashSale, capSale) {
  try {
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    const sheet = spreadsheet.getSheetByName(SHEET_NAME);
    
    if (!sheet) {
      return {
        success: false,
        message: 'Sheet "' + SHEET_NAME + '" not found. Please check SHEET_NAME and ensure the tab exists.'
      };
    }
    
    const id = generateId();
    const timestamp = new Date();

    // Ensure string fields are safe
    date = date || '';
    name = name || '';

    // Store raw values as provided (no parsing)
    sheet.appendRow([id, date, name, meterIn || '', meterOut || '', capsIn || '', capsOut || '', size500mlIn || '', size500mlOut || '', size5LIn || '', size5LOut || '', size5GallonIn || '', size5GallonOut || '', misc || '', cashSale || '', capSale || '', timestamp]);

    return {
      success: true,
      message: 'Record created successfully',
      id: id
    };
  } catch (error) {
    return {
      success: false,
      message: 'Error creating record: ' + error.toString()
    };
  }
}

/**
 * Read all records
 */
function readRecords() {
  try {
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    const sheet = spreadsheet.getSheetByName(SHEET_NAME);
    
    if (!sheet) {
      return {
        success: false,
        message: 'Sheet "' + SHEET_NAME + '" not found.',
        records: []
      };
    }
    
    const data = sheet.getDataRange().getValues();
    const records = [];

    // Skip header row (row 1)
    for (let i = 1; i < data.length; i++) {
      if (data[i][0]) { // Check if ID exists (not empty row)
        records.push({
          id: data[i][0],
          date: data[i][1],
          name: data[i][2],
          meterIn: data[i][3],
          meterOut: data[i][4],
          capsIn: data[i][5],
          capsOut: data[i][6],
          size500mlIn: data[i][7],
          size500mlOut: data[i][8],
          size5LIn: data[i][9],
          size5LOut: data[i][10],
          size5GallonIn: data[i][11],
          size5GallonOut: data[i][12],
          misc: data[i][13],
          cashSale: data[i][14],
          capSale: data[i][15],
          timestamp: data[i][16]
        });
      }
    }

    return {
      success: true,
      records: records
    };
  } catch (error) {
    return {
      success: false,
      message: 'Error reading records: ' + error.toString(),
      records: []
    };
  }
}

/**
 * Update a record
 */
function updateRecord(id, date, name, meterIn, meterOut, capsIn, capsOut, size500mlIn, size500mlOut, size5LIn, size5LOut, size5GallonIn, size5GallonOut, misc, cashSale, capSale) {
  try {
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    const sheet = spreadsheet.getSheetByName(SHEET_NAME);
    
    if (!sheet) {
      return {
        success: false,
        message: 'Sheet "' + SHEET_NAME + '" not found.'
      };
    }
    
    const data = sheet.getDataRange().getValues();

    // Ensure string fields are safe
    date = date || '';
    name = name || '';

    // Find and update the record
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === id) {
        sheet.getRange(i + 1, 2).setValue(date);              // Column B (date)
        sheet.getRange(i + 1, 3).setValue(name);              // Column C (name)
        sheet.getRange(i + 1, 4).setValue(meterIn || '');     // Column D (meterIn)
        sheet.getRange(i + 1, 5).setValue(meterOut || '');    // Column E (meterOut)
        sheet.getRange(i + 1, 6).setValue(capsIn || '');      // Column F (capsIn)
        sheet.getRange(i + 1, 7).setValue(capsOut || '');     // Column G (capsOut)
        sheet.getRange(i + 1, 8).setValue(size500mlIn || ''); // Column H (500mlIn)
        sheet.getRange(i + 1, 9).setValue(size500mlOut || ''); // Column I (500mlOut)
        sheet.getRange(i + 1, 10).setValue(size5LIn || '');   // Column J (5LIn)
        sheet.getRange(i + 1, 11).setValue(size5LOut || '');  // Column K (5LOut)
        sheet.getRange(i + 1, 12).setValue(size5GallonIn || ''); // Column L (5GallonIn)
        sheet.getRange(i + 1, 13).setValue(size5GallonOut || ''); // Column M (5GallonOut)
        sheet.getRange(i + 1, 14).setValue(misc || '');       // Column N (misc)
        sheet.getRange(i + 1, 15).setValue(cashSale || '');   // Column O (cashSale)
        sheet.getRange(i + 1, 16).setValue(capSale || '');    // Column P (capSale)
        sheet.getRange(i + 1, 17).setValue(new Date());       // Column Q (timestamp)

        return {
          success: true,
          message: 'Record updated successfully'
        };
      }
    }

    return {
      success: false,
      message: 'Record not found'
    };
  } catch (error) {
    return {
      success: false,
      message: 'Error updating record: ' + error.toString()
    };
  }
}

/**
 * Delete a record
 */
function deleteRecord(id) {
  try {
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    const sheet = spreadsheet.getSheetByName(SHEET_NAME);
    
    if (!sheet) {
      return {
        success: false,
        message: 'Sheet "' + SHEET_NAME + '" not found.'
      };
    }
    
    const data = sheet.getDataRange().getValues();

    // Find and delete the record
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === id) {
        sheet.deleteRow(i + 1);

        return {
          success: true,
          message: 'Record deleted successfully'
        };
      }
    }

    return {
      success: false,
      message: 'Record not found'
    };
  } catch (error) {
    return {
      success: false,
      message: 'Error deleting record: ' + error.toString()
    };
  }
}

/**
 * Generate a unique ID
 */
function generateId() {
  return 'ID_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

/**
 * Initialize the sheet with headers (run this once)
 */
function initializeSheet() {
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    sheet.getRange(1, 1, 1, 17).setValues([['ID', 'Date', 'Name', 'Meter In', 'Meter Out', 'Caps In', 'Caps Out', '500ml In', '500ml Out', '5L In', '5L Out', '5 Gallon In', '5 Gallon Out', 'Miscellaneous', 'Cash Sale', 'Cap Sale', 'Timestamp']]);
    Logger.log('Sheet initialized successfully');
  } catch (error) {
    Logger.log('Error initializing sheet: ' + error.toString());
  }
}
