$("document").ready(function () {
    console.log("loaded");
    // score variables
    var userQuestionsRight = 0;
    var userQuestionsWrong = 0;
    var unansweredQuestions = 0;
    // clock variables
    var countdownTimer = 30;
    // var clockIsTicking = false; --> I'd like to prevent the clock from going negative with this var. Future improvement!
    var interval; // declared, but not initialized

    var indexOfCurrentQuestion = 0;
    // square backets or curly brackets?
    var triviaQuestions = [{
            questionText: 'This 1990 movie was directed by Martin Scorsese and starred Robert De Niro, Ray Liotta, and Joe Pesci. It won the BAFTA award for Best Film and Best Director in 1991. Which film was it?',
            answerText: [
                "The Italian Job",
                "Scarface",
                "Goodfellas",
                "Friday Night Lights"
            ],
            correctAnswer: 2
        },
        {
            questionText: 'Rap was just becoming well known in the 90s. Which artist had the first number one rap single?',
            answerText: [
                "Ice T",
                "Vanilla Ice",
                "LL Cool J",
                "Missy Elliot"
            ],
            correctAnswer: 1
        },
        {
            questionText: 'This fad of the 90s was like a purse carried on your waist.',
            answerText: [
                "Fanny Pack",
                "Hand Bag",
                "Beeper",
                "Backpack"
            ],
            correctAnswer: 0
        },
        {
            questionText: 'Which 90s TV show features characters with the name Tommy, Zack, Kimberly, Billy, and Trini?',
            answerText: [
                "Voltron",
                "Salem Moon",
                "Rugrats",
                "Power rangers"
            ],
            correctAnswer: 3
        },
        {
            questionText: 'What team won the 1994 World Series?',
            answerText: [
                "Dodgers",
                "Red Sox",
                "Yankees",
                "Nobody"
            ],
            correctAnswer: 3
        },
        {
            questionText: 'These superheroes had the ability to fight in animal transportation.',
            answerText: [
                "Mighty Morphin Power Rangers",
                "Transformers",
                "Teenage Mutant Ninja Turtles",
                "The Justice League"
            ],
            correctAnswer: 0
        },
        {
            questionText: 'n 1992, the Toronto Blue Jays became the first Canadian professional sports team to win what?',
            answerText: [
                "Olympics",
                "Nba Championship",
                "World Series",
                "Superbowl"
            ],
            correctAnswer: 2
        },
        {
            questionText: 'Which famous girl group of the 90s sung the theme song to the hit sketch comedy TV show "All That"?',
            answerText: [
                "B2k",
                "Xscape",
                "Destinys Child",
                "TLC"
            ],
            correctAnswer: 3
        },
        {
            questionText: 'What film won the Oscar for Best Picture in 1995?',
            answerText: [
                "Forrest Gump",
                "Scarface",
                "Beetlejuice",
                "Goodfellas"
            ],
            correctAnswer: 0
        },
        {
            questionText: 'Which record company had huge success in the 90s with artists such as the Notorious BIG, Mase, and Total?',
            answerText: [
                "Deathrow",
                "Badboy",
                "Rap a-lot",
                "Priority records"
            ],
            correctAnswer: 1
        }
    ];
    // ### LOGIC ###
    $("#answerText").on("click", ".answerChoice", function (event) {
        stop();
        var userGuess = ($(this).attr("choice-value"));
        userGuess = parseInt(userGuess);
        console.log(userGuess);

        if (userGuess === triviaQuestions[indexOfCurrentQuestion - 1].correctAnswer) {
            userQuestionsRight++;
            $("#questionText").text("That's right!");
            $("#answerText").empty();
            if (indexOfCurrentQuestion >= 10) {
                displayResults();
            } else {
                setTimeout(loadNextQuestion, 1000 * 2);
            }
        } else {
            userQuestionsWrong++
            $("#questionText").text("That's incorrect. The correct answer was " + triviaQuestions[indexOfCurrentQuestion - 1].answerText[triviaQuestions[indexOfCurrentQuestion - 1].correctAnswer]);
            $("#answerText").empty();
            if (indexOfCurrentQuestion >= 10) {
                displayResults();
            } else {
                setTimeout(loadNextQuestion, 1000 * 3);
            }
        }
    });

    $("#startQuizBtn").on("click", function () {
        quizStart();

    });

    // ### FUNCTIONS ###
    function quizStart() {
        console.log("counting down");
        indexOfCurrentQuestion = 0;
        loadNextQuestion();
        $("#startQuizBtn").remove();
    }

    function run() {
        clearInterval(interval);
        interval = setInterval(decrement, 1000);
    }

    //  The stop function
    function stop() {
        countdownTimer = 30;
        clearInterval(interval);
    }

    function decrement() {
        countdownTimer--;
        $("#timerDiv").text("Time left: " + countdownTimer);

        if (countdownTimer === 0) {
            if (indexOfCurrentQuestion >= 9) {
                stop();
                displayResults();
            } else {
                stop();
                $("#answerText").empty();
                loadNextQuestion();
            }

        }
    }

    function loadNextQuestion() {
        console.log(indexOfCurrentQuestion);
        $("#questionText").text(triviaQuestions[indexOfCurrentQuestion].questionText)

        for (i = 0; i < 4; i++) {
            var newAnswerChoice = $("<li></li>");
            newAnswerChoice.addClass("answerChoice");
            newAnswerChoice.attr("choice-value", i);
            newAnswerChoice.text(triviaQuestions[indexOfCurrentQuestion].answerText[i]);
            $("#answerText").append(newAnswerChoice);
        }
        indexOfCurrentQuestion++;
        run();
    }

    function displayResults() {
        $("#question").empty();
        $("#answer").empty();
        $("#question").html("<ul><li>Questions answered correctly: " + userQuestionsRight + "</li>" + "<li>Questions answered incorrectly: " + userQuestionsWrong + "</li>" + "<li>Questions skipped: " + unansweredQuestions + "</li></ul>");
    }
});