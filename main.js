window.activeScreen = null;
window.activeQuestion = null;
window.Teams = {};
window.questionTimer = null;
window.questionTimerTick = 0;

$(document).ready(function() {

    $("#fileInput").change(function(e) {
        var reader = new FileReader();
        var input = e.target;
        var file = input.files[0];

        reader.onload = function(){
            initGame(reader.result);
        };
        reader.readAsText(file);
    });

    $(window).on("mousemove", function(ev) {
        $("#cursor").css({
            left: ev.pageX - 12,
            top: ev.pageY - 12
        });
    });
    // Ctrl + K to toggle the score
    $("body").on("keyup", function(ev) {
        if (ev.ctrlKey && ev.which === 75) {
            toggleScore();
        }
    });
    $("#home > .teams-container").on("click", "> .team-name-input-group > .add-team-btn", function() {
        var $input = $(this).closest(".teams-container").find("> .team-name-input-group > input.team-name-value");
        var teamName = $.trim($input.val());

        if (teamName !== "") {
            addTeam(teamName);
        }
    });
    $("#home > .teams-container").on("keyup", "> .team-name-input-group > input.team-name-value", function(ev) {
        var $input = $(this);
        var teamName = $.trim($input.val());

        if (ev.keyCode === 13 && teamName !== "") {
            addTeam(teamName);
        }
    });
    $("#home > .teams-container").on("click", "> .teams-list > .team > .remove-btn", function(ev) {
        var $team = $(this).closest(".team");
        var teamName = $team.attr("value");

        removeTeam(teamName);
    });
    $("#home > .wrapper").on("click", "> .start-game-btn", function(ev) {
        if (_.isEmpty(window.questions) || _.isEmpty(window.bonusQuestions)) {
            $("#fileInput").click();
        } else {
            showScreen("board");
        }
    });
    $("#board > .scores").on("click", "> .back-btn", function(ev) {
        showScreen("home");
    });
    $("#board > .scores").on("click", "> .finish-btn", function(ev) {
        showScreen("bonus");
    });
    $("#bonus").on("click", "> .back-btn", function(ev) {
        var $board = $("#board");
        var $bonus = $("#bonus");
        var $audio = $bonus.find("audio");

        $audio.each(function() {
            $(this).get(0).pause();
            $(this).get(0).currentTime = 0;
        });

        $board.addClass("active");
        $bonus.removeClass("active");
    });
    $("#bonus").on("click", "> .finish-btn", function(ev) {
        var $bonus = $("#bonus");
        var $audio = $bonus.find("audio");

        $audio.each(function() {
            $(this).get(0).pause();
            $(this).get(0).currentTime = 0;
        });
        // calculate bonus scores
        $("#bonus > .scores > .team").each(function() {
            var $team = $(this);
            var name = $team.attr("value");
            var value = parseInt($team.find("> input.value").val(), 10);

            if (isNaN(value)) {
                value = 0;
            }
            Teams[name].questions.push("bonus_" + value);
        });
        updateScores();

        showScreen("scores");
    });
    $("#bonus").on("click", ".show-answer-btn", function() {
        $("#bonus .show-answer-btn").css({ opacity: 1.0 }).animate({ opacity: 0 }, 500);
        $("#bonus .answers").css({ opacity: 0 }).animate({ opacity: 1.0 }, 500);

        // add the score board
        var $scores = $("#bonus > .scores").css({ display: "block" }).empty();
        for (var teamName in Teams) {
            var $score = $("<div class='team' value='" + teamName+ "' />").appendTo($scores);
            var $value = $("<input class='value' type='text' />").appendTo($score);
            var $name = $("<span class='name'>" + teamName + "</span>").appendTo($score);
        }
    });

    $("html").on("click", "#board > .questions > .category > .question > .wrapper", function() {
        var $category = $(this).closest(".category");
        var $question = $(this).closest(".question");
        var categoryId = $category.attr("value");
        var questionId = $question.attr("value");

        activeQuestion = {
            categoryId: categoryId,
            questionId: questionId,
            question: questions[categoryId][questionId]
        };
        showQuestion(categoryId, questionId);
    });
    $("#question").on("click", "> .back-btn", function() {
        backToBoard();
    });
    $("#question").on("click", "> .scores > button.team", function() {
        $(this).toggleClass("active");
    });
    $("#question").on("click", "> .scores > span.team.half-allowed > button.half", function() {
        var $half = $(this);
        var $full = $(this).siblings(".full");

        if ($half.hasClass("active")) {
            $half.removeClass("active");
            $full.removeClass("active");
        } else {
            $half.addClass("active");
            $full.removeClass("active");
        }
    });
    $("#question").on("click", "> .scores > span.team.half-allowed > button.full", function() {
        var $half = $(this).siblings(".half");
        var $full = $(this);

        if ($full.hasClass("active")) {
            $half.removeClass("active");
            $full.removeClass("active");
        } else {
            $half.addClass("active");
            $full.addClass("active");
        }
    });
    $("#question").on("click", ".show-answer-btn", function() {
        showAnswer();
    });
    $("#question").on("click", ".close-btn", function() {
        backToBoard();
    });
    $("#question > .timer").on("click", ".start-btn", function() {
        startTimer();
    });
    $("#question > .timer").on("click", ".stop-btn", function() {
        stopTimer();
    });
    $("#scores").on("click", "> .back-btn", function() {
        showScreen("bonus");
    });

    showScreen("home");
    hideScore();

    function Category(category, color, questions) {
        var self = this;

        self.category = category;
        self.color = color;

        _.each(questions, function(question, score) {
            self[score] = question;
        });
    };
    function initGame(rawData) {
        var tsvData = [];
        var rows = rawData.split("\n");

        // turn this raw text data into a two dimensional array
        _.each(rows, function(rowData) {
            var cols = rowData.split("\t");
            var tsvRow = [];

            _.each(cols, function(colData) {
                tsvRow.push(colData);
            });
            tsvData.push(tsvRow);
        });
        // parse the data and use landmarks to determine how to allocate data accordingly
        console.log("Raw Data:", tsvData);

        // initialize contributors
        initTSVContributors(tsvData);

        // initialize questions
        initTSVQuestions(tsvData);

        // initialize bonus questions
        initTSVBonusQuestion(tsvData);

        // at this point, we should be done
        $(".start-game-btn").text("Start Game");
    }
    function cleanTSVRows(tsvData, rowIndexStart, rowIndexEnd) {
        var result = [];
        for (var rowIndex = rowIndexStart; rowIndex <= rowIndexEnd; rowIndex++) {
            var currRowData = tsvData[rowIndex];
            var isEmptyRow = true;

            _.each(currRowData, function(colData, colIndex) {
                if (!_.isEqual($.trim(colData), "")) {
                    isEmptyRow = false;
                }
            });
            if (!isEmptyRow) {
                result.push(_.map(currRowData, function(colData, colIndex) {
                    return $.trim(colData);
                }))
            }
        }
        return result;
    }
    function initTSVContributors(tsvData) {
        var rowIndexStart = -1;
        var rowIndexEnd = -1;

        // we will identify the contributors based on whether or not the first cell of the
        // row contains the "Contributors" keyword
        for (var rowIndex = 0; rowIndex < tsvData.length; rowIndex++) {
            var rowData = tsvData[rowIndex] || [];
            var firstColCell = rowData[0];

            if (_.isEqual(firstColCell, "CONTRIBUTORS")) {
                rowIndexStart = rowIndex;
                rowIndexEnd = rowIndex;
                break;
            }
        }
        // determine if we found the correct row range
        if (_.isEqual(rowIndexStart, -1) || _.isEqual(rowIndexEnd)) {
            console.error("Malformed VTF file, missing Contributors!");
            return;
        }
        var tsvRows = cleanTSVRows(tsvData, rowIndexStart, rowIndexEnd);
        var contributors = tsvRows[0][1];
        contributors = contributors.split(";");
        contributors = contributors.join(", ");

        console.log("Contributors:", contributors);

        $("#contributorNames").html(contributors);
    }
    function initTSVQuestions(tsvData) {
        var rowIndexStart = -1;
        var rowIndexEnd = -1;

        // we will identify the contributors based on whether or not the first cell of the
        // row contains the "Gauntlet" keyword
        for (var rowIndex = 0; rowIndex < tsvData.length; rowIndex++) {
            var rowData = tsvData[rowIndex] || [];
            var firstColCell = rowData[0];

            if (_.isEqual(firstColCell, "QUESTIONS")) {
                rowIndexStart = rowIndex;
            }
            if (_.isEqual(firstColCell, "GAUNTLET")) {
                rowIndexEnd = rowIndex - 1;
                break;
            }
        }
        // determine if we found the correct row range
        if (_.isEqual(rowIndexStart, -1) || _.isEqual(rowIndexEnd)) {
            console.error("Malformed VTF file, missing questions!");
            return;
        }
        var tsvRows = cleanTSVRows(tsvData, rowIndexStart, rowIndexEnd);
        var categoryColors = [
            "#329aea",
            "#f89728",
            "#6eba83",
            "#b95cf7",
            "#ef8166"
        ];
        var colIndexMapping = {
            "CATEGORY": 0,
            "SCORE VALUE": 1,
            "QUESTION TYPE": 2,
            "QUESTION TEXT": 3,
            "ANSWER": 4,
            "MULTIPLE CHOICES": 5,
            "MEDIA FILE": 6,
            "HALF ALLOWED": 7,
            "TIME LIMIT": 8
        };
        var result = {};
        var finalResult = {};

        // go through each row and insert the data that is expected
        _.each(tsvRows, function(rowData, rowIndex) {
            var firstColCell = rowData[0];

            if (_.contains(["QUESTIONS"].concat(_.keys(colIndexMapping)), firstColCell)) return;

            var category = rowData[colIndexMapping["CATEGORY"]];
            var scoreValue = rowData[colIndexMapping["SCORE VALUE"]];
            var questionType = rowData[colIndexMapping["QUESTION TYPE"]];
            var questionText = rowData[colIndexMapping["QUESTION TEXT"]];
            var answer = rowData[colIndexMapping["ANSWER"]];
            var multipleChoices = rowData[colIndexMapping["MULTIPLE CHOICES"]];
            var mediaFile = rowData[colIndexMapping["MEDIA FILE"]];
            var halfAllowed = rowData[colIndexMapping["HALF ALLOWED"]];
            var timeLimit = rowData[colIndexMapping["TIME LIMIT"]];

            if (!result[category]) {
                result[category] = {};
            }
            if (!result[category][scoreValue]) {
                result[category][scoreValue] = {};
            }
            if (!result[category][scoreValue].q) {
                result[category][scoreValue].q = {};
            }
            result[category][scoreValue].timer = parseInt(timeLimit, 10);
            if (_.isNaN(result[category][scoreValue].timer)) {
                result[category][scoreValue].timer = 60;
            }
            if (_.isEqual(halfAllowed, "Yes")) {
                result[category][scoreValue].halfAllowed = true;
            }
            result[category][scoreValue].a = answer;

            if (!_.isEmpty(mediaFile)) {
                if (mediaFile.indexOf(".m4a") >= 0) {
                    result[category][scoreValue].q.audioFile = "media/" + mediaFile;
                } else if (mediaFile.indexOf(".png") >= 0 || mediaFile.indexOf(".jpg") >= 0 || mediaFile.indexOf(".gif") >= 0) {
                    result[category][scoreValue].q.imageFile = "media/" + mediaFile;
                } else if (mediaFile.indexOf(".webm") >= 0 || mediaFile.indexOf(".mp4") >= 0) {
                    result[category][scoreValue].q.videoFile = "media/" + mediaFile;
                }
            }
            result[category][scoreValue].q.type = questionType;
            result[category][scoreValue].q.text = questionText;

            if (_.isEqual(questionType, "choice")) {
                var choices = multipleChoices.split(";");
                result[category][scoreValue].q.choices = choices;

                // see if we can catch the cases where a multiple choice doesn't contain an answer
                if (!_.contains(choices, answer)) {
                    console.error("Missing multiple choice answer at " + category + "@" + scoreValue + ",");
                }
            }
        });
        // map this to our expected format
        var categoryIndex = 1;
        _.each(result, function(categoryQuestions, category) {
            finalResult[categoryIndex] = new Category(
                category,
                categoryColors[categoryIndex - 1],
                categoryQuestions
            );
            categoryIndex++;
        });
        console.log("Questions:", finalResult);

        window.questions = finalResult;
    }
    function initTSVBonusQuestion(tsvData) {
        var rowIndexStart = -1;
        var rowIndexEnd = -1;

        // we will identify the contributors based on whether or not the first cell of the
        // row contains the "Gauntlet" keyword
        for (var rowIndex = 0; rowIndex < tsvData.length; rowIndex++) {
            var rowData = tsvData[rowIndex] || [];
            var firstColCell = rowData[0];

            if (_.isEqual(firstColCell, "GAUNTLET")) {
                rowIndexStart = rowIndex;
            }
            if (_.isEqual(firstColCell, "AUDIO FILE")) {
                rowIndexEnd = rowIndex;
                break;
            }
        }
        // determine if we found the correct row range
        if (_.isEqual(rowIndexStart, -1) || _.isEqual(rowIndexEnd)) {
            console.error("Malformed VTF file, missing bonus question!");
            return;
        }
        var tsvRows = cleanTSVRows(tsvData, rowIndexStart, rowIndexEnd);
        var bonusQuestion = {
            audioFile: null,
            tracks: []
        };
        _.each(tsvRows, function(rowData, rowIndex) {
            var firstColCell = rowData[0];

            if (_.isEqual(firstColCell, "AUDIO FILE")) {
                bonusQuestion.audioFile = "media/" + rowData[1];
            }
            if (!_.contains(["GAUNTLET", "TRACK TITLE", "AUDIO FILE"], firstColCell)) {
                bonusQuestion.tracks.push({
                    title: rowData[0],
                    artist: rowData[1]
                });
            }
        });
        console.log("Bonus Question:", bonusQuestion);

        window.bonusQuestions = bonusQuestion;

        createBonus();
    }
    function showScreen(screen) {
        if (screen === "board") {
            createScoreBoard();
            createBoard();
        }
        if (screen === "scores") {
            updateScores();
        }
        if (screen === "bonus") {
            $("#bonus > .scores").css({ display: "none" }).empty();
            $("#bonus .show-answer-btn").css({ opacity: 1.0 });
            $("#bonus .answers").css({ opacity: 0 });
        }
        $(".screen").removeClass("active");
        $("#" + screen).addClass("active");
    }
    function addTeam(teamName) {
        var $teams = $("#home > .teams-container");
        var $list = $teams.find("> .teams-list");
        var $input = $teams.find("> .team-name-input-group > input.team-name-value");
        var $team = $("<div class='team' value='" + teamName + "' />");

        $team.append("<a class='remove-btn'>x</a><span class='index'></span>: <span class='label'>" + teamName + "</span>");

        // clear the team name input
        $input.val("");

        // add the team item to the list of teams
        $list.append($team);

        // create the team
        Teams[teamName] = {
            name: teamName,
            score: 0,
            // this will be stored as keys such as "1_200", where the first number
            // is the category and the second number is the score value
            questions: []
        };
        // update the indices as appropriate
        updateTeamIndices();
    }
    function removeTeam(teamName) {
        var $teams = $("#home > .teams-container");
        var $team = $teams.find("> .teams-list > .team[value='" + teamName + "']");

        // remove the team
        $team.remove();

        if (Teams[teamName] !== undefined) {
            delete Teams[teamName];
        }
        // update the indices as appropriate
        updateTeamIndices();
    }
    function updateTeamIndices() {
        var $teams = $("#home > .teams-container");
        var $list = $teams.find("> .teams-list");

        // go through each team in order and set the team index
        $list.find("> .team").each(function(index) {
            var teamName = $(this).attr("value");
            var teamIndex = index + 1;

            $(this).find("> .index").text("Team " + teamIndex);

            Teams[teamName].index = teamIndex;
        });
    }
    function toggleScore() {
        if ($("#board > .scores").hasClass("active")) {
            hideScore();
        } else {
            showScore();
        }
    }
    function showScore() {
        $(".back-btn, .finish-btn").show();
        $("#board > .scores").addClass("active").animate({ height: 160 }, 200);
        $("#board > .questions").animate({ height: "calc(100% - 160px)" }, 200);
    }
    function hideScore() {
        $(".back-btn, .finish-btn").hide();
        $("#board > .scores").removeClass("active").animate({ height: 0 }, 200);
        $("#board > .questions").animate({ height: "100%" }, 200);
    }
    function createScoreBoard() {
        var $board = $("#board");
        var $scores = $board.find("> .scores");
        var $list = $scores.find("> .score-list");
        var numCols = Object.keys(Teams).length;

        var $question = $("#question");
        var $questionScores = $question.find("> .scores");

        var $leaderboard = $("#scores");
        var $leaderboardScores = $leaderboard.find("> .wrapper > .scores");

        $list.empty();
        $questionScores.empty();
        $leaderboardScores.empty();

        for (var teamName in Teams) {
            var Team = Teams[teamName];
            var $score = $("<div class='score' value='" + teamName + "' />");
            // $score.css({ width: "calc(100% / " + numCols + ")" });

            $score.append("<div class='wrapper'><div class='name'>" + teamName +  "</div><div class='value'>0</div></div>");
            $questionScores.append("<button class='team' value='" + teamName + "'>" + teamName + "</button>");
            $questionScores.append("<span class='team half-allowed' value='" + teamName + "'><span class='label'>" + teamName + "</span><button class='half'>Half</button><button class='full'>Full</button></span>");

            $leaderboardScores.append("<div class='team' value='" + teamName + "'><div class='name'>" + teamName + "</div><div class='score'>0</div></div>");

            // append this score block to the list of scores
            $score.appendTo($list);
        }
        updateScores();
    }
    function updateScores() {
        var $board = $("#board");
        var $scores = $board.find("> .scores");
        var $list = $scores.find("> .score-list");

        var $leaderboard = $("#scores");
        var $leaderboardScores = $leaderboard.find("> .wrapper > .scores");

        // the idea is to go through each of the teams and update the score
        // based on the questions that have been answered correctly
        for (var teamName in Teams) {
            var $score = $list.find("> .score[value='" + teamName + "']");
            var $value = $score.find("> .wrapper > .value");

            // calculate the score
            var score = 0;
            for (var i=0; i<Teams[teamName].questions.length; i++) {
                var question = Teams[teamName].questions[i];
                var parts = question.split("_");
                var categoryId = parts[0];
                var questionId = parts[1];
                var splits = parts[2];

                if (splits === "half") {
                    score += (parseInt(questionId, 10) / 2);
                } else {
                    score += parseInt(questionId, 10);
                }
            }
            Teams[teamName].score = score;
            $leaderboardScores.find("> .team[value='" + teamName + "'] > .score").text(score);
            $value.text(score);
        }
        var orderedTeams = _.sortBy(_.toArray(Teams), _.property("score")).reverse();
        _.each(orderedTeams, function(team, index) {
            var $team = $leaderboardScores.find("> .team[value='" + team.name + "']").detach();
            $leaderboardScores.append($team);
        });
    }
    function createBoard() {
        var $board = $("#board");
        var $questions = $board.find("> .questions");
        var numCols = Object.keys(questions).length;
        var numRows;

        $questions.empty();

        for (var index in questions) {
            var category = questions[index];
            var $category = $("<div class='category' value='" + index + "' />").appendTo($questions);
            var $title = $("<div class='title'><div class='wrapper'>" + category.category + "</div></div>").appendTo($category);
            numRows = 0;

            for (var value in questions[index]) {
                if (isNaN(parseInt(value))) continue;
                var $question = $("<div class='question' value='" + value + "'><div class='wrapper'>" + value + "</div></div>").appendTo($category);
                numRows++;
            }
        }
        $(".category").css({ width: "calc(100% / " + numCols + ")" });
        $(".category > .title, .category > .question").css({ height: "calc(100% / " + (numRows + 1) + ")" })

        $(".category").each(function(index) {
            $(this).find("> .title > .wrapper, > .question > .wrapper").css({
                background: questions[index + 1].color,
                borderColor: "rgba(255,255,255,0.5)"
            });
        });
    };
    function createBonus() {
        var $bonus = $("#bonus");
        var $audio = $bonus.find("> .wrapper > div > audio.bonus-audio");
        var $answers = $bonus.find("> .wrapper > div.answers");

        $audio.append('<source src="' + bonusQuestions.audioFile + '" type="audio/mp4" />');

        _.each(bonusQuestions.tracks, function(track, index) {
            var $track = $("<div class='answer-line' />").appendTo($answers);
            var $index = $("<span class='track' />").append((index + 1) + ". ").appendTo($track);
            var $title = $("<span class='title' />").append(track.title + " - ").appendTo($track);
            var $artist = $("<span class='artist' />").append(track.artist).appendTo($track);
        });
    }
    function showQuestion(categoryId, questionId) {
        var $question = $("#question");

        var $title = $question.find("> .title");
        var $timer = $question.find("> .timer");
        var $scores = $question.find("> .scores");

        var $subtitleQ = $question.find("> .wrapper > .subtitle-q");
        var $text = $question.find("> .wrapper > .text-container > .text");
        var $choices = $question.find("> .wrapper > .text-container > .choices");
        var $showAnswerBtn = $question.find("> .wrapper > .show-answer-btn");

        var $subtitleA = $question.find("> .wrapper > .subtitle-a");
        var $answer = $question.find("> .wrapper > .answer");
        var $subtitleF = $question.find("> .wrapper > .subtitle-f");
        var $fact = $question.find("> .wrapper > .fact");
        var $closeBtn = $question.find("> .wrapper > .close-btn");

        var category = questions[categoryId];
        var question = category[questionId];

        if (_.isEqual(category.category, "Popculture")) {
            $title.html("<b>Pop</b>" + "<em>" + questionId + "</em>");
        } else if (_.isEqual(category.category, "Geography")) {
            $title.html("<b>Geo</b>" + "<em>" + questionId + "</em>");
        } else {
            $title.html("<b>" + category.category + "</b>" + "<em>" + questionId + "</em>");
        }
        $scores.css({ display: "none" });

        $timer.css({ display: "block" });
        $timer.find("> .time").text(question.timer + " seconds");
        $timer.find("> .start-btn").css({ display: "block" });
        $timer.find("> .stop-btn").css({ display: "none" });

        $question.css({ background: category.color });

        $text.html(question.q.text);

        $choices.removeClass("answer").empty();
        if (question.q.type === "choice") {
            for (var i=0; i<question.q.choices.length; i++) {
                var choice = question.q.choices[i];
                var prefix;
                switch (i) {
                case 0: prefix = "A) "; break;
                case 1: prefix = "B) "; break;
                case 2: prefix = "C) "; break;
                case 3: prefix = "D) "; break;
                case 4: prefix = "E) "; break;
                case 5: prefix = "F) "; break;
                case 6: prefix = "G) "; break;
                case 9: prefix = "H) "; break;
                case 10: prefix = "I) "; break;
                case 11: prefix = "K) "; break;
                default: break;
                }
                var $choice = $("<div class='choice' data-value='" + choice + "'><em>" + prefix + "</em>" + choice + "</div>");
                if (choice === question.a) {
                    $choice.addClass("answer");
                }
                $choices.append($choice);
            }
        }

        $question.find("audio").remove();
        $question.find(".video-container").remove();
        $question.find(".image-container").remove();

        if (question.q.audioFile) {
            $text.after("<audio controls preload='none'><source src='" + question.q.audioFile + "' type='audio/mp4' height='32' /></audio>");
        } else if (question.q.videoFile) {
            $text.after("<div class='video-container' style='text-align: center;'><video controls preload='none' style='height: 320px; margin-top: 12px;'><source src='" + question.q.videoFile + "' type='video/mp4' /></video></div>");
        } else if (question.q.imageFile) {
            $text.after("<div class='image-container' style='text-align: center;'><img src='" + question.q.imageFile + "' style='height: 320px; margin-top: 12px;' /></div>");
        }
        $answer.html(question.a);

        if (question.f) {
            $fact.html(question.f);
            $subtitleF.css({ display: "block" });
            $fact.css({ display: "block" });
        } else {
            $subtitleF.css({ display: "none" });
            $fact.css({ display: "none" });
        }
        $question.css({ display: "table", left: "-100%" }).stop().animate({ left: 0 }, 500);

        $subtitleQ.animate({ opacity: 0.7 }, 500);
        $text.animate({ opacity: 1.0 }, 500);
        $choices.animate({ opacity: 1.0 }, 500);
        $showAnswerBtn.animate({ opacity: 1.0 }, 500);

        if (question.q.type === "choice") {
            $choices.css({ display: "block" });
            $subtitleA.css({ display: "none" });
            $answer.css({ display: "none" });
        } else {
            $choices.css({ display: "none" });
            $subtitleA.css({ display: "block", opacity: 0 });
            $answer.css({ display: "block", opacity: 0 });
        }
        $subtitleF.css({ opacity: 0 });
        $fact.css({ opacity: 0 });
        $closeBtn.css({ opacity: 0 });
    }
    function showAnswer() {
        var $question = $("#question");

        var $scores = $question.find("> .scores");
        var $timer = $question.find("> .timer");

        var $subtitleQ = $question.find("> .wrapper > .subtitle-a");
        var $text = $question.find("> .wrapper > .text-container > .text");
        var $choices = $question.find("> .wrapper > .text-container > .choices");
        var $showAnswerBtn = $question.find("> .wrapper > .show-answer-btn");

        var $subtitleA = $question.find("> .wrapper > .subtitle-a");
        var $answer = $question.find("> .wrapper > .answer");
        var $subtitleF = $question.find("> .wrapper > .subtitle-f");
        var $fact = $question.find("> .wrapper > .fact");
        var $closeBtn = $question.find("> .wrapper > .close-btn");

        stopTimer();

        if (activeQuestion.question.halfAllowed) {
            $scores.find("> button.team").hide();
            $scores.find("> span.team.half-allowed").show();
        } else {
            $scores.find("> button.team").show();
            $scores.find("> span.team.half-allowed").hide();
        }
        $scores.css({ display: "block" });
        $timer.css({ display: "none" });

        $choices.addClass("answer");
        $showAnswerBtn.animate({opacity: 0}, 500);
        $subtitleA.animate({opacity: 0.7}, 500);
        $answer.animate({opacity: 1.0}, 500);
        $subtitleF.animate({opacity: 0.7}, 500);
        $fact.animate({opacity: 1.0}, 500);
        $closeBtn.animate({opacity: 1.0}, 500);
    }
    function backToBoard() {
        var $question = $("#question");

        // update the score
        $("#question > .scores > button.team").each(function() {
            var $button = $(this);
            var teamName = $button.attr("value");
            var isAwarded = $button.hasClass("active");

            if (isAwarded) {
                Teams[teamName].questions.push([activeQuestion.categoryId, activeQuestion.questionId].join("_"));
            }
        });
        $("#question > .scores > span.team.half-allowed").each(function() {
            var $span = $(this);
            var teamName = $span.attr("value");

            if ($span.find("> button.full").hasClass("active")) {
                Teams[teamName].questions.push([activeQuestion.categoryId, activeQuestion.questionId].join("_"));
            } else if ($span.find("> button.half").hasClass("active")) {
                Teams[teamName].questions.push([activeQuestion.categoryId, activeQuestion.questionId, "half"].join("_"));
            }
        });
        updateScores();

        // reset the question score board
        $("#question > .scores > button.team").removeClass("active");
        $("#question > .scores > span.team > button").removeClass("active");

        // mark this question as masked
        $(".category[value='" + activeQuestion.categoryId + "'] > .question[value='" + activeQuestion.questionId + "'] > .wrapper").addClass("masked");

        $question.css({ left: 0 }).animate({ left: "100%" }, 500, function() {
            $(this).css({ display: "none" });

            // remove any lingering audio/video
            $question.find("audio").remove();
            $question.find("video").remove();

            activeQuestion = null;
        });
    }
    function showTimeUp() {
        var $timer = $("#question > .timer");
        var $time = $timer.find("> .time");
        var $startBtn = $timer.find("> button.start-btn");
        var $stopBtn = $timer.find("> button.stop-btn");

        $time.text("Time Up!");

        $startBtn.css({ display: "none" });
        $stopBtn.css({ display: "none" });
    }
    function startTimer() {
        var $timer = $("#question > .timer");
        var $time = $timer.find("> .time");
        var $startBtn = $timer.find("> button.start-btn");
        var $stopBtn = $timer.find("> button.stop-btn");

        $startBtn.css({ display: "none" });
        $stopBtn.css({ display: "block" });

        function handleTimerTick() {
            if (questionTimerTick >= activeQuestion.question.timer) {
                stopTimer();
                showTimeUp();
            } else {
                var secondsRemaining = activeQuestion.question.timer - questionTimerTick;
                var timeText;
                if (secondsRemaining === 1) {
                    timeText = secondsRemaining + " second";
                } else {
                    timeText = secondsRemaining + " seconds";
                }
                $time.text(timeText);
                questionTimerTick++;
            }
        }
        // perform an initial tick
        handleTimerTick();

        // set up a 1 second interval
        questionTimer = setInterval(function() {
            handleTimerTick();
        }, 1000);
    }
    function stopTimer() {
        var $timer = $("#question > .timer");
        var $time = $timer.find("> .time");
        var $startBtn = $timer.find("> button.start-btn");
        var $stopBtn = $timer.find("> button.stop-btn");

        $startBtn.css({ display: "block" });
        $stopBtn.css({ display: "none" });

        clearInterval(questionTimer);
        questionTimerTick = 0;
    }
});
