
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function() {
  if (!started) {
    document.getElementById("start-button").style.display = "none"
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});
document.getElementById("start-button").addEventListener("click", function() {
  if (!started) {
    document.getElementById("start-button").style.display = "none"
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  //2. Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length-1);
});


//1. Create a new function called checkAnswer(), it should take one input with the name currentLevel
function checkAnswer(currentLevel) {

    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      

      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {

      var gameOver = new Audio("sounds/wrong.mp3")
      gameOver.play(); 
      $("body").addClass("game-over")
      setTimeout(() => {
        $("body").removeClass("game-over")
      },200);
      $("#level-title").text("Game Over, Press Any Key to Restart")
      document.getElementById("start-button").style.display = ""
      startOver()

    }

}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  
  playGamePattern(0);
}
function playGamePattern(index) {
  if (index < gamePattern.length) {
    $("#" + gamePattern[index]).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(gamePattern[index]);

    
    setTimeout(function () {
      playGamePattern(index + 1);
    }, 400); 
  }
} 
  
  


// Start playing the game pattern from the beginning
playGamePattern(0);

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startOver(){
  
started = false
gamePattern = []
level = 0
}


var backAudio = new Audio("sounds/music.mp3")
// background music switch
document.querySelector(".switch").addEventListener("change",function() {
  backAudio.paused ? backAudio.play() : backAudio.pause();
})
