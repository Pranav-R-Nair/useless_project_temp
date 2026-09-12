"use strict";


/* =========================================
   STATE
========================================= */

let userName = "";
let clickCount = 0;

let startTime = null;
let timerInterval = null;

let elapsedSeconds = 0;

let isRunning = false;
let isStopped = false;

let certificateLoadingInterval = null;


/* =========================================
   ELEMENTS
========================================= */

const nameOverlay =
    document.getElementById("nameOverlay");

const nameInput =
    document.getElementById("nameInput");

const nameError =
    document.getElementById("nameError");

const beginButton =
    document.getElementById("beginButton");

const mainButton =
    document.getElementById("mainButton");

const stopButton =
    document.getElementById("stopButton");

const counter =
    document.getElementById("counter");

const timer =
    document.getElementById("timer");

const status =
    document.getElementById("status");

const loadingOverlay =
    document.getElementById("loadingOverlay");

const loadingText =
    document.getElementById("loadingText");

const loadingProgress =
    document.getElementById("loadingProgress");

const certificateOverlay =
    document.getElementById("certificateOverlay");

const certificateName =
    document.getElementById("certificateName");

const certificateClicks =
    document.getElementById("certificateClicks");

const certificateTime =
    document.getElementById("certificateTime");

const certificateDate =
    document.getElementById("certificateDate");

const certificateId =
    document.getElementById("certificateId");

const printCertificate =
    document.getElementById("printCertificate");

const closeCertificateBottom =
    document.getElementById("closeCertificateBottom");


/* =========================================
   EMOJI COLLECTIONS
========================================= */

/*
   Different emoji themes are used so the
   celebration changes as the user progresses.
*/

const emojiThemes = [

    /* 50 clicks */
    [
        "🎉",
        "🥳",
        "🎊",
        "✨",
        "👏",
        "😎",
        "🔥",
        "🙌"
    ],

    /* 100 clicks */
    [
        "💯",
        "🏆",
        "🎯",
        "🥇",
        "👑",
        "🎉",
        "🔥",
        "👏"
    ],

    /* 150 clicks */
    [
        "🤔",
        "😂",
        "🤣",
        "🙃",
        "🤡",
        "💀",
        "😭",
        "😵"
    ],

    /* 200 clicks */
    [
        "🚀",
        "⚡",
        "🔥",
        "💥",
        "🌟",
        "⭐",
        "✨",
        "🚨"
    ],

    /* 250 clicks */
    [
        "🫡",
        "🧠",
        "📈",
        "📊",
        "🏅",
        "🎖️",
        "🫠",
        "😮‍💨"
    ],

    /* 300 clicks */
    [
        "🍕",
        "🍔",
        "🍩",
        "🍟",
        "🌮",
        "🍿",
        "☕",
        "🥤"
    ],

    /* 350 clicks */
    [
        "😈",
        "👀",
        "🤨",
        "😏",
        "🧐",
        "🙄",
        "🤪",
        "😵‍💫"
    ],

    /* 400 clicks */
    [
        "💸",
        "💰",
        "🤑",
        "📉",
        "💳",
        "🪙",
        "💵",
        "🏦"
    ],

    /* 450 clicks */
    [
        "🧨",
        "💣",
        "🔥",
        "🌋",
        "⚠️",
        "🚨",
        "☠️",
        "💀"
    ],

    /* 500 clicks */
    [
        "🏆",
        "👑",
        "🎉",
        "🥳",
        "💯",
        "🚀",
        "🔥",
        "🫡"
    ]

];


/* =========================================
   RANDOM EMOJI FALLBACK
========================================= */

const endlessEmojis = [

    "😂",
    "🤣",
    "😭",
    "💀",
    "🔥",
    "✨",
    "🎉",
    "🥳",
    "👏",
    "🙌",
    "😎",
    "🤯",
    "😵‍💫",
    "🤡",
    "👀",
    "💯",
    "🚀",
    "⚡",
    "💥",
    "🏆",
    "👑",
    "🎊",
    "⭐",
    "🌟",
    "💸",
    "🫠",
    "🫡",
    "😈",
    "🤨",
    "🍕",
    "🍩",
    "☕"

];


/* =========================================
   INITIALIZE
========================================= */

