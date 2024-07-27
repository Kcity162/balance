document.addEventListener('DOMContentLoaded', () => {
  const balanceElement = document.getElementById('balance');
  const inputElement = document.getElementById('balanceInput');
  const dailyBalanceElement = document.getElementById('dailyBalance');

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

  // Load balance from local storage
  const storedBalance = localStorage.getItem('balance');
  if (storedBalance) {
    const balance = parseFloat(storedBalance);
    balanceElement.textContent = formatCurrency(balance);
    inputElement.value = balance;
    updateDailyBalance(balance);
  }

  // Load daily balance from local storage
  const storedDailyBalance = localStorage.getItem('dailyBalance');
  if (storedDailyBalance) {
    dailyBalanceElement.textContent = `Daily allowance: ${formatCurrency(parseFloat(storedDailyBalance))}`;
  }

  inputElement.addEventListener('input', () => {
    const balance = parseFloat(inputElement.value) || 0;
    balanceElement.textContent = formatCurrency(balance);
    updateDailyBalance(balance);
    // Save balance to local storage
    localStorage.setItem('balance', balance);
  });

  updateDailyBalance(0);
});
