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
  
    inputElement.addEventListener('input', () => {
      const balance = parseFloat(inputElement.value) || 0;
      balanceElement.textContent = formatCurrency(balance);
      updateDailyBalance(balance);
    });
  
    const getDaysLeftInMonth = () => {
      const today = new Date();
      const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      return lastDayOfMonth.getDate() - today.getDate() + 1;
    };
  
    const updateDailyBalance = (balance) => {
      const daysLeft = getDaysLeftInMonth();
      const dailyBalance = balance / daysLeft;
      dailyBalanceElement.textContent = `Daily balance: ${formatCurrency(dailyBalance)}`;
    };
  
    updateDailyBalance(0);
  });
  