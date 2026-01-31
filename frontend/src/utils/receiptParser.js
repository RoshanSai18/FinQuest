/**
 * receiptParser.js
 * Scans raw OCR text for the largest number (Total) and a date.
 */

export const parseReceipt = (text) => {
    // 1. Clean the text (remove weird symbols but keep digits, dots, and dates)
    const cleanText = text.replace(/[^a-zA-Z0-9\s.,:\/-]/g, " ");

    // 2. Extract Amounts
    // Regex matches: 100.00, 1,200.50, 450
    const amountRegex = /(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/g;
    const allAmounts = cleanText.match(amountRegex);
    
    let detectedAmount = "";
    if (allAmounts) {
        // Convert "1,200.50" -> 1200.50 to find the Max
        const numbers = allAmounts
            .map(num => parseFloat(num.replace(/,/g, '')))
            .filter(num => !isNaN(num));
        
        if (numbers.length > 0) {
            // Heuristic: Total is usually the max number
            detectedAmount = Math.max(...numbers).toString();
        }
    }

    // 3. Extract Date (DD/MM/YYYY or YYYY-MM-DD)
    const dateRegex = /(\d{2}[-./]\d{2}[-./]\d{4})|(\d{4}[-./]\d{2}[-./]\d{2})/;
    const dateMatch = cleanText.match(dateRegex);
    
    // Default to Today if no date found
    const detectedDate = dateMatch ? formatDate(dateMatch[0]) : new Date().toISOString().split('T')[0];

    return { amount: detectedAmount, date: detectedDate };
};

// Helper to fix date formats to YYYY-MM-DD for HTML inputs
const formatDate = (rawDate) => {
    try {
        const standardized = rawDate.replace(/[./]/g, '-');
        const dateObj = new Date(standardized);
        if (isNaN(dateObj.getTime())) return new Date().toISOString().split('T')[0];
        return dateObj.toISOString().split('T')[0];
    } catch (e) {
        return new Date().toISOString().split('T')[0];
    }
};
