
// =======================================
// JONES JOURNAL
// Complete JavaScript
// =======================================

"use strict";

// =======================================
// 1. WELCOME BUTTON
// =======================================

const welcomeButton = document.getElementById("welcomeButton");

if (welcomeButton) {
    welcomeButton.addEventListener("click", function () {
        alert("Welcome to Jones Journal!\n\nLearn. Build. Innovate. Lead.");

        const profile = document.getElementById("profile");

        if (profile) {
            profile.scrollIntoView({ behavior: "smooth" });
        }
    });
}

// =======================================
// 2. LIVE DATE AND TIME
// =======================================

function updateClock() {
    const clock = document.getElementById("clock");

    if (!clock) return;

    const now = new Date();

    const date = now.toLocaleDateString("en-KE", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    const time = now.toLocaleTimeString("en-KE", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
    });

    clock.textContent = date + " | " + time;
}

updateClock();
setInterval(updateClock, 1000);

// =======================================
// 3. PHOTO SLIDESHOWS
// One photo per box with Previous/Next
// =======================================

function createGallery(galleryId, prefix, total, title) {
    const gallery = document.getElementById(galleryId);

    if (!gallery) return;

    gallery.className = "photo-slider";

    let currentIndex = 1;

    const photo = document.createElement("img");
    photo.className = "slider-photo";
    photo.alt = title + " 1";
    photo.loading = "eager";

    const caption = document.createElement("p");
    caption.className = "slider-caption";

    const controls = document.createElement("div");
    controls.className = "slider-controls";

    const previousButton = document.createElement("button");
    previousButton.type = "button";
    previousButton.textContent = "← Previous";
    previousButton.setAttribute("aria-label", "Previous " + title);

    const count = document.createElement("span");
    count.className = "slider-count";
    count.setAttribute("aria-live", "polite");

    const nextButton = document.createElement("button");
    nextButton.type = "button";
    nextButton.textContent = "Next →";
    nextButton.setAttribute("aria-label", "Next " + title);

    controls.append(previousButton, count, nextButton);

    gallery.replaceChildren(photo, caption, controls);

    function showPhoto() {
        photo.hidden = false;

        photo.src = "images/" + prefix + currentIndex + ".jpg";
        photo.alt = title + " " + currentIndex;

        caption.textContent = title + " " + currentIndex;
        count.textContent = currentIndex + " / " + total;

        previousButton.disabled = currentIndex === 1;
        nextButton.disabled = currentIndex === total;
    }

    previousButton.addEventListener("click", function () {
        if (currentIndex > 1) {
            currentIndex--;
            showPhoto();
        }
    });

    nextButton.addEventListener("click", function () {
        if (currentIndex < total) {
            currentIndex++;
            showPhoto();
        }
    });

    photo.addEventListener("error", function () {
        photo.hidden = true;
        caption.textContent =
            "Photo missing: images/" + prefix + currentIndex + ".jpg";
    });

    photo.addEventListener("load", function () {
        photo.hidden = false;
    });

    showPhoto();
}

// Create the three galleries
createGallery("memoryGallery", "memory", 20, "Memory");
createGallery("familyGallery", "family", 20, "Family photo");
createGallery("nellieGallery", "nellie", 10, "Friendship memory");

// =======================================
// 4. JONES GROUP HOLDINGS
// Future business vision
// =======================================

const businesses = [
    ["KYROX", "Fashion & Apparel"],
    ["Jones Biotech", "Biotechnology"],
    ["Jones Academy", "Education"],
    ["Jones Investments", "Investment"],
    ["Jones Healthcare", "Healthcare"],
    ["Jones Construction", "Construction"],
    ["Jones AgriTech", "Agriculture"],
    ["Jones Financial Services", "Financial Services"],
    ["Jones Technologies", "Technology"],
    ["Jones Communications", "Media & Communications"],
    ["Jones Real Estate", "Real Estate"],
    ["Jones Logistics", "Logistics"],
    ["Jones Energy", "Renewable Energy"],
    ["Jones Retail", "Retail"],
    ["Jones Foods", "Food & Beverage"],
    ["Jones Travel", "Travel & Hospitality"],
    ["Jones Entertainment", "Entertainment"],
    ["Jones Sports", "Sports"],
    ["Jones Foundation", "Community Development"]
];

const businessGrid = document.getElementById("businessGrid");

if (businessGrid) {
    businesses.forEach(function (business) {
        const article = document.createElement("article");
        article.className = "business-item";

        const heading = document.createElement("h3");
        heading.textContent = business[0];

        const description = document.createElement("p");
        description.textContent = business[1];

        article.append(heading, description);
        businessGrid.appendChild(article);
    });
}

// =======================================
// 5. DATING REFLECTIONS
// Saved in this browser on this device
// =======================================

const datingNotes = document.getElementById("datingNotes");
const saveDatingNotes = document.getElementById("saveDatingNotes");
const datingStatus = document.getElementById("datingStatus");

const STORAGE_KEY = "jonesJournalDatingReflection";

if (datingNotes && datingStatus) {
    try {
        const savedNotes = localStorage.getItem(STORAGE_KEY);

        if (savedNotes !== null) {
            datingNotes.value = savedNotes;
        }
    } catch (error) {
        datingStatus.textContent =
            "Browser storage is unavailable.";
    }
}

if (saveDatingNotes && datingNotes && datingStatus) {
    saveDatingNotes.addEventListener("click", function () {
        try {
            localStorage.setItem(STORAGE_KEY, datingNotes.value);

            datingStatus.textContent =
                "Reflection saved in this browser.";
        } catch (error) {
            datingStatus.textContent =
                "Could not save. Check browser storage settings.";
        }
    });
}

// =======================================
// 6. MUSIC PLAYER
// Play and Pause controls
// =======================================

const journalMusic = document.getElementById("journalMusic");
const playMusic = document.getElementById("playMusic");
const pauseMusic = document.getElementById("pauseMusic");
const musicStatus = document.getElementById("musicStatus");

if (journalMusic && playMusic && musicStatus) {
    playMusic.addEventListener("click", async function () {
        try {
            await journalMusic.play();
            musicStatus.textContent = "Music is playing.";
        } catch (error) {
            musicStatus.textContent =
                "Music could not start. Check music/my-fav-song.mp3.";
        }
    });

    journalMusic.addEventListener("error", function () {
        musicStatus.textContent =
            "Audio file unavailable. Check your music folder and filename.";
    });
}

if (journalMusic && pauseMusic && musicStatus) {
    pauseMusic.addEventListener("click", function () {
        journalMusic.pause();
        musicStatus.textContent = "Music paused.";
    });
}
