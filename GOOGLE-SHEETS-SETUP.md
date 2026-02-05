# Google Sheets Integration Setup Guide

This guide will help you set up automatic collection of quiz responses from your Gemara Training website into a Google Spreadsheet.

## Overview

When enabled, the website will automatically send quiz responses to a Google Sheet, including:
- Timestamp of quiz completion
- Quiz name and score
- Individual question responses
- Anonymous user fingerprint (for tracking repeat attempts without collecting personal info)
- Pass/fail status

## Step-by-Step Setup

### Step 1: Create a Google Spreadsheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it something like "Gemara Training Quiz Responses"
4. Note the Spreadsheet ID from the URL (it's the long string between `/d/` and `/edit`)

### Step 2: Set Up Google Apps Script

1. In your spreadsheet, click **Extensions** → **Apps Script**
2. Delete any existing code in the editor
3. Copy and paste the following code:

```javascript
// Google Apps Script for Gemara Training Quiz Responses

function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);

    // Get or create the appropriate sheet
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet;

    if (data.type === 'progress') {
      sheet = getOrCreateSheet(ss, 'Progress');
      recordProgress(sheet, data);
    } else {
      sheet = getOrCreateSheet(ss, 'Quiz Responses');
      recordQuizResponse(sheet, data);
    }

    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Data recorded successfully'
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function getOrCreateSheet(ss, sheetName) {
  let sheet = ss.getSheetByName(sheetName);

  if (!sheet) {
    sheet = ss.insertSheet(sheetName);

    // Set up headers based on sheet type
    if (sheetName === 'Quiz Responses') {
      setupQuizResponseHeaders(sheet);
    } else if (sheetName === 'Progress') {
      setupProgressHeaders(sheet);
    }
  }

  return sheet;
}

function setupQuizResponseHeaders(sheet) {
  const headers = [
    'Timestamp',
    'User Fingerprint',
    'Quiz ID',
    'Quiz Title',
    'Total Questions',
    'Correct Answers',
    'Score %',
    'Passed',
    'Passing Score Required',
    'Question Details',
    'User Agent'
  ];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
  sheet.setFrozenRows(1);

  // Auto-resize columns
  for (let i = 1; i <= headers.length; i++) {
    sheet.autoResizeColumn(i);
  }
}

function setupProgressHeaders(sheet) {
  const headers = [
    'Timestamp',
    'User Fingerprint',
    'Event Type',
    'Module Number',
    'Details'
  ];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
  sheet.setFrozenRows(1);
}

function recordQuizResponse(sheet, data) {
  // Format question details
  const questionDetails = data.answers.map(answer => {
    return `Q${answer.questionNumber}: ${answer.isCorrect ? '✓' : '✗'} - Selected: "${answer.selectedAnswer}"${!answer.isCorrect ? ` (Correct: "${answer.correctAnswer}")` : ''}`;
  }).join('\n\n');

  const row = [
    data.timestamp,
    data.fingerprint,
    data.quizId,
    data.quizTitle,
    data.totalQuestions,
    data.correctAnswers,
    data.scorePercentage + '%',
    data.passed ? 'YES' : 'NO',
    data.passingScore + '%',
    questionDetails,
    data.userAgent
  ];

  sheet.appendRow(row);

  // Format the new row
  const lastRow = sheet.getLastRow();

  // Color code pass/fail
  const passFailCell = sheet.getRange(lastRow, 8);
  if (data.passed) {
    passFailCell.setBackground('#d4edda');
    passFailCell.setFontColor('#155724');
  } else {
    passFailCell.setBackground('#f8d7da');
    passFailCell.setFontColor('#721c24');
  }

  // Wrap text for question details
  sheet.getRange(lastRow, 10).setWrap(true);
}

function recordProgress(sheet, data) {
  const row = [
    data.timestamp,
    data.fingerprint,
    data.eventType,
    data.moduleNumber || '',
    data.details || ''
  ];

  sheet.appendRow(row);
}

// Test function (optional - you can run this to test the setup)
function testSetup() {
  const testData = {
    timestamp: new Date().toISOString(),
    fingerprint: 'test123',
    quizId: 'module1-quiz',
    quizTitle: 'Test Quiz',
    totalQuestions: 2,
    correctAnswers: 1,
    scorePercentage: 50,
    passed: false,
    passingScore: 80,
    answers: [
      {
        questionNumber: 1,
        question: 'Test question 1?',
        selectedAnswer: 'Option A',
        correctAnswer: 'Option A',
        isCorrect: true
      },
      {
        questionNumber: 2,
        question: 'Test question 2?',
        selectedAnswer: 'Option B',
        correctAnswer: 'Option C',
        isCorrect: false
      }
    ],
    userAgent: 'Test User Agent'
  };

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = getOrCreateSheet(ss, 'Quiz Responses');
  recordQuizResponse(sheet, testData);

  Logger.log('Test data added successfully!');
}
```

4. Click the **Save** icon (💾) or press `Ctrl+S` / `Cmd+S`
5. Name the project "Gemara Quiz Response Handler"

### Step 3: Deploy the Web App

1. Click **Deploy** → **New deployment**
2. Click the gear icon (⚙️) next to "Select type"
3. Choose **Web app**
4. Configure the deployment:
   - **Description**: "Quiz response collector"
   - **Execute as**: Me (your email)
   - **Who has access**: **Anyone** (this allows the website to send data)
5. Click **Deploy**
6. **Important**: Copy the **Web app URL** that appears (it will look like `https://script.google.com/macros/s/AKfycby.../exec`)
7. Click **Done**

### Step 4: Configure the Website

1. Open the file: `src/web/js/google-sheets-integration.js`
2. Find the line:
   ```javascript
   this.scriptUrl = 'REPLACE_WITH_YOUR_GOOGLE_APPS_SCRIPT_URL';
   ```
3. Replace it with your Web app URL from Step 3:
   ```javascript
   this.scriptUrl = 'https://script.google.com/macros/s/AKfycby.../exec';
   ```
4. Change the enabled flag to true:
   ```javascript
   this.enabled = true;
   ```
5. Save the file
6. Commit and push to GitHub:
   ```bash
   git add src/web/js/google-sheets-integration.js
   git commit -m "feat: configure Google Sheets integration with deployment URL"
   git push
   ```

### Step 5: Test the Integration

1. Wait a few minutes for GitHub Pages to redeploy
2. Visit your training website
3. Complete a quiz
4. Check your Google Spreadsheet - you should see a new row with the quiz response!

## What Data is Collected?

### Quiz Responses Sheet

Each quiz completion creates a new row with:

- **Timestamp**: When the quiz was completed
- **User Fingerprint**: Anonymous identifier (not personally identifiable)
- **Quiz ID**: Internal quiz identifier
- **Quiz Title**: Human-readable quiz name
- **Total Questions**: Number of questions in the quiz
- **Correct Answers**: Number of correct answers
- **Score %**: Percentage score
- **Passed**: YES/NO indicator (color-coded green/red)
- **Passing Score Required**: The passing threshold
- **Question Details**: Full breakdown of each question and answer
- **User Agent**: Browser/device information

### Example Data

```
Timestamp: 2026-02-05T17:30:45.123Z
User Fingerprint: 12345_1920x1080_300
Quiz ID: module1-quiz
Quiz Title: Module 1: Understanding Gemara Framework
Total Questions: 10
Correct Answers: 9
Score %: 90%
Passed: YES
Passing Score Required: 80%
Question Details:
  Q1: ✓ - Selected: "GRC Engineering Model for Automated Risk Assessment"
  Q2: ✓ - Selected: "Layer 3"
  Q3: ✗ - Selected: "JSON" (Correct: "YAML")
  ...
User Agent: Mozilla/5.0...
```

## Privacy & Anonymous Tracking

The fingerprint is generated from:
- Browser canvas rendering (creates a unique hash)
- Screen resolution
- Timezone offset

This allows you to:
- Track completion rates
- Identify repeat attempts
- Analyze user patterns

**Without collecting:**
- Names
- Email addresses
- IP addresses
- Any personally identifiable information

## Analyzing the Data

### Common Queries

**View all quiz attempts:**
```
Sort by: Timestamp (newest first)
```

**Find users who passed:**
```
Filter: Passed = "YES"
```

**See average scores per quiz:**
```
Pivot Table: Rows = Quiz Title, Values = Average of Score %
```

**Identify struggling questions:**
Review the "Question Details" column to see which questions are frequently missed.

## Troubleshooting

### Data not appearing in spreadsheet

1. Check browser console (F12) for errors
2. Verify the Web app URL is correct in `google-sheets-integration.js`
3. Ensure `enabled` is set to `true`
4. Confirm the Apps Script deployment is set to "Anyone" can access
5. Try redeploying the Apps Script with a new deployment

### Permission errors

- Make sure you authorized the script when deploying
- Check that "Execute as" is set to your account
- Ensure "Who has access" is set to "Anyone"

### Testing the Apps Script

Run the `testSetup()` function in the Apps Script editor to verify it's working:
1. Select the `testSetup` function from the dropdown
2. Click **Run** (▶️)
3. Authorize if prompted
4. Check your spreadsheet for a test row

## Data Export

To export your collected data:

1. **File** → **Download** → Choose format (Excel, CSV, PDF)
2. Use Google Sheets API for automated exports
3. Connect to Google Data Studio for dashboards

## Next Steps

Once you have data flowing, you can:

1. **Create dashboards** using Google Data Studio
2. **Set up email alerts** for new submissions
3. **Export weekly reports** of completion rates
4. **Analyze question difficulty** to improve the course
5. **Track user journeys** through the complete course

---

## Need Help?

If you encounter issues:
1. Check the browser console for errors
2. Review the Apps Script execution log
3. Verify all URLs are correct
4. Test with the `testSetup()` function

For questions or issues, open a GitHub issue at: https://github.com/hbraswelrh/gemara-training/issues
