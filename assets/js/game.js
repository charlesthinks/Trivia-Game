$(document).ready(function(){

    let correct = $(".correct");
    let wrong = $(".wrong");

    let correctAnswers = ["Malcolm X", "CORE-Congress of Racial Equality","Department store seamstress","A black panther","Maya Angelou","Cassius Clay","Woolworth's","Ernie Banks","Brotherhood of Sleeping Car Porters","Stokely Carmichael"]

    let startButton = $("#start-button");
    let timeRemainingDiv = "";
    startButton.on("click", startGame);
    let questionArray = [
        "Who said 'Education is the passport to the future, for tomorrow belongs to those who prepare for it today'?",
        "What group launched the Freedom Rides in 1961?",
        "At the time of her historic bus incident, what was Rosa Parks' occupation?",
        "SNCC member Stokely Carmichael was instrumental in forming the Lowndes County Freedom Organization in Alabama. What was its symbol?",
        "Who wrote the bestselling memoir 'I Know Why the Caged Bird Sings'?",
        "What was Muhammad Ali's original name?",
        "In 1960, four African American college students staged a sit-in that helped integrate this store's lunch counter.",
        "What famous baseball player said, 'Today's black athletes have no idea what we had to endure.'",
        "Members of what labor union helped to build the nation’s black middle class and civil rights movement?",
        "Who was elected chairman of the Student Nonviolent Coordinating Committee (SNCC) in 1966?",
        ];
    let answerArray = [ 
        ["Malcolm X", "George Jefferson", "Martin Luther King Jr.", "Keith Cozart"],
        ["CORE-Congress of Racial Equality","SCLC-Southern Christian Leadership Conference","ACLU-American Civil Liberties Union","SNCC-Student Nonviolent Coordinating Committee"],
        ["Department store seamstress", "Hospital orderly","Drugstore clerk","High school cafeteria worker"],
        ["A black panther", "The letters MLK","A balance scale","A raised fist"],
        ["Maya Angelou", "Rosa Parks","Fannie Lou Hamer","Coretta Scott King"],
        ["Cassius Clay", "Leviticus Lewis","Marcellus Moore","Aaron Brown"],
        ["Woolworth's","W.T. Grant","G.C. Murphy","S.S. Kresge"],
        ["Ernie Banks", "Bob Gibson","Hank Aaron","Willie Mays"],
        ["Brotherhood of Sleeping Car Porters", "International Ladies’ Garment Workers’ Union","Communications Workers of America","American Federal of Teachers"],
        ["Stokely Carmichael", "Charles E. Cobb Jr.","Bobby Seale","John Lewis"]
        ];

    let numCorrectAnswers = 0;
    let numIncorrectAnswers = 0;
    let numUnansweredAnswers = 0;
    let buttonClicked = false;
    
    function startGame() {
        startButton.remove();
        timeRemainingDiv = $("<h3>");
        timeRemainingDiv.appendTo("body");
        timeRemainingDiv.text("Time Remaining: 45 Seconds");
        startTimer(45);
        for (i = 0; i < questionArray.length; i++) {
            createQuestion(questionArray[i], answerArray, correctAnswers);
        }
        doneButtonDiv = $("<div>").appendTo("body");
        doneButtonDiv.attr("class", "button-div");
        doneButton = $("<button>");
        doneButton.text("Done");
        doneButton.attr("class", "btn");
        doneButton.appendTo(doneButtonDiv);
        doneButton.on("click", doneButtonClick);
    }
    
    function checkAnswers() {
        for(let i = 0; i < questionArray.length; i++) {
            if (!($("#choice" + i).is(':checked'))) {
                console.log("None have been checked")
                numUnansweredAnswers++;
            }
            else if ($("#answer" + i).is(':checked')) {
                console.log("correct answer");
                numCorrectAnswers++;
            }
            else {
                console.log("incorrect answer");
                numIncorrectAnswers++;
            }
        }
    }
    
    function doneButtonClick() {
        buttonClicked = true;
        endGame();
    }
    
    function endGame() {
        checkAnswers();
        $("body").empty();
        headerDiv = $("<h1>").appendTo("body");
        headerDiv.text("Trivia Game");
        allDoneDiv = $("<h3>").appendTo("body");
        if (buttonClicked) {
            allDoneDiv.text("All Done!");
        }
        else {
            allDoneDiv.text("Times Up!");
        }
    
        correctAnswers = $("<p>").appendTo("body");
        correctAnswers.text("Correct Answers: " + numCorrectAnswers);
        IncorrectAnswers = $("<p>").appendTo("body");
        IncorrectAnswers.text("Incorrect Answers: " + numIncorrectAnswers);
        unansweredAnswers = $("<p>").appendTo("body");
        unansweredAnswers.text("Unanswered Answers: " + numUnansweredAnswers);
    }
    
    function startTimer(seconds) {
        let timer = setInterval(function() {
            seconds--;
            timeRemainingDiv.text("Time Remaining: " + seconds + " Seconds");
            if (seconds < 0 && !buttonClicked) {
                endGame();
                clearInterval(timer);
            }
        }, 1000);
    }
    
    function createQuestion(question, answers) {
        questionDiv = $("<div>").appendTo("body");
        questionDiv.text(question);
        answerDiv = $("<span>").appendTo("body");
        for (let j = 0; j < answers[i].length; j++) {
            let answerElement = ""
            if (j === 0) {
                answerElement = "id=answer" + i;
            }
            inputDiv = "<input type=radio name=answers" + i + " id=choice" + i + " " + answerElement + " class=choices" + ">" + " " + answers[i][j] + " " + " ";
            answerDiv.append(inputDiv);
        }
    }
                
});