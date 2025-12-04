/**
 * Booost Management System - Google Apps Script Backend
 * Main backend file for the hair braiding management system
 */

// Configuration
const SPREADSHEET_ID = "1ssgjR-nrZi0xqX1d4CWb7cjmX2zWSrnSeVjmV4h-ZsU"; // Replace with your Google Sheet ID
const SHEETS = {
    STYLISTS: "Stylists",
    BRAIDING_SESSIONS: "BraidingSessions",
    PAYMENTS: "Payments",
    LOCATIONS: "Locations",
    DASHBOARD_DATA: "DashboardData"
};

/**
 * Main doGet function to serve the HTML
 */
function doGet(e) {
    const page = e.parameter.page || 'dashboard';

    switch (page) {
        case 'dashboard':
            return HtmlService.createTemplateFromFile('index')
                .evaluate()
                .setTitle('Management Dashboard')
                .setFaviconUrl('https://img.icons8.com/color/32/000000/hair-salon.png');
        default:
            return HtmlService.createTemplateFromFile('index1')
                .evaluate()
                .setTitle('Management Dashboard');
    }
}

/**
 * Include HTML partials
 */
function include(filename) {
    return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

/**
 * Get Dashboard Data
 * Returns summary statistics for the dashboard
 */
function getDashboardData() {
    try {
        const ss = SpreadsheetApp.openById(SPREADSHEET_ID);

        // Get stylists data
        const stylistsSheet = getOrCreateSheet(ss, SHEETS.STYLISTS);
        const stylistsData = stylistsSheet.getDataRange().getValues();
        const totalStylists = Math.max(0, stylistsData.length - 1); // Exclude header

        // Get braiding sessions data
        const braidingSheet = getOrCreateSheet(ss, SHEETS.BRAIDING_SESSIONS);
        const braidingData = braidingSheet.getDataRange().getValues();
        const totalBraiding = Math.max(0, braidingData.length - 1); // Exclude header

        // Get payments data
        const paymentsSheet = getOrCreateSheet(ss, SHEETS.PAYMENTS);
        const paymentsData = paymentsSheet.getDataRange().getValues();

        // Calculate financial stats
        let totalPayment = 0;
        let pendingPayment = 0;

        for (let i = 1; i < paymentsData.length; i++) {
            const amount = parseFloat(paymentsData[i][3]) || 0; // Amount column
            const status = paymentsData[i][4] || ''; // Status column

            totalPayment += amount;
            if (status.toLowerCase() === 'pending') {
                pendingPayment += amount;
            }
        }

        // Get location summary
        const locations = getLocationSummary();

        return {
            success: true,
            totalStylists: totalStylists,
            totalBraiding: totalBraiding,
            totalPayment: formatCurrency(totalPayment),
            pendingPayment: formatCurrency(pendingPayment),
            locations: locations,
            lastUpdated: new Date().toISOString()
        };

    } catch (error) {
        console.error('Error getting dashboard data:', error);
        return {
            success: false,
            error: error.toString(),
            totalStylists: 265,
            totalBraiding: 9608,
            totalPayment: "₦48.04M",
            pendingPayment: "₦3.83M",
            locations: getSampleLocationData()
        };
    }
}

/**
 * Get Location Summary Data
 */
function getLocationSummary() {
    try {
        const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
        const locationsSheet = getOrCreateSheet(ss, SHEETS.LOCATIONS);
        const data = locationsSheet.getDataRange().getValues();

        if (data.length <= 1) {
            // Return sample data if no data exists
            return getSampleLocationData();
        }

        const locations = [];
        for (let i = 1; i < data.length; i++) {
            locations.push({
                name: data[i][0] || '',
                stylists: parseInt(data[i][1]) || 0,
                braiding: parseInt(data[i][2]) || 0,
                rating: parseFloat(data[i][3]) || 0,
                total: parseFloat(data[i][4]) || 0,
                received: parseFloat(data[i][5]) || 0,
                pending: parseFloat(data[i][6]) || 0
            });
        }

        return locations;

    } catch (error) {
        console.error('Error getting location summary:', error);
        return getSampleLocationData();
    }
}

/**
 * Register New Stylist
 */
function registerStylist(stylistData) {
    try {
        const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
        const stylistsSheet = getOrCreateSheet(ss, SHEETS.STYLISTS);

        // Prepare row data
        const newRow = [
            new Date(), // Registration Date
            stylistData.name || '',
            stylistData.phone || '',
            stylistData.location || '',
            stylistData.experience || '',
            stylistData.specialization || '',
            stylistData.rating || 0,
            'Active' // Status
        ];

        stylistsSheet.appendRow(newRow);

        return {
            success: true,
            message: 'Stylist registered successfully',
            stylistId: generateStylistId()
        };

    } catch (error) {
        console.error('Error registering stylist:', error);
        return {
            success: false,
            error: error.toString()
        };
    }
}

/**
 * Save Braiding Session
 */
function saveBraidingSession(sessionData) {
    try {
        const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
        const braidingSheet = getOrCreateSheet(ss, SHEETS.BRAIDING_SESSIONS);

        // Prepare row data
        const newRow = [
            new Date(), // Session Date
            sessionData.stylistId || '',
            sessionData.stylistName || '',
            sessionData.clientName || '',
            sessionData.serviceType || '',
            parseFloat(sessionData.amount) || 0,
            sessionData.duration || '',
            sessionData.location || '',
            sessionData.rating || 0,
            'Completed' // Status
        ];

        braidingSheet.appendRow(newRow);

        // Update payments
        updatePaymentRecord(sessionData);

        return {
            success: true,
            message: 'Braiding session recorded successfully',
            sessionId: generateSessionId()
        };

    } catch (error) {
        console.error('Error saving braiding session:', error);
        return {
            success: false,
            error: error.toString()
        };
    }
}

/**
 * Update Payment Record
 */
function updatePaymentRecord(sessionData) {
    try {
        const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
        const paymentsSheet = getOrCreateSheet(ss, SHEETS.PAYMENTS);

        // Add payment record
        const paymentRow = [
            new Date(), // Payment Date
            sessionData.stylistId || '',
            sessionData.clientName || '',
            parseFloat(sessionData.amount) || 0,
            sessionData.paymentStatus || 'Pending',
            sessionData.paymentMethod || 'Cash',
            sessionData.location || ''
        ];

        paymentsSheet.appendRow(paymentRow);

    } catch (error) {
        console.error('Error updating payment record:', error);
    }
}

/**
 * Get All Stylists
 */
function getAllStylists() {
    try {
        const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
        const stylistsSheet = getOrCreateSheet(ss, SHEETS.STYLISTS);
        const data = stylistsSheet.getDataRange().getValues();

        if (data.length <= 1) {
            return { success: true, stylists: [] };
        }

        const stylists = [];
        for (let i = 1; i < data.length; i++) {
            stylists.push({
                id: i,
                registrationDate: data[i][0],
                name: data[i][1],
                phone: data[i][2],
                location: data[i][3],
                experience: data[i][4],
                specialization: data[i][5],
                rating: data[i][6],
                status: data[i][7]
            });
        }

        return {
            success: true,
            stylists: stylists
        };

    } catch (error) {
        console.error('Error getting stylists:', error);
        return {
            success: false,
            error: error.toString(),
            stylists: []
        };
    }
}

/**
 * Get Payment Records
 */
function getPaymentRecords(filters = {}) {
    try {
        const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
        const paymentsSheet = getOrCreateSheet(ss, SHEETS.PAYMENTS);
        const data = paymentsSheet.getDataRange().getValues();

        if (data.length <= 1) {
            return { success: true, payments: [] };
        }

        const payments = [];
        for (let i = 1; i < data.length; i++) {
            const payment = {
                id: i,
                paymentDate: data[i][0],
                stylistId: data[i][1],
                clientName: data[i][2],
                amount: data[i][3],
                status: data[i][4],
                method: data[i][5],
                location: data[i][6]
            };

            // Apply filters if any
            if (filters.location && payment.location !== filters.location) continue;
            if (filters.status && payment.status !== filters.status) continue;
            if (filters.fromDate && new Date(payment.paymentDate) < new Date(filters.fromDate)) continue;
            if (filters.toDate && new Date(payment.paymentDate) > new Date(filters.toDate)) continue;

            payments.push(payment);
        }

        return {
            success: true,
            payments: payments
        };

    } catch (error) {
        console.error('Error getting payment records:', error);
        return {
            success: false,
            error: error.toString(),
            payments: []
        };
    }
}

/**
 * Initialize Sheets with Headers
 */
function initializeSheets() {
    try {
        const ss = SpreadsheetApp.openById(SPREADSHEET_ID);

        // Initialize Stylists Sheet
        const stylistsSheet = getOrCreateSheet(ss, SHEETS.STYLISTS);
        if (stylistsSheet.getLastRow() === 0) {
            stylistsSheet.appendRow([
                'Registration Date', 'Name', 'Phone', 'Location', 'Experience',
                'Specialization', 'Rating', 'Status'
            ]);
        }

        // Initialize Braiding Sessions Sheet
        const braidingSheet = getOrCreateSheet(ss, SHEETS.BRAIDING_SESSIONS);
        if (braidingSheet.getLastRow() === 0) {
            braidingSheet.appendRow([
                'Session Date', 'Stylist ID', 'Stylist Name', 'Client Name',
                'Service Type', 'Amount', 'Duration', 'Location', 'Rating', 'Status'
            ]);
        }

        // Initialize Payments Sheet
        const paymentsSheet = getOrCreateSheet(ss, SHEETS.PAYMENTS);
        if (paymentsSheet.getLastRow() === 0) {
            paymentsSheet.appendRow([
                'Payment Date', 'Stylist ID', 'Client Name', 'Amount',
                'Status', 'Payment Method', 'Location'
            ]);
        }

        // Initialize Locations Sheet
        const locationsSheet = getOrCreateSheet(ss, SHEETS.LOCATIONS);
        if (locationsSheet.getLastRow() === 0) {
            locationsSheet.appendRow([
                'Location Name', 'Stylists Count', 'Braiding Done', 'Avg Rating',
                'Total Revenue', 'Payment Received', 'Pending Payment'
            ]);

            // Add sample data
            const sampleLocations = getSampleLocationData();
            sampleLocations.forEach(location => {
                locationsSheet.appendRow([
                    location.name, location.stylists, location.braiding, location.rating,
                    location.total, location.received, location.pending
                ]);
            });
        }

        return { success: true, message: 'Sheets initialized successfully' };

    } catch (error) {
        console.error('Error initializing sheets:', error);
        return { success: false, error: error.toString() };
    }
}

// ================ HELPER FUNCTIONS ================

/**
 * Get or create sheet
 */
function getOrCreateSheet(spreadsheet, sheetName) {
    let sheet = spreadsheet.getSheetByName(sheetName);
    if (!sheet) {
        sheet = spreadsheet.insertSheet(sheetName);
    }
    return sheet;
}

/**
 * Format currency
 */
function formatCurrency(amount) {
    if (amount >= 1000000) {
        return `₦${(amount / 1000000).toFixed(2)}M`;
    } else if (amount >= 1000) {
        return `₦${(amount / 1000).toFixed(0)}K`;
    } else {
        return `₦${amount.toFixed(2)}`;
    }
}

/**
 * Generate unique stylist ID
 */
function generateStylistId() {
    return 'STY' + new Date().getTime().toString().substr(-6);
}

/**
 * Generate unique session ID
 */
function generateSessionId() {
    return 'SES' + new Date().getTime().toString().substr(-6);
}

/**
 * Get sample location data
 */
function getSampleLocationData() {
    return [
        {
            name: "Oja Oba Market Akure",
            stylists: 40,
            braiding: 1232,
            rating: 4.3,
            total: 6160000,
            received: 5010000,
            pending: 1150000
        },
        {
            name: "Ondo Market",
            stylists: 38,
            braiding: 3400,
            rating: 4.3,
            total: 17000000,
            received: 16250000,
            pending: 750000
        },
        {
            name: "Oja Oba Market, Ado - Ekiti",
            stylists: 56,
            braiding: 1356,
            rating: 4.0,
            total: 6780000,
            received: 6130000,
            pending: 650000
        },
        {
            name: "Oja Tuntun, Ilorin",
            stylists: 66,
            braiding: 2322,
            rating: 4.7,
            total: 11610000,
            received: 10985000,
            pending: 625000
        },
        {
            name: "Orisunbare Market, Osogbo",
            stylists: 65,
            braiding: 1298,
            rating: 4.3,
            total: 6490000,
            received: 5840000,
            pending: 650000
        }
    ];
}

/**
 * Test function to initialize everything
 */
function setupBooostSystem() {
    console.log('Setting up Booost Management System...');
    const result = initializeSheets();
    console.log('Setup result:', result);
    return result;
}