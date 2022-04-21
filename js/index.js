document.addEventListener('DOMContentLoaded', () => {

    // SELECT ELEMENTS
    let forwardBtn = document.querySelector(".forward-btn");
    let backwardBtn = document.querySelector(".backward-btn");
    let first_btn = document.querySelector(".first_btn");
    let second_btn = document.querySelector(".second_btn");
    let third_btn = document.querySelector(".third_btn");
    let songTitle = document.querySelector(".title-wrapper h1");
    let artistTitle = document.querySelector(".title-wrapper h2");
    let play_btn = document.querySelector(".play_btn");
    let bigplayBtn = document.querySelector(".play-btn-wrapper");

    // CREATE ARRAY FOR CONTROLS
    let controlArray = [forwardBtn, backwardBtn, first_btn, second_btn, third_btn, bigplayBtn];


    // my functions to
    function AudioPLayingNow() {
        var isnowplayingaudio;
        if (songNumber == 0 && audioCounter == 1) {
            isnowplayingaudio = document.getElementById('audio1')
        } else if (songNumber == 1 && audioCounter == 1) {
            isnowplayingaudio = document.getElementById('audio2')
        } else if (songNumber == 2 && audioCounter == 1) {
            isnowplayingaudio = document.getElementById('audio3')
        }
        return isnowplayingaudio;
    }

    audioCounter = 0;

    function playSong() {
        if (songNumber == 0) {
            var istoplayAudio = document.getElementById("audio1");
            istoplayAudio.play();
            audioCounter = 1;
        } else if (songNumber == 1) {
            var istoplayAudio = document.getElementById("audio2");
            istoplayAudio.play();
            audioCounter = 1;
        } else if (songNumber == 2) {
            var istoplayAudio = document.getElementById("audio3");
            istoplayAudio.play();
            audioCounter = 1;
        }
    }

    function pauseSong() {
        if (songNumber == 0) {
            playingAudio = document.getElementById("audio1");
            playingAudio.pause();
            playingAudio.currentTime = 0;
            audioCounter = 0;

        } else if (songNumber == 1) {
            playingAudio = document.getElementById("audio2");
            playingAudio.pause();
            playingAudio.currentTime = 0;
            audioCounter = 0;
        } else if (songNumber == 2) {
            playingAudio = document.getElementById("audio3");
            playingAudio.pause();
            playingAudio.currentTime = 0;
            audioCounter = 0;
        }
    }


    bigplayBtn = document.querySelector(".play-btn-wrapper");
    bigplayBtn.addEventListener("click", () => {
        play_btn.classList.toggle("paused");
    });



    var body = document.getElementsByTagName('body')[0];

    controlArray.forEach((control) => {
        control.addEventListener("click", () => {
            body.style.pointerEvents = "none"
            setTimeout(() => {
                body.style.pointerEvents = 'all'
            }, 100)
            switch (control) {
                case forwardBtn:
                    if (audioCounter == 1) {
                        pauseSong();
                        play_btn.classList.toggle("paused");
                    }
                    nextSong();

                    break;

                case backwardBtn:
                    if (audioCounter == 1) {
                        pauseSong();
                        play_btn.classList.toggle("paused");
                    }
                    prevSong();


                    break;
                case first_btn:
                    if (audioCounter == 1) {
                        pauseSong();
                        play_btn.classList.toggle("paused");
                    }
                    if (songNumber == 1 || songNumber == 2) {
                        prevSong();
                    }

                    break;


                case second_btn:
                    if (audioCounter == 1) {
                        pauseSong();
                        play_btn.classList.toggle("paused");
                    }
                    if (songNumber == 2) {
                        prevSong();


                    } else if (songNumber == 0) {
                        nextSong();

                    }

                    break;



                case third_btn:

                    if (audioCounter == 1) {
                        pauseSong();
                        play_btn.classList.toggle("paused");
                    }

                    if (songNumber == 0 || songNumber == 1) {
                        nextSong();


                    }

                    break;


                case bigplayBtn:
                    if (audioCounter == 0) {
                        playSong();
                        isnowplayingaudio = AudioPLayingNow();
                    } else if (audioCounter == 1) {
                        pauseSong();
                        isnowplayingaudio = AudioPLayingNow();
                        audioCounter = 0;
                    }
                    break;
            }
        });
    });



    // MUSIC INFORMATION
    let songArray = ["Crackle", "Sense", "You"];
    let artistArray = ["sAv", "sAv", "sAv"];

    // SET INTIAL SONG NUMBER + LOAD IN ANIMATION
    let songNumber = 1;
    songTitle.innerHTML = songArray[songNumber];

    anime({
        targets: ".Sense",
        scale: [0.8, 1.25],
        easing: "easeOutExpo",
        duration: 1500,
    });

    function nextSong() {
        pauseSong();
        if (audioCounter == 1) {
            playBtn.classList.toggle("paused");
        }
        if (songNumber == 2) {
            songNumber = 0;
            setSong();
            scaleCoverDown();




            // ANIMATE TO FIRST COVER WHEN END OF songArray REACHED

            anime({
                targets: ".cover-row",
                translateX: "255px",
                easing: "easeOutExpo",
                duration: "600",
            });

        } else {
            songNumber += 1;
            setSong();
            scaleCoverDownNext();

            // ANIMATE TO NEXT COVER

            anime({
                targets: ".cover-row",
                translateX: "-=255px",
                easing: "easeOutExpo",
                duration: "600",
            });
        }

    }

    function prevSong() {
        pauseSong();

        if (audioCounter == 1) {
            playBtn.classList.toggle("paused");
        }
        if (songNumber == 0) {
            songNumber = 2;
            setSong();
            scaleCoverDown2();
            anime({
                targets: ".cover-row",
                translateX: "-=510px",
                easing: "easeOutExpo",
                duration: "600",
            });
        } else {
            songNumber -= 1;
            setSong();
            scaleCoverDownPrev();


            // ANIMATE TO NEXT COVER
            anime({
                targets: ".cover-row",
                translateX: "+=255px",
                easing: "easeOutExpo",
                duration: "600",
            });
        }

    }

    // SET SONG INFORMATION AND COVER
    function setSong() {
        songTitle.innerHTML = songArray[songNumber];
        artistTitle.innerHTML = artistArray[songNumber];

        // SCALE UP CURRENT COVER
        anime({
            targets: `.${songArray[songNumber]}`,
            scale: 1.25,
            easing: "easeOutExpo",
            duration: 1500,
        });
    }

    function scaleCoverDownNext() {
        let prevSongNumber = songNumber - 1;

        anime({
            targets: `.${songArray[prevSongNumber]}`,
            scale: 1,
            easing: "easeOutExpo",
            duration: 1500,
        });
    }

    function scaleCoverDown2() {
        anime({
            targets: `.${songArray[0]}`,
            scale: 1,
            easing: "easeOutExpo",
            duration: 1500,
        });
    }

    function scaleCoverDown() {


        anime({
            targets: `.${songArray[2]}`,
            scale: 1,
            easing: "easeOutExpo",
            duration: 1500,
        });
    }


    function scaleCoverDownPrev() {
        let nextSongNumber = songNumber + 1;

        anime({
            targets: `.${songArray[nextSongNumber]}`,
            scale: 1,
            easing: "easeOutExpo",
            duration: 2000,
        });

    }

    function setSongDefault() {
        setInterval(() => {
            if (activePage != 2 && songNumber == 2) {
                prevSong();


            } else if (activePage != 2 && songNumber == 0) {
                nextSong();
            }
        }, 100);

    }
    setSongDefault();


    setInterval(() => {
        var activePage = fullpage_api.getActiveSection().index;
        if (activePage != 2) {
            pauseSong();
        }
        if ((activePage != 2) && (audioCounter != 1)) {
            play_btn.classList.remove("paused");
            pauseSong();
        }
    }, 1000)


    var intro_hi = document.getElementsByClassName("intro_hi")[0];
    intro_hi.style.opacity = "0";
    var o = 0;
    var si = setInterval(() => {
        if (o > 1) {
            clearInterval(si);
        } else {
            o = o + 0.0098;
            intro_hi.style.opacity = `${o}`;
        }
    }, 10);

    var intro = document.getElementsByClassName("intro")[0];
    intro.style.opacity = "0";
    var x = 0;
    var st2 = setTimeout(() => {
        var si2 = setInterval(() => {
            if (x > 1) {
                clearInterval(si2);
            } else {
                x = x + 0.0098;
                intro.style.opacity = `${x}`;
            }
        }, 10);
    }, 1500);

    var arrow = document.getElementsByClassName("arrow")[0];
    arrow.style.opacity = "0";
    var z = 0;
    var st3 = setTimeout(() => {
        var si3 = setInterval(() => {
            if (z > 2) {
                clearInterval(si3);
            } else {
                z = z + 0.0098;
                arrow.style.opacity = `${z}`;
            }
        }, 10);
    }, 3000);






    new fullpage("#fullpage", {
        scrollingSpeed: 1000,
        verticalCentered: false,
        responsiveWidth: 950,
        responsiveHeight: 500,
        autoScrolling: true,
        scrollbars: true,
        easing: 'easeInOutCubic',
        easingcss3: 'ease',
        anchors: ['section1', 'section2', 'section3', 'section4'],

    });



})

