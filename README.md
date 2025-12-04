# Booost Clone - Hair Braiding Management System

A comprehensive web-based management system for hair braiding businesses, inspired by booost.onrender.com. This system helps manage stylists, track braiding services, handle payments, and provides analytics for hair braiding businesses across multiple locations.

## 🌟 Features

### Dashboard
- **Real-time Statistics**: Track total stylists, completed braiding sessions, total payments, and pending payments
- **Location Summary**: Monitor performance across multiple markets/locations
- **Visual Analytics**: Charts showing revenue trends and location performance
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

### Stylist Management
- **Registration System**: Complete stylist registration with experience levels and specializations
- **Location Assignment**: Assign stylists to specific markets/locations
- **Performance Tracking**: Monitor individual stylist ratings and activity

### Service Tracking
- **Braiding Service Form**: Record completed braiding sessions with detailed information
- **Service Types**: Support for multiple braiding styles (Box Braids, Cornrows, Ghana Weaving, etc.)
- **Duration & Pricing**: Track service duration and pricing
- **Rating System**: Client satisfaction ratings for quality control

### Payment Management
- **Payment Status Tracking**: Monitor completed, pending, and partial payments
- **Revenue Analytics**: Track total revenue and pending amounts by location
- **Payment Methods**: Support for various payment methods

## 🚀 Quick Start

### 1. Download Files
Download both files to a folder on your computer:
- `index.html` - The main application file
- `Code.gs` - Google Apps Script backend code

### 2. Open in Browser (Demo Mode)
Simply open `index.html` in your web browser to see the demo with sample data.

### 3. Setup Google Apps Script Backend (Full Functionality)

#### Step 1: Create Google Apps Script Project
1. Go to [Google Apps Script](https://script.google.com/)
2. Click "New Project"
3. Replace the default code with the contents of `Code.gs`
4. Save the project with a name like "Booost Management System"

#### Step 2: Create Google Spreadsheet
1. Go to [Google Sheets](https://sheets.google.com/)
2. Create a new spreadsheet
3. Name it "Booost Management Data"
4. Copy the spreadsheet ID from the URL (the long string between `/d/` and `/edit`)
5. In your Apps Script project, replace `YOUR_SPREADSHEET_ID_HERE` with your actual spreadsheet ID

#### Step 3: Deploy Web App
1. In Apps Script, click "Deploy" → "New deployment"
2. Choose type: "Web app"
3. Set execute as: "Me"
4. Set access: "Anyone" (or "Anyone with Google account" for more security)
5. Click "Deploy"
6. Copy the web app URL

#### Step 4: Connect Frontend to Backend
1. Open `index.html` in a text editor
2. Find the line: `GOOGLE_SCRIPT_URL: 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE'`
3. Replace `YOUR_GOOGLE_APPS_SCRIPT_URL_HERE` with your web app URL
4. Save the file

#### Step 5: Initialize the System
1. In Apps Script, run the `setupBooostSystem()` function manually once
2. This will create all necessary sheets with proper headers and sample data

### 4. Open Your Application
Open `index.html` in your browser. The system will now save data to your Google Sheets!

## 📊 System Structure

### Google Sheets Structure
The system uses 5 sheets in your Google Spreadsheet:

1. **Stylists** - Stores stylist registration data
2. **BraidingSessions** - Records all braiding service sessions
3. **Payments** - Tracks payment information
4. **Locations** - Manages location/market data
5. **DashboardData** - Stores dashboard summary information

### Supported Locations
- Oja Oba Market Akure
- Ondo Market  
- Oja Oba Market, Ado - Ekiti
- Oja Tuntun, Ilorin
- Orisunbare Market, Osogbo

### Braiding Service Types
- Traditional Box Braids
- Cornrows
- Twist Braids
- French Braids
- Ghana Weaving
- Senegalese Twists
- Fulani Braids
- Kinky Twists
- Micro Braids
- Locs Maintenance

## 🔧 Customization

### Adding New Locations
1. Open `index.html` in a text editor
2. Find the location dropdown options in both the stylist registration and braiding service forms
3. Add new `<option>` elements with your location names
4. Update the sample data in the JavaScript section if needed

### Adding New Service Types
1. Find the service type dropdown in the braiding service form
2. Add new `<option>` elements with your service types

### Styling Changes
The system uses Bootstrap 5.3.2 for styling. You can:
- Modify the CSS variables at the top of the HTML file
- Add custom CSS rules
- Change the color scheme by updating the CSS custom properties

## 🛠️ Technical Details

### Frontend Technologies
- HTML5
- CSS3 with Bootstrap 5.3.2
- JavaScript (ES6+)
- Chart.js for data visualization
- Font Awesome for icons

### Backend Technology
- Google Apps Script (JavaScript)
- Google Sheets for data storage

### API Endpoints
The Google Apps Script backend provides these functions:
- `getDashboardData()` - Get summary statistics
- `registerStylist(data)` - Register new stylist
- `saveBraidingSession(data)` - Record braiding service
- `getAllStylists()` - Get all registered stylists
- `getPaymentRecords()` - Get payment history

## 📱 Mobile Support

The application is fully responsive and works on:
- Desktop computers (Windows, Mac, Linux)
- Tablets (iPad, Android tablets)
- Mobile phones (iPhone, Android phones)

## 🔒 Security Notes

- The system uses Google's authentication for backend access
- Data is stored securely in Google Sheets
- No sensitive data is stored in the frontend code
- All API calls are made over HTTPS

## 🐛 Troubleshooting

### Common Issues

**"Using sample data" message**
- The Google Apps Script URL is not configured
- Check that you've replaced `YOUR_GOOGLE_APPS_SCRIPT_URL_HERE` with your actual web app URL

**Form submissions not saving**
- Ensure your Google Apps Script is deployed as a web app
- Check that the spreadsheet ID is correctly set in `Code.gs`
- Verify that the Google Apps Script has permission to access the spreadsheet

**Charts not loading**
- Ensure you have an internet connection (Chart.js loads from CDN)
- Check browser console for JavaScript errors

### Support
For issues or questions:
1. Check the browser console for error messages
2. Verify all setup steps have been completed
3. Test with the demo data first before connecting to Google Sheets

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Inspired by booost.onrender.com
- Built with Bootstrap, Chart.js, and Google Apps Script
- Icons provided by Font Awesome

---

**Note**: This is a clone/recreation for educational and business purposes. Replace the Google Apps Script URL in the configuration to connect to your own backend system.