const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const filterBtn = document.getElementById('filter');
const sortBtn = document.getElementById('sort');
const sumBtn = document.getElementById('sum');

let data = [];

 getRamdomUser  = async () =>  {
    const res = await axios.get('https://randomuser.me/api/')
    const data = await res.data;
    //console.log(data);
    const user = data.results[0];
    //console.log(user);

    const newUser = {
        name: `${user.name.title} ${user.name.first} ${user.name.last}`,
        balance: Math.floor(Math.random()*1000000)
    }
    //console.log(newUser)

    addData(newUser);
};

 addData = (newUser) => {
    
    data.push(newUser);
    console.log('data array',data);
    updateDOM();

 }

 doubleMoney = () => {
    data = data.map(user => {
        return { ...user, balance:user.balance * 2 }
    });

    updateDOM();
 }

 filterUsers = () => {
    data = data.filter(user => user.balance >= 1000000);
    updateDOM();
 }

 sortByBalance = () => {
    data = data.sort((a,b) => b.balance - a.balance);
    updateDOM();
 }

 formatNumberToDollar = (number) => {
     return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
 }

 totalBalance = () => {
    //add value in accumuulator
    const balance = data.reduce((acc, user) => (acc += user.balance), 0);
    const balanceElement  = document.createElement('div');
    balanceElement.innerHTML = `<h3>Total Balance: ${formatNumberToDollar(balance)}</h3>`
    main.appendChild(balanceElement)
    //updateDOM();
 }

 updateDOM = (userData = data) => {
    //clear ui
    main.innerHTML = '<h2><strong>User</strong>Wealth</h2>'
    userData.forEach(user => {
        //new div
        const userDiv = document.createElement('div');
        userDiv.classList.add('user');
        userDiv.innerHTML = `<strong>${user.name}</strong>$
        ${formatNumberToDollar(user.balance)}`
        main.appendChild(userDiv)
        //console.log(user);
    })
}

 addUserBtn.addEventListener('click', getRamdomUser);

 doubleBtn.addEventListener('click', doubleMoney)

 filterBtn.addEventListener('click', filterUsers)

 sortBtn.addEventListener('click', sortByBalance);

 sumBtn.addEventListener('click', totalBalance);



getRamdomUser();
getRamdomUser();
getRamdomUser();
getRamdomUser();
getRamdomUser();
getRamdomUser();
getRamdomUser();