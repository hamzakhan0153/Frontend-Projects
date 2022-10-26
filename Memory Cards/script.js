const addCardBtn = document.getElementById('add-card');
const clearCartBtn = document.getElementById('clear-card');
const cardContainer = document.getElementById('cards-container');
const prevBtn = document.getElementById('prev-btn');
const currentCardNav = document.getElementById('current-card');
const nextBtn = document.getElementById('next-btn');
const cancelBtn = document.getElementById('cancel-btn');
const questionInput = document.getElementById('question');
const answerInput = document.getElementById('answer'); 
const addCartSubmitBtn = document.getElementById('add-card-btn');
const addCardContainer = document.getElementById('add-card-container');

let currentCardID = 0;

const cards = [];

// const cardData = [
//     // {
//     //     question: 'What is React?',
//     //     answer: 'React is a free and open-source front-end JavaScript library for building user interfaces based on UI components. It is maintained by Meta and a community of individual developers and companies. '
//     // },
//     // {
//     //     question: 'What is NodeJs?',
//     //     answer: 'Node.js is an open-source, cross-platform, back-end JavaScript runtime environment that runs on a JavaScript Engine and executes JavaScript code outside a web browser, which was designed to build scalable network applications.'
//     // },
//     // {
//     //     question: 'What is MongoDB?',
//     //     answer: 'MongoDB is a source-available cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with optional schemas. MongoDB is developed by MongoDB Inc. and licensed under the Server Side Public License which is deemed non-free by several distributions.'
//     // }
// ]
saveData = () => {
    localStorage.setItem('cards', JSON.stringify(cardData));
    window.localStorage.reload();
}

getData = () => {
    const cards = JSON.parse(localStorage.getItem('card'));
    return cards === null ? [] : cards;
};

const cardData = getData();

updatecardNav = () => {
    currentCardNav.innerText = `${currentCardID + 1 } / ${cards.length}`;
};

// updatecard = () => {
//     currentCardNav.innerText = `${currentCardID + 1 } / ${cards.length}`;
// }

generateCards = () => {
    cardData.forEach( ( data, index ) => generateCard(data, index) );
};

generateCard = ( data, index) => {
    const card = document.createElement('div')
    card.classList.add('card');
    if ( index === 0) {
        card.classList.add('active')
    }
    card.innerHTML = `
       <div class="inside-card">
            <div class="card-front">
            <p>
                 ${data.question}
            </p>
            </div>
            <div class="card-back">
            <p>
                ${data.answer}
            </p>
            </div>    
       </div>
    `;
    card.addEventListener('click', () => card.classList.toggle('show-answer'))
    cards.push(card);
    cardContainer.appendChild(card);
    updatecardNav();
}

nextBtn.addEventListener('click', () => {
    cards[currentCardID].className = 'card left'
    currentCardID++;
    if ( currentCardID > cards.length - 1 ) {
        currentCardID = 0
    }
    cards[currentCardID].className = 'card active';
    updatecardNav();
});

prevBtn.addEventListener('click', () => {
    cards[currentCardID].className = 'card right'
    currentCardID--;
    if ( currentCardID < 0 ) {
        currentCardID = cards.length -1
    }
    cards[currentCardID].className = 'card active';
    updatecardNav();
})

addCardBtn.addEventListener('click', () => addCardContainer.classList.add('active'))

cancelBtn.addEventListener('click', () => addCardContainer.classList.remove('active'))

addCartSubmitBtn.addEventListener('click', () => {
    const question = questionInput.value; 
    const answer = answerInput.value;
    if ( question.trim() && answer.trim() ) {
        const nextCard = { question, answer};
        generateCard(nextCard);
        questionInput.value = '';
        answerInput.value = '';
        addCardContainer.classList.remove('active')
        cardData.push(nextCard);
        saveData(cardData)
    }
});

clearCartBtn.addEventListener('click', () => {
    //remove card from local storage
    localStorage.clear();
    cardContainer.innerHTML = '';
    window.location.reload();
})

generateCards();