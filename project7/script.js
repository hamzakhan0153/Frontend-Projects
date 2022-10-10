const word = document.getElementById('word');
const incorrectLetters = document.getElementById('incorrect-letters');
const popup = document.getElementById('popup');
const playBtn = document.getElementById('play-btn');
const notification = document.getElementById('notification');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-parts');

const words = ["ask","teacher","color","dirt","gone","able",
"column","say","lower","country","control","pretty",
"does","dozen","act","vowel","half","fallen",
"couple","low","mirror","folks","thin","aid",
"making","here","avoid","breath","available","plural",
"pay","gather","health","led","easier","calm",
"material","characteristic","careful","behind","edge","glass"]

let selectedWord = words[Math.floor(Math.random() * words.length)]

const correctLettersArray = ['a','b'];
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

window.addEventListener('keydown', e => {
    
})

displayWord();