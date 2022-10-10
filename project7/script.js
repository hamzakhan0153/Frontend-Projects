const word = document.getElementById('word');
const incorrectLetters = document.getElementById('incorrect-letters');
const popup = document.getElementById('popup-container');
const playBtn = document.getElementById('play-btn');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

const words = ["ask","teacher","color","dirt","gone","able",
"column","say","lower","country","control","pretty",
"does","dozen","act","vowel","half","fallen",
"couple","low","mirror","folks","thin","aid",
"making","here","avoid","breath","available","plural",
"pay","gather","health","led","easier","calm",
"material","characteristic","careful","behind","edge","glass"]

let selectedWord = words[Math.floor(Math.random() * words.length)]

const correctLettersArray = [];
const incorrectLettersArray = [];

displayWord = () => {

    word.innerHTML = `
       ${selectedWord
        .split('')
        .map(letter => `
           <span class = "letter">
           ${correctLettersArray.includes(letter) ? letter : ''}
           </span>
        ` 
            )
            .join('')
    }
    `;
    const innerWord = word.innerText.replace(/\n/g, '');
    //console.log(innerWord);

    if(innerWord === selectedWord) {
        finalMessage.innerText = 'Congratulation! You Won! ';
        popup.style.display = 'flex';
    }
      
};

showNotification = () => {
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.add('show');
    },2000)
}

updateIncorrectLetters = () => {
    incorrectLetters.innerHTML = `
    ${incorrectLettersArray.length > 0 ? '<p>Incorrect Letters</p>' : ''}
    ${incorrectLettersArray.map(letter => `<span>${letter}</span>`)}
    `;

    figureParts.forEach((part, index) => {
        const errors = incorrectLettersArray.length;
        if (index < errors) {
            part.style.display = 'block';
        } else {
            part.style.display = 'none';
        }
    });

    if (incorrectLettersArray.length === figureParts.length) {
        finalMessage.innerText = 'You Lost!';
        popup.style.display = 'flex';
    }
}


window.addEventListener('keydown', e => {
    //checking key is pressed is letter
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key;
        if(selectedWord.includes(letter)) {
            if(!correctLettersArray.includes(letter)){
                correctLettersArray.push(letter);
                displayWord();  
            } else {
                showNotification();
            }
        } else { 
            if(!incorrectLettersArray.includes(letter)) {
                incorrectLettersArray.push(letter);
                updateIncorrectLetters();
            } else {
                showNotification();
            }
        }
    }

})

playBtn.addEventListener('click', () => {
    correctLettersArray.splice(0)
    incorrectLettersArray.splice(0)
    selectedWord = words[Math.floor(Math.random() * words.length)]
    updateIncorrectLetters();
    popup.style.display = 'none'
    displayWord();
})

displayWord();