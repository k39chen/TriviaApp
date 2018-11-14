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
                "text": "Which of these sports has the fewest number of players on the field at one time?",
                "choices": [
                    "Baseball",
                    "American football",
                    "Soccer"
                ]
            },
            "a": "Baseball",
            "f": "9 people on the field"
        },
        "200": {
            "timer": 60,
            "q": {
                "type": "text",
                "text": "Who set the NHL record for goals by a rookie born in the United States?"
            },
            "a": "Auston Matthews"
        },
        "300": {
            "timer": 60,
            "q": {
                "type": "text",
                "text": "In what sport does a jammer score a point for each opponent they skate past?"
            },
            "a": "Roller derby"
        },
        "400": {
            "timer": 60,
            "q": {
                "type": "choice",
                "text": "Who was the first golfer to win the Masters Tournament two years in a row?",
                "choices": [
                    "Tiger Woods",
                    "Arnold Palmer",
                    "Jack Nicklaus",
                    "Phil Mickelson",
                    "Ben Hogan",
                    "Jimmy Demaret"
                ]
            },
            "a": "Jack Nicklaus",
            "f": "1965 and 1966 for his 2nd and 3rd times out of a total of 6"
        },
        "500": {
            "timer": 60,
            "q": {
                "type": "text",
                "text": "What is it called when a player scores 2 goals in a game of soccer?"
            },
            "a": "A brace"
        }
    }),
    "2": new Category("Science", "#329aea", {
        "100": {
            "timer": 60,
            "q": {
                "type": "choice",
                "text": "Which of these is NOT considered a noble gas?",
                "choices": [
                    "Boron",
                    "Helium",
                    "Neon",
                    "Argon",
                    "Krypton",
                    "Xenon",
                    "Radon"
                ]
            },
            "a": "Boron",
            "f": "Radon is the only radioactive noble gas."
        },
        "200": {
            "timer": 60,
            "q": {
                "type": "text",
                "text": "What is the oldest iPhone model still in production today?"
            },
            "a": "iPhone 7 / iPhone 7 Plus"
        },
        "300": {
            "timer": 60,
            "q": {
                "type": "text",
                "text": "What planet in our solar system has the longest day?"
            },
            "a": "Venus",
            "f": "243 Earth days"
        },
        "400": {
            "timer": 90,
            "q": {
                "type": "choice",
                "text": "Which three-letter abbreviation for a trigonometric ratio is a common English word?",
                "choices": [
                    "Hypotenuse / opposite",
                    "Adjacent / hypotenuse",
                    "Opposite / adjacent"
                ]
            },
            "a": "Opposite / adjacent",
            "f": "Tan"
        },
        "500": {
            "timer": 60,
            "q": {
                "type": "choice",
                "text": "The top-level domain .tv originates from a nation located where?",
                "choices": [
                    "Africa",
                    "Europe",
                    "North America",
                    "Asia",
                    "Oceania"
                ]
            },
            "a": "Oceania",
            "f": "It comes from the country of Tuvalu in the Polynesian islands."
        }
    }),
    "3": new Category("Popculture", "#ef8166", {
        "100": {
            "timer": 60,
            "q": {
                "type": "choice",
                "text": "The exchange from center to quarterback is called the what?",
                "choices": [
                    "Snap",
                    "Crackle",
                    "Pop"
                ]
            },
            "a": "Snap",
            "f": "Snap Crackle Pop were also the mascots for Rice Krispies"
        },
        "200": {
            "timer": 60,
            "q": {
                "type": "choice",
                "text": "Which of these villains sings her own musical number in her original Disney film?",
                "choices": [
                    "Maleficent",
                    "Ursula",
                    "Cruella de Vil"
                ]
            },
            "a": "Ursula"
        },
        "300": {
            "timer": 60,
            "q": {
                "type": "choice",
                "text": "Which of these sports figures has NOT hosted \"Saturday Night Live\"?",
                "choices": [
                    "John Madden",
                    "Deion Sanders",
                    "Serena Williams"
                ]
            },
            "a": "Serena Williams"
        },
        "400": {
            "timer": 60,
            "q": {
                "type": "choice",
                "text": "Which show's pilot episode cost so much that a network executive was fired over it?",
                "choices": [
                    "Lost",
                    "Boardwalk Empire",
                    "The Walking Dead",
                    "House",
                    "Game of Thrones"
                ]
            },
            "a": "Lost",
            "f": "The first episode cost 7 million dollars to produce, the highest of any pilot episode."
        },
        "500": {
            "timer": 60,
            "halfAllowed": true,
            "q": {
                "type": "text",
                "text": "Identify the song title and artist.",
                "audioFile": "media/FlightOfTheBumblebee.m4a"
            },
            "a": "Flight of the Bumblebee - Rimsky Korsakov"
        }
    }),
    "4": new Category("Geography", "#6eba83", {
        "100": {
            "timer": 60,
            "q": {
                "type": "text",
                "text": "Which continent has the highest human population density?"
            },
            "a": "Asia"
        },
        "200": {
            "timer": 60,
            "q": {
                "type": "text",
                "text": "What country is named for its location on the equator?"
            },
            "a": "Ecuador"
        },
        "300": {
            "timer": 60,
            "q": {
                "type": "text",
                "text": "Which country has the longest land border?"
            },
            "a": "China",
            "f": "22,147 km, 40 km longer than Russia"
        },
        "400": {
            "timer": 60,
            "q": {
                "type": "text",
                "text": "Which country has the world's largest active volcano?"
            },
            "a": "United States of America",
            "f": "Mauna Loa (Hawai'i)"
        },
        "500": {
            "timer": 60,
            "q": {
                "type": "choice",
                "text": "The biggest flower in the world is native to which country?",
                "choices": [
                    "England",
                    "India",
                    "Australia",
                    "Argentina",
                    "Indonesia"
                ]
            },
            "a": "Indonesia",
            "f": "The flower is called \"meat flower/stinking corpse lily\". It can weigh up to 15 pounds"
        }
    }),
    "5": new Category("General", "#b95cf7", {
        "100": {
            "timer": 60,
            "q": {
                "type": "choice",
                "text": "A full English breakfast traditionally includes which of these foods?",
                "choices": [
                    "Yogurt parfait",
                    "Baked beans",
                    "Acai bowl"
                ]
            },
            "a": "Baked beans"
        },
        "200": {
            "timer": 60,
            "q": {
                "type": "choice",
                "text": "By definition, a person with \"tall poppy syndrome\" dislikes what?",
                "choices": [
                    "Heights",
                    "Poppies",
                    "Successful people",
                    "Remembrance Day",
                    "Tall people"
                ]
            },
            "a": "Successful people"
        },
        "300": {
            "timer": 60,
            "q": {
                "type": "text",
                "text": "What does HALO in HALO jump stand for?"
            },
            "a": "High Altitude - Low Opening"
        },
        "400": {
            "timer": 60,
            "q": {
                "type": "choice",
                "text": "Which of these companies changed its original name because of its morbid connotation?",
                "choices": [
                    "Amazon",
                    "Google",
                    "Facebook",
                    "Veeva",
                    "Shopify"
                ]
            },
            "a": "Amazon",
            "f": "Amazon used to be called \"Cadabra\". This was changed after a lawyer misheard it as \"Cadaver\""
        },
        "500": {
            "timer": 60,
            "q": {
                "type": "choice",
                "text": "Which of these beers is made by a fully US-owned company?",
                "choices": [
                    "Budweiser",
                    "Yuengling",
                    "Coors",
                    "Molson",
                    "Guinness",
                    "Stella Artois"
                ]
            },
            "a": "Yuengling"
        }
    })
};
window.bonusQuestions = {
    "audioFile": "media/Gauntlet.m4a",
    "tracks": [
        { "title": "This Love",            "artist": "Maroon 5" },
        { "title": "Sweet Home Alabama",   "artist": "Lynyrd Skynyrd" },
        { "title": "Alive",                "artist": "Sia" },
        { "title": "No Tears Left to Cry", "artist": "Arianna Grande" },
        { "title": "Under Pressure",       "artist": "Queen" }
    ]
};