function initialize() {

    mainButton.disabled = false;
    stopButton.disabled = false;

    timer.textContent = "00:00:00";
    counter.textContent = "0";

    nameOverlay.setAttribute(
        "aria-hidden",
        "false"
    );

    loadingOverlay.setAttribute(
        "aria-hidden",
        "true"
    );

    certificateOverlay.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.style.overflow =
        "hidden";

    nameInput.focus();

}


/* =========================================
   NAME POPUP
========================================= */

beginButton.addEventListener(
    "click",
    startExperience
);


nameInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            startExperience();

        }

    }
);


nameInput.addEventListener(
    "input",
    function () {

        nameError.textContent = "";

        nameInput.classList.remove(
            "input-error"
        );

    }
);


/* =========================================
   START EXPERIENCE
========================================= */

function startExperience() {

    const enteredName =
        nameInput.value.trim();


    if (!enteredName) {

        showNameError(
            "Please enter your name."
        );

        return;

    }


    if (enteredName.length < 2) {

        showNameError(
            "Please enter a valid name."
        );

        return;

    }


    userName =
        enteredName;


    nameOverlay.style.display =
        "none";


    nameOverlay.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.style.overflow =
        "";


    status.textContent =
        "Your journey begins here.";


    mainButton.focus();

}


/* =========================================
   NAME ERROR
========================================= */

function showNameError(message) {

    nameError.textContent =
        message;

    nameInput.classList.add(
        "input-error"
    );

    nameInput.focus();

}


/* =========================================
   MAIN BUTTON
========================================= */

mainButton.addEventListener(
    "click",
    function () {

        if (isStopped) {
            return;
        }


        /* Start timer */

        if (!isRunning) {

            isRunning = true;

            startTime =
                Date.now();

            elapsedSeconds = 0;

            timer.textContent =
                "00:00:00";


            timerInterval =
                setInterval(
                    updateTimer,
                    250
                );


            status.textContent =
                "Excellent. You have started wasting your time.";

        }


        /* Count click */

        clickCount++;

        counter.textContent =
            clickCount;


        /* Update normal messages */

        updateMessage();


        /* =====================================
           EMOJI CELEBRATION
           Every 50 clicks
        ===================================== */

        if (
            clickCount % 50 === 0
        ) {

            triggerEmojiCelebration();

        }

    }
);


/* =========================================
   TIMER
========================================= */

function updateTimer() {

    if (
        !startTime ||
        isStopped
    ) {

        return;

    }


    elapsedSeconds =
        Math.floor(
            (Date.now() - startTime) / 1000
        );


    timer.textContent =
        formatTime(
            elapsedSeconds
        );

}


/* =========================================
   FORMAT TIME
========================================= */

function formatTime(totalSeconds) {

    const safeSeconds =
        Math.max(
            0,
            Number(totalSeconds) || 0
        );


    const hours =
        Math.floor(
            safeSeconds / 3600
        );


    const minutes =
        Math.floor(
            (safeSeconds % 3600) / 60
        );


    const seconds =
        safeSeconds % 60;


    return (
        String(hours).padStart(2, "0") +
        ":" +
        String(minutes).padStart(2, "0") +
        ":" +
        String(seconds).padStart(2, "0")
    );

}


/* =========================================
   NORMAL CLICK MESSAGES
========================================= */

function updateMessage() {

    const messages = {

        1:
            "That was unnecessary.",

        10:
            "You're getting suspiciously good at this.",

        25:
            "There are other things you could be doing.",

        50:
            "50 clicks. Impressive. Completely useless.",

        100:
            "Congratulations. You have achieved nothing.",

        250:
            "Quarter of a thousand clicks. Why?",

        500:
            "This is no longer a hobby.",

        1000:
            "ONE THOUSAND CLICKS. SEEK HELP."

    };


    if (
        messages[clickCount]
    ) {

        status.textContent =
            messages[clickCount];

    }


    if (
        clickCount === 100
    ) {

        mainButton.textContent =
            "KEEP GOING, I GUESS";

    }


    if (
        clickCount === 500
    ) {

        mainButton.textContent =
            "PLEASE STOP";

    }


    if (
        clickCount === 1000
    ) {

        mainButton.textContent =
            "WHAT ARE YOU DOING";

    }

}


