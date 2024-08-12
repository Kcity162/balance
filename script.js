var name = 'Lilly';
var balance = 550; //The user's starting balance.
var target_budget = 1000; //The total budget the user has set for the month.
var days_in_month = 31; //The total number of days in the current month.
var spend_data = [  '£13 <tag class="need">Need</tag> <note class="note">This is a note</note>',
                    '£2.50 <tag class="want">Want</tag>  <note class="note">This is a another note</note>',
                    '£1.89 <tag class="want">Want</tag>  <note class="note">Yes this is a note</note>',
                    '£2.37 <tag class="need">Need</tag>  <note class="note">Another note note</note>',
                    '£89.78 <tag class="want">Want</tag>  <note class="note">This is a note</note>']; //An empty list or dictionary to store the daily spend, categorized by the user.

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, options);
  });                 


document.getElementById('spendingEntry0').innerHTML = spend_data[0].toString();
document.getElementById('spendingEntry1').innerHTML = spend_data[1].toString();
document.getElementById('spendingEntry2').innerHTML = spend_data[2].toString();
document.getElementById('spendingEntry3').innerHTML = spend_data[3].toString();
document.getElementById('spendingEntry4').innerHTML = spend_data[4].toString();

