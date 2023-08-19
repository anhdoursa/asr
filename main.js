const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeechGrammarList =
    window.SpeechGrammarList || window.webkitSpeechGrammarList;
const SpeechRecognitionEvent =
    window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;


const turns = [
    "trái",
    "phải",
    "lên",
    "xuống",
];
const grammar = `#JSGF V1.0; grammar turns; public <turn> = ${turns.join(
    " | ",
)};`;


const recognition = new SpeechRecognition();
const speechRecognitionList = new SpeechGrammarList();

speechRecognitionList.addFromString(grammar, 1);

recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = "vi-VN";
recognition.interimResults = false;
recognition.maxAlternatives = 1;

const diagnostic = document.querySelector(".output");
const bg = document.querySelector("html");



const button = document.querySelector("#button");
button.onclick = () => {
    recognition.start();
    console.log("Ready to receive a turn command.");
};


recognition.onresult = (event) => {
    const turn = event.results[0][0].transcript;
    diagnostic.textContent = `Result received: ${turn}.`;
    // bg.style.backgroundColor = turn;
    // console.log(`Confidence: ${event.results[0][0].confidence}`);
};


recognition.onspeechend = () => {
    recognition.stop();
};


recognition.onerror = (event) => {
    diagnostic.textContent = `Error occurred in recognition: ${event.error}`;
};


