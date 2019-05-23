window.Category = function(category, color, questions) {
    var self = this;

    self.category = category;
    self.color = color;

    _.each(questions, function(question, score) {
        self[score] = question;
    });
};
window.questions = {
    "1": new Category("Space", "#329aea", {
        "100": {
            "timer": 60,
            "q": {
                "type": "text",
                "text": "What is the name of the first manned mission to land on the moon?"
            },
            "a": "Apollo 11"
        },
        "200": {
            "timer": 60,
            "halfAllowed": true,
            "q": {
                "type": "text",
                "text": "In our solar system which two planets are known as ice giants?"
            },
            "a": "Uranus and Neptune"
        },
        "300": {
            "timer": 60,
            "q": {
                "type": "text",
                "text": "What is Earth's largest living structure that can be seen from outer space?"
            },
            "a": "Great Barrier Reef"
        },
        "400": {
            "timer": 60,
            "q": {
                "type": "choice",
                "text": "What is the closest star to our sun?",
                "choices": [
                    "Alpha Centauri A",
                    "Alpha Centauri B",
                    "Proxima Centauri"
                ]
            },
            "a": "Proxima Centauri"
        },
        "500": {
            "timer": 60,
            "q": {
                "type": "text",
                "text": "In our solar system, which planet has the shortest day?"
            },
            "a": "Jupiter"
        }
    }),
    "2": new Category("Music", "#f89728", {
        "100": {
            "timer": 60,
            "q": {
                "type": "text",
                "text": "\"If I Had a Million Dollars\" is a song by which Canadian musical group?"
            },
            "a": "Barenaked Ladies"
        },
        "200": {
            "timer": 60,
            "q": {
                "type": "text",
                "text": "What does R&amp;B stand for?"
            },
            "a": "Rhythm and Blues"
        },
        "300": {
            "timer": 60,
            "q": {
                "type": "text",
                "text": "What is the name of Taylor Swift's first album?"
            },
            "a": "Taylor Swift"
        },
        "400": {
            "timer": 60,
            "q": {
                "type": "text",
                "text": "What is the full name of the man who composed 'Moonlight Sonata'?"
            },
            "a": "Ludwig Van Beethoven",
            "f": "Beethoven began losing his hearing in his mid twenties but continued to compose music even after becoming fully deaf."
        },
        "500": {
            "timer": 60,
            "q": {
                "type": "text",
                "text": "Which Spice Girl made her sudden departure from the group in 1998?"
            },
            "a": "Ginger Spice (Geri Halliwell)"
        }
    }),
    "3": new Category("Harry Potter", "#6eba83", {
        "100": {
            "timer": 60,
            "q": {
                "type": "text",
                "text": "How many points is the \"Golden Snitch\" worth?"
            },
            "a": "150 points"
        },
        "200": {
            "timer": 60,
            "q": {
                "type": "text",
                "text": "Who played Headmaster Dumbledore in the first two Harry Potter movies?"
            },
            "a": "Richard Harris"
        },
        "300": {
            "timer": 60,
            "q": {
                "type": "text",
                "text": "In the novels, what colour are Harry Potter's eyes?"
            },
            "a": "Green",
            "f": "Daniel Radcliffe's eyes are blue in the movies"
        },
        "400": {
            "timer": 90,
            "q": {
                "type": "choice",
                "text": "In Harry Potter and the Goblet of Fire, which sweet did Dudley eat when the Weasleys visited Privet Drive?",
                "choices": [
                    "Fainting Fancy",
                    "Nosebleed Nougat",
                    "Ton-Tongue Toffee",
                    "Puking Pastille"
                ]
            },
            "a": "Ton-Tongue Toffee"
        },
        "500": {
            "timer": 60,
            "q": {
                "type": "text",
                "text": "What is the name of the spell used to get rid of a Boggart?"
            },
            "a": "Riddikulus"
        }
    }),
    "4": new Category("Games", "#b95cf7", {
        "100": {
            "timer": 60,
            "q": {
                "type": "choice",
                "text": "Which of these is not a legitimate \"Call of Duty\" title?",
                "choices": [
                    "Call of Duty: Modern Warfare",
                    "Call of Duty: Advanced Warfare",
                    "Call of Duty: Ultimate Warfare",
                    "Call of Duty: Infinite Warfare",
                ]
            },
            "a": "Call of Duty: Ultimate Warfare"
        },
        "200": {
            "timer": 60,
            "q": {
                "type": "choice",
                "text": "What is the hand-size limit in the popular collectible card game \"Hearthstone\"?",
                "choices": [
                    "5",
                    "7",
                    "10"
                ]
            },
            "a": "10"
        },
        "300": {
            "timer": 60,
            "q": {
                "type": "choice",
                "text": "What is the woodcutting level required to cut \"Yew Trees\" in \"Runescape\"?",
                "choices": [
                    "45 Woodcutting",
                    "60 Woodcutting",
                    "61 Woodcutting",
                    "75 Woodcutting"
                ]
            },
            "a": "60 Woodcutting"
        },
        "400": {
            "timer": 60,
            "q": {
                "type": "choice",
                "text": "In \"League of Legends\", who created \"Blitzcrank\"?",
                "choices": [
                    "Jayce",
                    "Heimerdinger,",
                    "Ezreal's Uncle, Lyte",
                    "Viktor"
                ]
            },
            "a": "Viktor"
        },
        "500": {
            "timer": 60,
            "q": {
                "type": "text",
                "text": "What was the first video game to feature an Easter Egg?"
            },
            "a": "Adventure (Atari 2600)",
            "f": "This was recently featured in \"Ready Player One\""
        }
    }),
    "5": new Category("Canada", "#ef8166", {
        "100": {
            "timer": 60,
            "q": {
                "type": "text",
                "text": "What is the capital city of the Yukon Territories?"
            },
            "a": "Yellowknife"
        },
        "200": {
            "timer": 60,
            "q": {
                "type": "text",
                "text": "In what year did Canada become a country?"
            },
            "a": "1867"
        },
        "300": {
            "timer": 60,
            "q": {
                "type": "text",
                "text": "Which street in Toronto is also the longest street in the world?"
            },
            "a": "Yonge Street",
            "f": "1,896 km (1,178 mi) km long"
        },
        "400": {
            "timer": 60,
            "q": {
                "type": "text",
                "text": "What shape are license plates in the Northwest territories?"
            },
            "a": "Polar Bears"
        },
        "500": {
            "timer": 60,
            "q": {
                "type": "choice",
                "text": "What was Canada's lowest recorded temperature?",
                "choices": [
                    "-42 C",
                    "-48 C",
                    "-55 C",
                    "-63 C",
                    "-73 C"
                ]
            },
            "a": "-63 C",
            "f": "Canada's lowest recorded temperature was -81.4 F (-63 C) in 1947."
        }
    })
};
window.bonusQuestions = {
    "audioFile": "media/Gauntlet.m4a",
    "tracks": [
        { "title": "Girls Like You",   "artist": "Maroon 5 ft. Cardi B" },
        { "title": "‘Till I Collapse", "artist": "Eminem" },
        { "title": "In The End",       "artist": "Linkin Park" },
        { "title": "Sorry Not Sorry",  "artist": "Demi Lovato" },
        { "title": "Piano Man",        "artist": "Billy Joel" }
    ]
};
