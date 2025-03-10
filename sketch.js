let question;
let radio;
let submitButton;
let resultText;
let scoreText;
let questions;
let currentQuestionIndex = 0;
let correctCount = 0;
let incorrectCount = 0;

function preload() {
  // 假設 CSV 檔案名為 'questions.csv'
  questions = loadTable('questions.csv', 'csv', 'header');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background("#a5a58d");

  question = createP('請問1+1等於多少?');
  question.style('font-size', '30px');
  question.position(windowWidth / 2 - 150, windowHeight / 2 - 150);
  
  radio = createRadio();
  radio.style('font-size', '30px');
  radio.position(windowWidth / 2 - 50, windowHeight / 2  -50  );
  
  submitButton = createButton('送出');
  submitButton.style('font-size', '30px');
  submitButton.position(windowWidth / 2 - 50, windowHeight / 2 +50 );
  submitButton.mousePressed(handleSubmit);
  
  resultText = createP('');
  resultText.style('font-size', '30px');
  resultText.position(windowWidth / 2 - 50, windowHeight / 2 + 100);
  
  scoreText = createP('');
  scoreText.style('font-size', '30px');
  scoreText.position(windowWidth / 2 - 50, windowHeight / 2 + 150);
  
  loadQuestion();
}

function draw() {
  // 不再需要在 draw 中設置背景顏色
}

function loadQuestion() {
  if (currentQuestionIndex < questions.getRowCount()) {
    let currentQuestion = questions.getRow(currentQuestionIndex);
    question.html(currentQuestion.get('question'));
    radio.option(currentQuestion.get('option1'));
    radio.option(currentQuestion.get('option2'));
    radio.option(currentQuestion.get('option3'));
    radio.option(currentQuestion.get('option4'));
    radio.selected(null); // 清除之前的選擇
  } else {
    question.html('測驗結束！');
    radio.hide();
    submitButton.hide();
    resultText.html(`答對題數: ${correctCount}, 答錯題數: ${incorrectCount}`);
  }
}

function handleSubmit() {
  let selectedOption = radio.value();
  let currentQuestion = questions.getRow(currentQuestionIndex);
  if (selectedOption === currentQuestion.get('answer')) {
    resultText.html("答對了！");
    background("#00ff00"); // 綠色
    correctCount++;
  } else {
    resultText.html("答錯了，再試一次！");
    background("#ff0000"); // 紅色
    incorrectCount++;
  }
  scoreText.html(`答對題數: ${correctCount}, 答錯題數: ${incorrectCount}`);
  currentQuestionIndex++;
  loadQuestion();
}
