window.Category = function(category, color, questions) {
    var self = this;

    self.category = category;
    self.color = color;

    _.each(questions, function(question, score) {
        self[score] = question;
    });
};
window.questions = {
    "1": new Category("Sports", "#f89728", {
        "100": {
            "timer": 60,
            "q": {
                "type": "choice",
                "text": "Which of these measurements from the sports world is the largest?",
                "choices": [
                    "Width of NFL field",
                    "Home plate to first base",
                    "Length of NBA court"
                ]
            },
            "a": "Width of NFL field"
        },
        "200": {
            "timer": 60,
            "q": {
                "type": "choice",
                "text": "In basketball, where would you find the \"top of the key\"?",
                "choices": [
                    "Free throw circle",
                    "Center of the court",
                    "On the backboard"
                ]
            },
            "a": "Free throw circle"
        },
        "300": {
            "timer": 60,
            "q": {
                "type": "choice",
                "text": "According to the official FIFA rulebook, how long can a goalkeeper hold onto the ball for?",
                "choices": [
                    "3 Seconds",
                    "5 Seconds",
                    "10 Seconds"
                ]
            },
            "a": "5 Seconds"
        },
        "400": {
            "timer": 60,
            "q": {
                "type": "choice",
                "text": "Which of these NBA teams was once located in Minnesota?",
                "choices": [
                    "Lakers",
                    "Warriors",
                    "Cavaliers"
                ]
            },
            "a": "Lakers"
        },
        "500": {
            "timer": 60,
            "q": {
                "type": "choice",
                "text": "Which of the following cities is NOT home to an inaugural NHL team?",
                "choices": [
                    "Pittsburgh",
                    "Chicago",
                    "Detroit"
                ]
            },
            "a": "Pittsburgh"
        }
    }),
    "2": new Category("Science", "#329aea", {
        "100": {
            "timer": 60,
            "q": {
                "type": "choice",
                "text": "If a swimmer is caught in an ocean rip tide, which is the safest direction to swim first?",
                "choices": [
                    "Against the current",
                    "Toward the shore",
                    "Parallel to the shore"
                ]
            },
            "a": "Parallel to the shore"
        },
        "200": {
            "timer": 60,
            "q": {
                "type": "choice",
                "text": "Which cooking term describes cutting food into matchstick-like strips?",
                "choices": [
                    "Mince",
                    "Dice",
                    "Julienne"
                ]
            },
            "a": "Julienne"
        },
        "300": {
            "timer": 60,
            "q": {
                "type": "choice",
                "text": "As viewed from Earth, what is the second-brightest naturally occurring object in the night sky?",
                "choices": [
                    "Venus",
                    "Polaris",
                    "The Moon"
                ]
            },
            "a": "Venus"
        },
        "400": {
            "timer": 60,
            "q": {
                "type": "choice",
                "text": "Who is IBM's game-show-winning computer named after?",
                "choices": [
                    "IBM's first CEO",
                    "Sherlock Holmes sidekick",
                    "Genetic researcher"
                ]
            },
            "a": "IBM's first CEO"
        },
        "500": {
            "timer": 60,
            "q": {
                "type": "choice",
                "text": "Which of these phrases refers to debugging software?",
                "choices": [
                    "Rubber ducking",
                    "Nest clearing",
                    "Egg rolling"
                ]
            },
            "a": "Rubber ducking"
        }
    }),
    "3": new Category("Pop Culture", "#ef8166", {
        "100": {
            "timer": 60,
            "q": {
                "type": "choice",
                "text": "Michael Jackson was known as the King of what?",
                "choices": [
                    "Rock",
                    "Pop",
                    "Dance"
                ]
            },
            "a": "Pop"
        },
        "200": {
            "timer": 60,
            "q": {
                "type": "text",
                "text": "According to an old saying, you should \"let sleeping dogs\" do what?",
            },
            "a": "Lie"
        },
        "300": {
            "timer": 60,
            "q": {
                "type": "choice",
                "text": "The first film to defeat a \"Star Wars\" movie for the visual effects Oscar was from what series?",
                "choices": [
                    "The Matrix",
                    "Lord of the Rings",
                    "Jurassic Park"
                ]
            },
            "a": "The Matrix"
        },
        "400": {
            "timer": 60,
            "halfAllowed": true,
            "q": {
                "type": "text",
                "text": "Identify the song title and artist.",
                "audioFile": "media/E-T.m4a"
            },
            "a": "Thinking Out Loud - Ed Sheeran"
        },
        "500": {
            "timer": 60,
            "q": {
                "type": "choice",
                "text": "What classic cartoon character's catchphrase refers to a dish of corn and lima beans?",
                "choices": [
                    "Sylvester the Cat",
                    "Popeye",
                    "Mighty Mouse"
                ]
            },
            "a": "Sylvester the Cat"
        }
    }),
    "4": new Category("Geography", "#6eba83", {
        "100": {
            "timer": 60,
            "q": {
                "type": "choice",
                "text": "Which of these countries' capital cities is farthest east?",
                "choices": [
                    "Cambodia",
                    "Laos",
                    "Thailand"
                ]
            },
            "a": "Cambodia"
        },
        "200": {
            "timer": 60,
            "q": {
                "type": "choice",
                "text": "A popular type of massage gets its name from which of these countries?",
                "choices": [
                    "Sweden",
                    "Switzerland",
                    "Suriname"
                ]
            },
            "a": "Sweden"
        },
        "300": {
            "timer": 60,
            "q": {
                "type": "choice",
                "text": "What country's longest mountain range is named for a color?",
                "choices": [
                    "Cuba",
                    "Dominican Republic",
                    "Jamaica"
                ]
            },
            "a": "Jamaica"
        },
        "400": {
            "timer": 60,
            "q": {
                "type": "choice",
                "text": "Which country has hosted an Olympics but NOT a FIFA World Cup?",
                "choices": [
                    "Sweden",
                    "South Korea",
                    "Greece"
                ]
            },
            "a": "Greece"
        },
        "500": {
            "timer": 60,
            "q": {
                "type": "choice",
                "text": "According to World Atlas, the capital city with the lowest average temperature is located in which country?",
                "choices": [
                    "Mongolia",
                    "Greenland",
                    "Russia"
                ]
            },
            "a": "Mongolia"
        }
    }),
    "5": new Category("General", "#b95cf7", {
        "100": {
            "timer": 60,
            "q": {
                "type": "text",
                "text": "What does the French word \"bibliotheque\" mean in English?"
            },
            "a": "Library"
        },
        "200": {
            "timer": 60,
            "q": {
                "type": "text",
                "text": "What is often added to chocolate to make it softer and milder-tasting?"
            },
            "a": "Milk"
        },
        "300": {
            "timer": 60,
            "q": {
                "type": "choice",
                "text": "Which of these plurals is NOT correct?",
                "choices": [
                    "Notaries public",
                    "Attorneys General",
                    "Mother-in-laws"
                ]
            },
            "a": "Mother-in-laws"
        },
        "400": {
            "timer": 60,
            "q": {
                "type": "choice",
                "text": "In the game of Scrabble, which of these words would result in the highest score?",
                "choices": [
                    "QUIXOTRY",
                    "SYZYGY",
                    "ZANJURO"
                ]
            },
            "a": "QUIXOTRY"
        },
        "500": {
            "timer": 60,
            "q": {
                "type": "choice",
                "text": "Which animal can emit blood from its eyes when threatened?",
                "choices": [
                    "Velvet worm",
                    "Sea cucumber",
                    "Horned lizard"
                ]
            },
            "a": "Horned lizard"
        }
    })
};
window.bonusQuestions = {
    "audioFile": "media/FinalGauntlet.m4a",
    "tracks": [
        { "title": "Mr. Brightside",       "artist": "Killers" },
        { "title": "Always Be My Baby",    "artist": "Mariah Carey" },
        { "title": "Lose Yourself",        "artist": "Eminem" },
        { "title": "Party in the USA",     "artist": "Miley Cyrus" },
        { "title": "It's Gonna Be Me",     "artist": "NSync" },
        { "title": "Bohemian Rhapsody",    "artist": "Queen" },
        { "title": "Just The Way You Are", "artist": "Bruno Mars" },
        { "title": "I Want You Back",      "artist": "Jackson 5" },
        { "title": "Sweet Child O' Mine",  "artist": "Guns N' Roses" }
    ]
};