/* =========================================
   EMOJI CELEBRATION
========================================= */

function triggerEmojiCelebration() {

    /*
       Number of emojis increases slightly
       as the user becomes more useless.
    */

    let emojiCount = 18;


    if (clickCount >= 250) {
        emojiCount = 24;
    }


    if (clickCount >= 500) {
        emojiCount = 30;
    }


    if (clickCount >= 1000) {
        emojiCount = 40;
    }


    /*
       Pick theme.

       Example:
       50  -> theme 0
       100 -> theme 1
       150 -> theme 2
       etc.

       After the predefined themes are
       exhausted, they repeat randomly.
    */

    const themeIndex =
        Math.floor(clickCount / 50) - 1;


    let selectedTheme;


    if (
        themeIndex >= 0 &&
        themeIndex < emojiThemes.length
    ) {

        selectedTheme =
            emojiThemes[themeIndex];

    } else {

        selectedTheme =
            endlessEmojis;

    }


    /* Create a large burst */

    for (
        let i = 0;
        i < emojiCount;
        i++
    ) {

        createFloatingEmoji(
            selectedTheme
        );

    }


    /* Big center emoji */

    createCelebrationMessage();

}


/* =========================================
   CREATE FLOATING EMOJI
========================================= */

function createFloatingEmoji(theme) {

    const emoji =
        document.createElement("div");


    emoji.className =
        "useless-floating-emoji";


    /*
       Random emoji
    */

    emoji.textContent =
        theme[
            Math.floor(
                Math.random() *
                theme.length
            )
        ];


    /*
       Random screen position
    */

    emoji.style.left =
        Math.random() * 100 +
        "vw";


    emoji.style.top =
        Math.random() * 100 +
        "vh";


    /*
       Random size
    */

    const size =
        24 +
        Math.random() * 42;


    emoji.style.fontSize =
        size + "px";


    /*
       Random rotation
    */

    const rotation =
        -45 +
        Math.random() * 90;


    emoji.style.setProperty(
        "--emoji-rotation",
        rotation + "deg"
    );


    /*
       Random animation duration
    */

    const duration =
        1.5 +
        Math.random() * 2;


    emoji.style.animationDuration =
        duration + "s";


    /*
       Random animation delay
    */

    emoji.style.animationDelay =
        Math.random() * 0.35 +
        "s";


    document.body.appendChild(
        emoji
    );


    /*
       Remove after animation
    */

    setTimeout(
        function () {

            emoji.remove();

        },
        (duration + 0.5) * 1000
    );

}


/* =========================================
   CENTER CELEBRATION MESSAGE
========================================= */

function createCelebrationMessage() {

    const celebration =
        document.createElement("div");


    celebration.className =
        "useless-celebration";


    let message;


    if (clickCount === 50) {

        message =
            "🎉 50 CLICKS! 🎉";

    }

    else if (clickCount === 100) {

        message =
            "💯 100 CLICKS! 💯";

    }

    else if (clickCount === 500) {

        message =
            "🔥 500 CLICKS! 🔥";

    }

    else if (clickCount >= 1000) {

        message =
            "💀 WHY ARE YOU STILL HERE?! 💀";

    }

    else {

        message =
            "🎊 " +
            clickCount +
            " CLICKS! 🎊";

    }


    celebration.textContent =
        message;


    document.body.appendChild(
        celebration
    );


    setTimeout(
        function () {

            celebration.remove();

        },
        1800
    );

}


/* =========================================
   STOP BUTTON
========================================= */

stopButton.addEventListener(
    "click",
    function () {

        if (isStopped) {
            return;
        }


        /* Final time */

        if (startTime !== null) {

            elapsedSeconds =
                Math.floor(
                    (Date.now() - startTime) / 1000
                );

        } else {

            elapsedSeconds = 0;

        }


        timer.textContent =
            formatTime(
                elapsedSeconds
            );


        /* Stop timer */

        stopTimer();


        /* Lock page */

        isRunning = false;

        isStopped = true;

        mainButton.disabled = true;

        stopButton.disabled = true;


        status.textContent =
            "Generating proof of your questionable decision...";


        generateCertificate();

    }
);


/* =========================================
   STOP TIMER
========================================= */

