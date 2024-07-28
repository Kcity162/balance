
document.addEventListener('DOMContentLoaded', () => {
  const balanceElement = document.getElementById('balance');
  const inputElement = document.getElementById('balanceInput');
  const dailyBalanceElement = document.getElementById('dailyBalance');
  const lastUpdatedElement = document.getElementById('lastUpdated');

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP'
    }).format(value);
  };

  const getDaysLeftInMonth = () => {
    const today = new Date();
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    return lastDayOfMonth.getDate() - today.getDate() + 1;
  };

  const updateDailyBalance = (balance) => {
    const daysLeft = getDaysLeftInMonth();
    const dailyBalance = balance / daysLeft;
    dailyBalanceElement.textContent = `Daily allowance: ${formatCurrency(dailyBalance)}`;
    // Save daily balance to local storage
    localStorage.setItem('dailyBalance', dailyBalance);
  };

  const updateLastUpdated = () => {
    const now = new Date();
    const lastUpdated = now.toISOString();
    localStorage.setItem('lastUpdated', lastUpdated);
    displayLastUpdated();
  };

  const displayLastUpdated = () => {
    const storedLastUpdated = localStorage.getItem('lastUpdated');
    if (storedLastUpdated) {
      lastUpdatedElement.textContent = `Last updated: ${timeSince(new Date(storedLastUpdated))} ago`;
    }
  };

  const timeSince = (date) => {
    const seconds = Math.floor((new Date() - date) / 1000);
    let interval = Math.floor(seconds / 31536000);

    if (interval >= 1) {
      return interval + " year" + (interval > 1 ? "s" : "");
    }
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      return interval + " month" + (interval > 1 ? "s" : "");
    }
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
      return interval + " day" + (interval > 1 ? "s" : "");
    }
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
      return interval + " hour" + (interval > 1 ? "s" : "");
    }
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
      return interval + " minute" + (interval > 1 ? "s" : "");
    }
    return Math.floor(seconds) + " second" + (seconds > 1 ? "s" : "");
  };

  // Load balance from local storage
  const storedBalance = localStorage.getItem('balance');
  if (storedBalance) {
    const balance = parseFloat(storedBalance);
    balanceElement.textContent = formatCurrency(balance);
    inputElement.value = formatCurrency(balance);  // Format the input value as currency
    updateDailyBalance(balance);
  }

  // Load daily balance from local storage
  const storedDailyBalance = localStorage.getItem('dailyBalance');
  if (storedDailyBalance) {
    dailyBalanceElement.textContent = `Daily allowance: ${formatCurrency(parseFloat(storedDailyBalance))}`;
  }

  // Load last updated from local storage
  displayLastUpdated();

  inputElement.addEventListener('input', () => {
    const inputValue = inputElement.value.replace(/[^0-9.-]+/g, ''); // Remove non-numeric characters
    const balance = parseFloat(inputValue) || 0;
    balanceElement.textContent = formatCurrency(balance);
    updateDailyBalance(balance);
    updateLastUpdated();
    // Save balance to local storage
    localStorage.setItem('balance', balance);
  });

  // Periodically update the "last updated" time
  setInterval(displayLastUpdated, 60000); // Update every minute
});

function daysLeftInMonth() {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const daysLeft = lastDay.getDate() - now.getDate();
  
  const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
  ];
  const currentMonthName = monthNames[currentMonth];

  return { daysLeft, currentMonthName };
}

const { daysLeft, currentMonthName } = daysLeftInMonth();
document.getElementById('days-left').textContent = 
  ` ${daysLeft} Days left in ${currentMonthName}`;

  