var activePage = 0;
setInterval(() => {
    window.activePage = fullpage_api.getActiveSection().index;
}, 100)
window.activePage;
var page1first = 'true';
var counterpage1 = 0;


window.nav = document.getElementsByTagName("nav")[0];
nav.style.opacity = "0";
window.w = 0;
window.q = 0;
window.siFadeIn;
window.siFadeOut;

function navOpacFadeIn() {
    siFadeIn = setInterval(() => {
        if (w > 1) {
            clearInterval(siFadeIn);
        } else {
            w += 0.001;
            nav.style.opacity = `${w}`;
        }
    }, 1);
}

function navOpacFadeOut() {
    siFadeOut = setInterval(() => {
        if (w < -0.1) {
            clearInterval(siFadeOut);
        } else {
            w -= 0.001
            nav.style.opacity = `${w}`;
        }

    }, 1);
}


// first page load ==> no nav


setInterval(() => {
    if (activePage == 0 && page1first == 'true') {
        nav.style.opacity = "0";

    }
    // first page to second page ==> nav fade in
    else if (activePage == 1 && page1first == "true") {
        navOpacFadeIn();

        page1first = 'false'

    }


    // second page to first page ==> nav fade out
    else if (activePage == 0 && page1first == 'false') {
        navOpacFadeOut();
    }
    // second page to 3rd page ==> nav 1
    else if (activePage != 1 && activePage != 0) {
        nav.style.opacity = '1';
    } else if (page1first == 'false' && activePage == 1) {
        navOpacFadeIn();
    }

}, 100);