function stopTimer() {

    if (
        timerInterval !== null
    ) {

        clearInterval(
            timerInterval
        );

        timerInterval = null;

    }

}


/* =========================================
   GENERATE CERTIFICATE
========================================= */

function generateCertificate() {

    loadingOverlay.classList.remove(
        "hidden"
    );

    loadingOverlay.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.style.overflow =
        "hidden";


    const messages = [

        "Analyzing your life choices...",

        "Counting pointless clicks...",

        "Calculating time wasted...",

        "Determining whether this was worth it...",

        "Consulting the Button Authority...",

        "Contacting absolutely nobody...",

        "Printing your completely meaningless certificate..."

    ];


    let progress = 0;

    let messageIndex = 0;


    loadingText.textContent =
        messages[0];


    loadingProgress.style.width =
        "0%";


    loadingProgress.setAttribute(
        "aria-valuenow",
        "0"
    );


    if (
        certificateLoadingInterval !== null
    ) {

        clearInterval(
            certificateLoadingInterval
        );

    }


    certificateLoadingInterval =
        setInterval(
            function () {

                progress += 4;


                if (
                    progress > 100
                ) {

                    progress = 100;

                }


                loadingProgress.style.width =
                    progress + "%";


                loadingProgress.setAttribute(
                    "aria-valuenow",
                    String(progress)
                );


                const newMessageIndex =
                    Math.min(
                        messages.length - 1,
                        Math.floor(
                            progress / 16
                        )
                    );


                if (
                    newMessageIndex !==
                    messageIndex
                ) {

                    messageIndex =
                        newMessageIndex;

                    loadingText.textContent =
                        messages[messageIndex];

                }


                if (
                    progress >= 100
                ) {

                    clearInterval(
                        certificateLoadingInterval
                    );

                    certificateLoadingInterval =
                        null;


                    setTimeout(
                        function () {

                            loadingOverlay.classList.add(
                                "hidden"
                            );

                            loadingOverlay.setAttribute(
                                "aria-hidden",
                                "true"
                            );


                            showCertificate();

                        },
                        400
                    );

                }

            },
            80
        );

}


/* =========================================
   SHOW CERTIFICATE
========================================= */

function showCertificate() {

    certificateName.textContent =
        userName;


    certificateClicks.textContent =
        clickCount;


    certificateTime.textContent =
        elapsedSeconds;


    const now =
        new Date();


    certificateDate.textContent =
        "Issued on " +
        now.toLocaleDateString(
            "en-US",
            {
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        );


    certificateId.textContent =
        "CERTIFICATE ID: BTN-" +
        generateCertificateId();


    certificateOverlay.classList.remove(
        "hidden"
    );


    certificateOverlay.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.style.overflow =
        "hidden";


    closeCertificateBottom.focus();

}


/* =========================================
   CERTIFICATE ID
========================================= */

function generateCertificateId() {

    const timestamp =
        Date.now()
            .toString(36)
            .slice(-4)
            .toUpperCase();


    const randomNumber =
        Math.floor(
            1000 +
            Math.random() * 9000
        );


    return (
        timestamp +
        "-" +
        randomNumber
    );

}


/* =========================================
   CLOSE CERTIFICATE
========================================= */

function closeCertificate() {

    certificateOverlay.classList.add(
        "hidden"
    );


    certificateOverlay.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.style.overflow =
        "";


    status.textContent =
        "Certificate successfully issued. Your life may now continue.";

}


/* =========================================
   CLOSE CERTIFICATE BUTTON
========================================= */

closeCertificateBottom.addEventListener(
    "click",
    function () {

        closeCertificate();

    }
);


/* =========================================
   PRINT
========================================= */

printCertificate.addEventListener(
    "click",
    function () {

        window.print();

    }
);


/* =========================================
   ESCAPE KEY
========================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key !== "Escape"
        ) {

            return;

        }


        if (
            !certificateOverlay.classList.contains(
                "hidden"
            )
        ) {

            closeCertificate();

        }

    }
);


/* =========================================
   CLEANUP
========================================= */

window.addEventListener(
    "beforeunload",
    function () {

        stopTimer();


        if (
            certificateLoadingInterval !== null
        ) {

            clearInterval(
                certificateLoadingInterval
            );

        }

    }
);


/* =========================================
   START APPLICATION
========================================= */

initialize();