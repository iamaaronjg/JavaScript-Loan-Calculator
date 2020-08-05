// Listen for submit
document.getElementById('loan-form').addEventListener('submit', calculateResults);

// Calculate results function
function calculateResults(e) {
    console.log('Calculating...');

    // UI variables
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    // Compute the monthly repayment
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    if (isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
    } else {
        showError('Please check your numbers');
    }

    // Prevent submit default behaviour (no redirect)
    e.preventDefault();
}

// Show error when user submits invalid inputs
function showError(error) {
    // Creates div to display error
    const errorDiv = document.createElement('div');

    // Get required elements to display error
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    // Add Bootstrap danger class
    errorDiv.className = 'alert alert-danger';

    // Create text node and append to the error div
    errorDiv.appendChild(document.createTextNode(error));

    // Insert error message above heading using insertBefore() function (as the card is the parent element of heading)
    card.insertBefore(errorDiv, heading);

    // Clear error message after 3 seconds
    setTimeout(clearError, 3000);
}

// Clear error function
function clearError() {
    document.querySelector('.alert').remove();
}