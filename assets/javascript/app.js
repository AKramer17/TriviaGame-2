$(document).ready(function() {
    var theQuestions = [
        {
            question: "What kind of pizza did Sethical try to order?",
            choices: ["Hawaiian Pizza", "Boneless Pizza", "White Pizza", "No Dough Pizza"],
            answer: 1
        },
        {
            question: "Who didn't let the gorilla into the ballet?",
            choices: ["The Gorilla's Keeper", "The Lions", "That One Guy From Allstate",
         "Just The People Who Are In Charge Of That Decision"],
         answer: 3
        },
        {
            question: "Finish this ________",
            choices: ["Sentence", "Dinner", "Book", "Please"],
            answer: 1
        },
        {
            question: "Which of the following life forms contain an immortal species?",
            choices: ["Jellyfish", "Sheep", "Dragonflies", "Shrimp"],
            answer: 0
        }
    ];

    var gifs = ["Q1", "Q2", "Q3", "Q4"];
    var numRight;
    var numWrong;
    var numUnanswered;
    var seconds;
    var time;
    var isAnswered;
    var playerChoice;
    var currentQuestion;
    var gifCorrect = $("#gifCorrect");
    var gifWrong = $("#gifWrong");
    gifCorrect.hide();
    gifWrong.hide();

    var messages = {
        playerCorrect: "Well done. That is correct.",
        playerIncorrect: "That is incorrect.",
        playerOutOfTime: "Out of time. Be faster. And better. And taller.",
        finalResults: "Here's how you did..."
    };

    $("#btnStart").on("click", function() {
        $(this).hide();
        startGame();
    });

    $("#btnReset").on("click", function() {
        $(this).hide();
        startGame();
    });

    function startGame() {
        $("#finalMessage").empty();
        $("#correct").empty();
        $("#incorrect").empty();
        $("#unanswered").empty();
        currentQuestion = 0;
        numRight = 0;
        numWrong = 0;
        numUnanswered = 0;
        newQuestion();
    }

    function countdown() {
        seconds = 10;
        $("#timer").html("<h3>Time remaining: " + seconds + "</h3>");
        isAnswered = true;
        time = setInterval(timerDisplay, 1000);
    }

    function timerDisplay() {
        seconds--;
        $("#timer").html("<h3>Time remaining: " + seconds + "</h3>");
        if(seconds < 1) {
            clearInterval(time);
            isAnswered = false;
            answerScreen();
        }
    }

    function newQuestion() {
        $("#message").empty();
        $("#correctedAnswer").empty();
        $("#gif").empty();
        isAnswered = true;

        $("#currentQuestion").html("Question #" + (currentQuestion + 1) + 
        "/" + theQuestions.length);
        $(".question").html("<h2>" + theQuestions[currentQuestion].question + "</h2>");
        for(var i=0; i<4; i++) {
            var options = $("<div>");
            options.text(theQuestions[currentQuestion].choices[i]);
            options.attr({"data-index": i});
            options.addClass("thisOption");
            $(".optionList").append(options);
        }
        countdown();

        $(".thisOption").on("click", function() {
            playerChoice = $(this).data("index");
            clearInterval(time);
            answerScreen();
        });
    }

    function answerScreen() {
        $("#currentQuestion").empty();
        $(".thisOption").empty();
        $(".question").empty();

        var textAnswerCorrect = theQuestions[currentQuestion].choices[theQuestions[currentQuestion].answer];
        var indexAnswerCorrect = theQuestions[currentQuestion].answer;
        // $("#gif").html("<img src='assets/images" + gifs[currentQuestion] + ".gif' width='400px'>");
        if((playerChoice == indexAnswerCorrect) && (isAnswered == true)) {
            numRight++;
            $("#message").html(messages.playerCorrect);
            $("#gif").html("<img src='assets/images/correct.png'>");
        } else if((playerChoice != indexAnswerCorrect) && (isAnswered == true)) {
            numWrong++;
            $("#message").html(messages.playerIncorrect);
            $("#correctedAnswer").html("The correct answer was: " + textAnswerCorrect);
            $("#gif").html("<img src='assets/images/wrong.gif'>");
        } else {
            numUnanswered++
            $("#message").html(messages.playerOutOfTime);
            $("#correctedAnswer").html("The correct answer was: " + textAnswerCorrect);
            $("#gif").html("<img src='assets/images/wrong.gif'>");
            isAnswered = true;
        }

        if(currentQuestion == (theQuestions.length - 1)) {
            setTimeout(scoreboard, 5000);
        } else {
            currentQuestion++;
            setTimeout(newQuestion, 5000);
        }
    }

    function scoreboard() {
        $("#timer").empty();
        $("#message").empty();
        $("#correctedAnswer").empty();
        $("#gif").empty();
    
        $("#finalMessage").html(messages.finalResults);
        $("#correct").html("Correct Answers: " + numRight);
        $("#incorrect").html("Incorrect Answers: " + numWrong);
        $("#unanswered").html("Unanswered: " + numUnanswered);
        $("#btnReset").addClass('reset');
        $("#btnReset").show();
        $("#btnReset").html("Play Again!!");
    }

});