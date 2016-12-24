var numRight = 0 , numWrong = 0, numSkipped = 0, counter = 0, timeLeft =  10, rightAnsr, showQuestion;

var questionArr = [{
  question: "What country borders the south of United States of America?",
  response: ["Puerto Rico", "Peru", "Canada", "Mexico"],
  rightAnsr: 3
}, {
  question: "Which country's name also serves as the name of the continent that it is part of?",
  response: ["America", "Australia", "South Africa", "Antartica"],
  rightAnsr: 1
}, {
  question: "This African country's name was derived from the Portuguese word for 'shrimp'",
  response: ["Cameroon", "Burkina Faso", "Mauritania", "Somalia"],
  rightAnsr: 0
}, {
  question: "Which two contries split from each other in the mid 2000s?",
  response: ["Sudan and South Sudan", "Bosnia and Herzegovina" , "Serbia and Montenegro", "North Korea and South Korea"],
  rightAnsr: 2
}, {
  question: "Which country has the largest land area in the world?",
  response: [ "USA" , "Canada" , "Russia" , "China"],
  rightAnsr: 2
}, {
  question: "This city lies within two different continents",
  response: ["Istanbul", "Jerusalem", "Mexicali", "Sydney"],
  rightAnsr: 0
}, {
  question: "Which of the following is the largest disputed territory by land area?",
  response: ["The West Bank", "Western Sahara" , "Russian Ukrainian Border", "Korean Peninsula"],
  rightAnsr: 1
}, {
  question: "Which country has the second largest population in the world?",
  response: [ "Brasil" , "Nigeria" , "China" , "India"],
  rightAnsr: 3
}];

function questionReset() {
  clearInterval(nextTimer);
  clearTimeout(notOutOfTime);
  setTimeout(nextQuestion,3000);
  timeLeft = 10;
}

function gameReset() {
  counter = 0;
  timeLeft = 10;
  setTimeout(nextQuestion,10000);
}

function hideButton() {
  $('#start-btn-div').empty();
}

function clearDisplay() {
  $('h3').empty();
  $('#question h1').empty();
}

function timer() {
  timeLeft--;
  showTime();
}

function showTime() {
  $('#timer').html("Time Remaining: " + timeLeft);
}

function checkGameOver() {
  if (counter === questionArr.length) {
    clearInterval(notOutOfTime);
    clearInterval(nextTimer);
    setTimeout(displayResults,3000);
  } else {
  questionReset();
  }
}

function outOfTime() {
  // showTime();
  $('#answers').html("<h3>OUT OF TIME!</h3>");
  numSkipped++;
  checkGameOver()
}

function printResults() {
  $('#numCorrect').html("Number of Correct Answers: " + numRight);
  $('#numWrong').html("Number of Incorrect Answers: " + numWrong);
  $('#numSkipped').html("Number Questions Skipped: " + numSkipped);
}

function displayResults() {
  clearDisplay();
  printResults();
  gameReset();
}


function nextQuestion() {
  clearDisplay();

  showTime();
  
  nextTimer = setInterval(timer,1000);
  
  notOutOfTime = setTimeout(outOfTime,10000);

  for(counter;counter<questionArr.length;) {
    var questionDisplay = $('<h1>');
    questionDisplay.html(questionArr[counter].question);
    $('#question').html(questionDisplay)

    for(j=0;j<questionArr[counter].response.length;j++) {
      var responseDisplay = $('<h2>');
      responseDisplay.html(questionArr[counter].response[j]);
      console.log(responseDisplay)
      $('#answers').append(responseDisplay);
    }
    rightAnsr = questionArr[counter].rightAnsr;
    counter++;
    // return i;
    break;
  }
};



function selectResponse() {
  if($(this).html() === questionArr[counter-1].response[rightAnsr]) {
    $('#answers').html("<h3>CORRECT!</h3>")
    numRight++;
    console.log('Correct!');
  } else {
    $('#answers').html("<h3>WRONG!</h3>")
    numWrong++;
  }
  checkGameOver()
}


function startGame() {
  hideButton();
  nextQuestion();
}

$('button').on('click', startGame)
$(document).on("click", "h2", selectResponse);
