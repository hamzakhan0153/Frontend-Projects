const balance = document.getElementById('balance');
const moneyCredit = document.getElementById('money-credit');
const moneyDebit = document.getElementById('money-debit');
const list = document.getElementById('list');
const form = document.getElementById('add-form');
const reason = document.getElementById('reason');
const amount = document.getElementById('amount');

const Transactions = [
    // { id: 1, reason: 'Salary', amount: 5000 },
    // { id: 2, reason: 'Breakfast', amount: -20 },
    // { id: 3, reason: 'Lunch', amount: -30 },
    // { id: 4, reason: 'Dinner', amount: -60 },
];

let transactions = Transactions;

displayTransaction = (transaction) => {

    const type = transaction.amount > 0 ? '+' : '-';

    const transactionLI = document.createElement('li');
    transactionLI.classList.add(transaction.amount > 0 ? 'credit' : 'debit');
    transactionLI.innerHTML = `
      ${transaction.reason} <span>${transaction.amount}</span>
      <button class="delete-btn" onclick="deleteTransaction(${transaction.id})" >X</button>
    `;
    list.appendChild(transactionLI)

}

updateBalance = () => {
    const transactionAmounts = transactions.map( transaction => transaction.amount );
    const totalBalance = transactionAmounts.reduce( (acc, amount) => (acc += amount),0 );
    const creditBalance = transactionAmounts
                              .filter(amount => amount > 0)
                              .reduce( (acc, amount) => (acc += amount), 0 )
    console.log(creditBalance);
    const debitBalance = transactionAmounts
                              .filter(amount => amount < 0)
                              .reduce( (acc, amount) => (acc += amount), 0 )
    console.log(debitBalance)
    
    balance.innerText = `${totalBalance}`;
    moneyCredit.innerText = `${creditBalance}`;
    moneyDebit.innerText = `${debitBalance}`;
}

createID = () => {
    return Math.floor(Math.random() * 1000000000)
}

addTransaction = (e) => {
    e.preventDefault();
    if (reason.value.trim() === '' || amount.value.trim() === '') {
        alert('please provide a valid reason for transaction amount')
    } else {
        const transaction = {
            id: createID(),
            reason: reason.value,
            amount: +amount.value
        }
        transactions.push(transaction)
        displayTransaction(transaction)
        updateBalance();
        reason.value = '';
        amount.value = '';
    }
}

deleteTransaction = (id) => {
    transactions = transactions.filter( transaction => transaction.id !== id);
    init();
}

init = () => { 
    list.innerHTML = '';
    Transactions.forEach(displayTransaction);
    updateBalance();
}

form.addEventListener('submit', addTransaction)

init();