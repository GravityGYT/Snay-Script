// ==UserScript==
// @name         Snay.io Public Skins Lib
// @namespace    http://tampermonkey.net/
// @version      6.4
// @description  Snay.io Public Lib created to to share
// @author       GravityG
// @match        https://www.snay.io/*
// @grant        none
// @require      https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js
// @updateURL    https://cdn.jsdelivr.net/gh/GravityGYT/Snay-Script/myscript.user.js
// @downloadURL  https://cdn.jsdelivr.net/gh/GravityGYT/Snay-Script/myscript.user.js
// ==/UserScript==

(function () {
    'use strict';

    // Add Bootstrap CSS to the document head
    const bootstrapCSS = document.createElement('link');
    bootstrapCSS.rel = 'stylesheet';
    bootstrapCSS.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css';
    document.head.appendChild(bootstrapCSS);

    // Add custom CSS for styling, animations, and the navbar button
    const customCSS = document.createElement('style');
    customCSS.innerHTML = `
    nav.navbar {
        background-color: rgb(43, 48, 53) !important;
        color: white;
        position: relative;
    }
    .btn-shine {
        position: absolute;
        top: 50%;
        left: 14.25rem; /* 9.5rem x 1.5 */
        transform: translate(-50%, -50%);
        padding: 18px 72px; /* 12px 48px x 1.5 */
        color: #fff;
        background: linear-gradient(to right, #9f9f9f 0, #fff 10%, #868686 20%);
        background-position: 0;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: shine 3s infinite linear;
        animation-fill-mode: forwards;
        font-weight: 600;
        font-size: 24px; /* 16px x 1.5 */
        text-decoration: none;
        white-space: nowrap;
        font-family: "Poppins", sans-serif;
    }
    @keyframes shine {
        0% {
            background-position: 0;
        }
        60% {
            background-position: 270px; /* 180px x 1.5 */
        }
        100% {
            background-position: 345px; /* 230px x 1.5 */
        }
    }
    .search-container {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        flex-grow: 1;
        padding-right: 22.5px; /* 15px x 1.5 */
    }
    .search-container .input {
        border: 3px solid transparent; /* 2px x 1.5 */
        width: 37.5em; /* 25em x 1.5 */
        height: 5.25em; /* 3.5em x 1.5 */
        padding-left: 1.2em; /* 0.8em x 1.5 */
        outline: none;
        overflow: hidden;
        background-color: #1d2024;
        color: white;
        border-radius: 15px; /* 10px x 1.5 */
        transition: all 0.5s;
    }
    .search-container .input:hover,
    .search-container .input:focus {
        border: 3px solid #4A9DEC !important; /* 2px x 1.5 */
        box-shadow: 0px 0px 0px 10.5px rgb(74, 157, 236, 20%) !important; /* 7px x 1.5 */
        background-color: #1d2024 !important;
    }
    #mySkinsContainer, #favoritesContainer, #skinsContainer {
        display: flex;
        grid-template-columns: repeat(auto-fill, minmax(225px, 1fr)); /* 150px x 1.5 */
        gap: 30px; /* 20px x 1.5 */
        padding: 30px; /* 20px x 1.5 */
        width: 100%;
        height: calc(100vh - 300px); /* 200px x 1.5 */
        overflow-y: auto;
        overflow-x: hidden;
        margin: 0 auto;
    }
    #skinsContainer::-webkit-scrollbar {
        width: 12px; /* 8px x 1.5 */
    }
    #skinsContainer::-webkit-scrollbar-thumb {
        background-color: #6c757d !important;
        border-radius: 15px !important; /* 10px x 1.5 */
    }
    #skinsContainer::-webkit-scrollbar-track {
        background-color: #1d2024 !important;
    }
    .skinItem {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transform: scale(0.9);
        filter: blur(10px);
        transition: all 0.5s ease-in-out;
    }
    .skinItem.loaded {
        opacity: 1;
        transform: scale(1);
        filter: blur(0);
    }
    .skinItem > img {
        width: 195px; /* 130px x 1.5 */
        height: 195px; /* 130px x 1.5 */
        margin-top: 30px; /* 20px x 1.5 */
        border-radius: 75%; /* 50% x 1.5 */
        border: 4.5px solid white !important; /* 3px x 1.5 */
        object-fit: cover !important;
        transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
    }
    .skinItem img:hover {
        transform: scale(1.1);
        box-shadow: 0 0 22.5px rgba(255, 255, 255, 0.5); /* 15px x 1.5 */
    }
    .badge {
        margin-top: 15px; /* 10px x 1.5 */
        font-size: 1.35rem; /* 0.9rem x 1.5 */
        text-align: center;
        background-color: #6c757d !important;
        color: white !important;
        padding: 7.5px 15px; /* 5px 10px x 1.5 */
        border-radius: 15px; /* 10px x 1.5 */
    }
    .profile-image {
        margin-left: 30px; /* 20px x 1.5 */
        width: 60px; /* 40px x 1.5 */
        height: 60px; /* 40px x 1.5 */
        border-radius: 75%; /* 50% x 1.5 */
        cursor: pointer;
        border: 3px solid white; /* 2px x 1.5 */
    }
    .dropdown-menu.custom-dropdown-menu {
        min-width: 15rem; /* 10rem x 1.5 */
        padding: 0.75rem 0; /* 0.5rem 0 x 1.5 */
        font-size: 2.25rem; /* 1.5rem x 1.5 */
        color: var(--bs-body-color);
        background-color: #1d2024 !important;
        border: 1.5px solid #4A9DEC !important; /* 1px x 1.5 */
        border-radius: 15px !important; /* 10px x 1.5 */
        box-shadow: 0 0.75rem 1.5rem rgba(0, 0, 0, 0.15) !important; /* 0 0.5rem 1rem x 1.5 */
    }
    .dropdown-menu.custom-dropdown-menu>li>a {
        display: block;
        padding: 4.5px 30px !important; /* 3px 20px x 1.5 */
        clear: both;
        font-weight: 400 !important;
        line-height: 2.142857145 !important; /* 1.42857143 x 1.5 */
        color: #fafafa !important;
        white-space: nowrap !important;
    }
    .dropdown-menu.custom-dropdown-menu>li>a:hover {
        background-color: #4A9DEC !important;
        color: white !important;
    }
    .dropdown-menu.custom-dropdown-menu .dropdown-item.disabled {
        color: #6c757d !important;
        cursor: not-allowed !important;
    }
    .multi-button {
        display: flex;
        justify-content: center;
        margin: 1.5rem auto; /* 1rem x 1.5 */
        width: fit-content;
    }
    .multi-button > button {
        font-size: 1.8rem; /* 1.2rem x 1.5 */
        padding: 0.75em 1.5em; /* 0.5em 1em x 1.5 */
        background: #fff;
        color: #4A5568;
        border: 0px solid #A0AEC0;
        margin: 0.15em; /* 0.1em x 1.5 */
        transition: background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
        box-shadow: 0 0 0 #BEE3F8;
        transform: translateY(0);
        cursor: pointer;
    }
    .multi-button > button:first-of-type {
        border-radius: 0.75em 0 0 0.75em; /* 0.5em x 1.5 */
    }
    .multi-button > button:last-of-type {
        border-radius: 0 0.75em 0.75em 0; /* 0.5em x 1.5 */
    }
    .multi-button > button:hover {
        background: #D53F8C;
        color: #fff;
        box-shadow: 0 0 1.2em 0 rgba(213, 63, 140, 0.8); /* 0 0 0.8em x 1.5 */
        transform: translateY(-0.3em); /* -0.2em x 1.5 */
    }
    .multi-button > button.active {
        background: #D53F8C !important;
        color: white !important;
        box-shadow: 0 0 1.2em 0 rgba(213, 63, 140, 0.8) !important; /* 0 0 0.8em x 1.5 */
        transform: translateY(-0.3em); /* -0.2em x 1.5 */
    }
`;
document.head.appendChild(customCSS);


    const customMySkinsCSS = document.createElement('style');
    customMySkinsCSS.innerHTML = `
          .form-container {
            display: flex;
            margin-top: 10px !important;
            justify-content: center;
            align-items: flex-start; !important;
            gap: 5px; /* Add space between elements */
            margin-top: 0; /* Adjust as needed for spacing from the top */
          }
          .skin-name-input {
            position: relative;
            margin: 20px 0;
            width: 190px;
          }
          .skin-name-input input {
            background-color: transparent;
            border: 0;
            border-bottom: 2px #fff solid;
            display: block;
            width: 100%;
            padding: 15px 0;
            font-size: 18px;
            color: #fff;
          }
          .skin-name-input input:focus,
          .skin-name-input input:valid {
            outline: 0;
            border-bottom-color: lightblue;
          }
          .skin-name-input label {
            position: absolute;
            top: 15px;
            left: 0;
            pointer-events: none;
          }
          .skin-name-input label span {
            display: inline-block;
            font-size: 18px;
            min-width: 5px;
            color: #fff;
            transition: 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          }
          .skin-name-input input:focus + label span,
          .skin-name-input input:valid + label span {
            color: lightblue;
            transform: translateY(-30px);
          }
          .submit-btn {
            background-color: lightblue;
            border: none;
            border-radius: 5px;
            color: #000;
            font-size: 18px;
            padding: 10px 15px;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }
          .submit-btn:hover {
            background-color: #007acc;
            color: #fff;
          }
          .submit-btn:active {
            transform: scale(0.95);
          }
          .dot-spinner {
            --uib-size: 2.8rem;
            --uib-speed: .9s;
            --uib-color: #183153;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            height: var(--uib-size);
            width: var(--uib-size);
          }

          .dot-spinner__dot {
            position: absolute;
            top: 0;
            left: 0;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            height: 100%;
            width: 100%;
          }

          .dot-spinner__dot::before {
            content: '';
            height: 20%;
            width: 20%;
            border-radius: 50%;
            background-color: #ffffff;
            transform: scale(0);
            opacity: 0.5;
            animation: pulse0112 calc(var(--uib-speed) * 1.111) ease-in-out infinite;
            box-shadow: 0 0 20px rgba(18, 31, 53, 0.3);
          }

                    .dot-spinner__dot:nth-child(2) {
                      transform: rotate(45deg);
                    }

          .dot-spinner__dot:nth-child(2)::before {
            animation-delay: calc(var(--uib-speed) * -0.875);
          }

          .dot-spinner__dot:nth-child(3) {
            transform: rotate(90deg);
          }

          .dot-spinner__dot:nth-child(3)::before {
            animation-delay: calc(var(--uib-speed) * -0.75);
          }

          .dot-spinner__dot:nth-child(4) {
            transform: rotate(135deg);
          }

          .dot-spinner__dot:nth-child(4)::before {
            animation-delay: calc(var(--uib-speed) * -0.625);
          }

          .dot-spinner__dot:nth-child(5) {
            transform: rotate(180deg);
          }

          .dot-spinner__dot:nth-child(5)::before {
            animation-delay: calc(var(--uib-speed) * -0.5);
          }

          .dot-spinner__dot:nth-child(6) {
            transform: rotate(225deg);
          }

          .dot-spinner__dot:nth-child(6)::before {
            animation-delay: calc(var(--uib-speed) * -0.375);
          }

          .dot-spinner__dot:nth-child(7) {
            transform: rotate(270deg);
          }

          .dot-spinner__dot:nth-child(7)::before {
            animation-delay: calc(var(--uib-speed) * -0.25);
          }

          .dot-spinner__dot:nth-child(8) {
            transform: rotate(315deg);
          }

          .dot-spinner__dot:nth-child(8)::before {
            animation-delay: calc(var(--uib-speed) * -0.125);
          }

          @keyframes pulse0112 {
            0%,
            100% {
              transform: scale(0);
              opacity: 0.5;
            }

            50% {
              transform: scale(1);
              opacity: 1;
            }
          }
`;
document.head.appendChild(customMySkinsCSS);

function closeDrawer() {
    const drawer = document.getElementById('publicSkinsDrawer');
    if (drawer) {
        const bsDrawer = bootstrap.Offcanvas.getInstance(drawer);
        if (bsDrawer) {
            bsDrawer.hide();
        } else {
            console.warn('Bootstrap Offcanvas instance not found for the drawer.');
        }
    } else {
        console.warn('Drawer element not found.');
    }
}
    // JavaScript for Tab Switching
function setupTabSwitching() {
    const publicSkinsTab = document.getElementById('publicSkinsTab');
    const mySkinsTab = document.getElementById('mySkinsTab');
    const favoritesTab = document.getElementById('favoritesTab');
    const skinsContainer = document.getElementById('skinsContainer');
    const mySkinsContainer = document.getElementById('mySkinsContainer');
    const favoritesContainer = document.getElementById('favoritesContainer');

    // Function to update tab content
    function switchTab(tabKey) {
        // Hide all containers by default
        skinsContainer.style.display = 'none';
        mySkinsContainer.style.display = 'none';
        favoritesContainer.style.display = 'none';

        if (tabKey === 'public') {
            // Show the skins container for PUBLIC SKINS
            skinsContainer.style.display = 'grid';
            skinsContainer.innerHTML = `
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>`;
            // Fetch and refresh skins when switching to PUBLIC SKINS
            fetchImages()
                .then((images) => {
                    renderImagesLazy(images, skinsContainer);
                    console.log("Public skins refreshed successfully!");
                })
                .catch((error) => {
                    skinsContainer.innerHTML = '<p style="color: red;">Failed to refresh skins. Please try again later.</p>';
                    console.error("Failed to refresh skins:", error);
                });
        } else if (tabKey === 'mySkins') {
            // Display custom content for MY SKINS tab
            mySkinsContainer.style.display = 'flex';
            mySkinsContainer.style.flexDirection = 'column';
            mySkinsContainer.style.justifyContent = 'flex-start';
            mySkinsContainer.style.alignItems = 'center';
            mySkinsContainer.style.marginTop = '10px';
            mySkinsContainer.innerHTML = `
                <div class="form-container">
                    <div class="skin-name-input">
                    <input type="text" required>
                    <label>
                    <span style="transition-delay:0ms">Skin Name</span>
                  </label>
                </div>
                  <div class="skin-name-input">
                    <input type="url" required>
                    <label>
                      <span style="transition-delay:0ms">Skin URL</span>
                    </label>
                  </div>
                  <button class="submit-btn">Submit</button>
                </div>
                `;
        } else if (tabKey === 'favorites') {
            // Display custom content for FAVORITES tab
            favoritesContainer.style.display = 'flex';
            favoritesContainer.style.justifyContent = 'center';
            favoritesContainer.style.alignItems = 'center';
            favoritesContainer.innerHTML = `
                <div style="text-align: center;">
                    <img src="https://media.tenor.com/hB9OTbewrikAAAAi/work-work-in-progress.gif"
                         alt="Work in Progress"
                         style="max-width: 100%; height: auto; border-radius: 10px;">
                    <p style="color: white; margin-top: 10px;">Favorites Content Coming Soon</p>
                </div>`;
        }

        // Update the active tab button styles
        publicSkinsTab.classList.remove('active');
        mySkinsTab.classList.remove('active');
        favoritesTab.classList.remove('active');

        if (tabKey === 'public') publicSkinsTab.classList.add('active');
        else if (tabKey === 'mySkins') mySkinsTab.classList.add('active');
        else if (tabKey === 'favorites') favoritesTab.classList.add('active');
    }

    // Add event listeners to each tab button
    publicSkinsTab.addEventListener('click', () => switchTab('public'));
    mySkinsTab.addEventListener('click', () => switchTab('mySkins'));
    favoritesTab.addEventListener('click', () => switchTab('favorites'));

    // Set PUBLIC SKINS as the default tab
    switchTab('public');
}


    // URL of the API endpoint
const API_URL = "https://snay.vercel.app/api/skins";

// Fetch images from the API
async function fetchImages() {
    try {
        console.log("Starting fetch for skins...");
        const response = await fetch(API_URL, {
            method: 'GET', // Explicitly specify GET method
        });
        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }
        const { data } = await response.json(); // Extract `data` property from API response
        console.log("Fetched skins data:", data);
        return data;
    } catch (error) {
        console.error("Error in fetchImages:", error);
        throw error;
    }
}

// Render skins in a lazy-loaded manner
function renderImagesLazy(images, container) {
    container.innerHTML = ""; // Clear previous content

    if (!images || images.length === 0) {
        container.innerHTML = '<p style="color: white;">No skins found.</p>';
        return;
    }

    // Keep track of the currently open dropdown
    let openDropdown = null;

    images.forEach((image, index) => {
        // Create the main skin container
        const skinDiv = document.createElement("div");
        skinDiv.className = "skinItem";
        skinDiv.style.position = "relative";

        // Create the image element
        const img = document.createElement("img");
        img.src = image.url;
        img.alt = `Skin ID: ${image._id}`; // Set the alt attribute to include _id
        img.title = image.name; // Set the title to the skin's name

        // Create a badge for the skin name
        const badge = document.createElement("span");
        badge.className = "badge text-bg-secondary";
        badge.textContent = image.name;

        // Create the dropdown container
        const dropdownContainer = document.createElement("ul");
        dropdownContainer.className = "dropdown-menu custom-dropdown-menu dropdown-menu-end";
        dropdownContainer.style.cssText = `
            display: none;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -200%);
            z-index: 1000;
        `;

        // Create dropdown item
        const dropdownItem = document.createElement("li");
        const dropdownLink = document.createElement("a");
        dropdownLink.className = "dropdown-item";
        dropdownLink.href = "#";

        // Add an image badge next to the dropdown link
        const badgeImage = document.createElement("img");
        badgeImage.src = "./assets/badges/badge4.png";
        badgeImage.alt = "Badge";
        badgeImage.className = "badge-image";
        badgeImage.style.cssText = `
            width: 20px;
            height: 20px;
            margin-right: 8px;
            vertical-align: middle;
        `;

        dropdownLink.appendChild(badgeImage);
        dropdownLink.appendChild(document.createTextNode("Vip Skin"));

        // Dropdown link click handler
        dropdownLink.addEventListener("click", (event) => {
            event.preventDefault();
            const vipSkinInput = document.getElementById("addVipSkin");
            if (vipSkinInput) {
                vipSkinInput.value = image.url; // Set the skin URL
            } else {
                console.warn("Input element with id='addVipSkin' not found.");
            }
            const vipButton = document.querySelector("#gallery-body > div.vip-div > ul > li:nth-child(1) > button");
            if (vipButton) {
                vipButton.click();
            }
        });

        dropdownItem.appendChild(dropdownLink);
        dropdownContainer.appendChild(dropdownItem);

        // Dropdown toggle logic
        skinDiv.addEventListener("click", (event) => {
            event.stopPropagation(); // Prevent click event propagation
            if (openDropdown && openDropdown !== dropdownContainer) {
                openDropdown.style.display = "none"; // Close other dropdownsF
            }
            dropdownContainer.style.display =
                dropdownContainer.style.display === "block" ? "none" : "block";
            openDropdown = dropdownContainer.style.display === "block" ? dropdownContainer : null;
        });

        // Append elements to the skin container
        skinDiv.appendChild(img);
        skinDiv.appendChild(badge);
        skinDiv.appendChild(dropdownContainer);

        // Append skin container to the main container
        container.appendChild(skinDiv);

        // Apply lazy-loading animation with delay
        setTimeout(() => {
            skinDiv.classList.add("loaded");
        }, index * 100); // 100ms delay per skin
    });

    // Global click listener to close dropdowns when clicking outside
    document.addEventListener("click", () => {
        if (openDropdown) {
            openDropdown.style.display = "none";
            openDropdown = null; // Reset the tracker
        }
    });
}

// Example usage
const skinsContainer = document.getElementById("skinsContainer");
fetchImages()
    .then((images) => renderImagesLazy(images, skinsContainer))
    .catch((error) => {
        skinsContainer.innerHTML = '<p style="color: red;">Failed to load skins.</p>';
    });


    // Main Function
    async function main() {
        const sideButtons = document.querySelector('#main-menu .side-buttons') || await waitForElement('#main-menu .side-buttons');

        // Create the "Public Skins" button
        const button = document.createElement('button');
        //button.textContent = 'Public Skins';
        button.className = 'btn side-btn';
        button.id = 'PublicSkins';
        button.style.cssText = `
            background-color: rgb(139 92 246 / 0%);
            color: white;
            border-radius: 0px;
            padding: 16px 40px;
            font-size: 1.2rem;
            background-image: url(https://i.postimg.cc/wBhr5Ftc/SlF1SEF.png);
        `;

        sideButtons.style.display = 'flex';
        sideButtons.style.flexDirection = 'column';
        sideButtons.style.alignItems = 'center';
        sideButtons.prepend(button);

        // Create the drawer
        const drawer = document.createElement('div');
        drawer.className = 'offcanvas offcanvas-bottom';
        drawer.tabIndex = -1;
        drawer.id = 'publicSkinsDrawer';
        drawer.style.height = '90%';
        drawer.style.backgroundColor = '#1d2024';
        drawer.innerHTML = `
    <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
            <div class="search-container">
                <input id="customInputField" class="input" placeholder="Search skins...">
                <div class="dropdown profile-container">
                    <img src="https://i.imgur.com/V4RclNb.png" alt="Profile" class="profile-image dropdown-toggle" id="profileDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                    <ul class="dropdown-menu custom-dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
                        <li><a class="dropdown-item" href="#" data-action="logout" style="display: none;">Logout</a></li>
                        <li><a class="dropdown-item" href="#" id="myskins">My Skins</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="#" id="refreshSkins">Refresh Skins</a></li>
                    </ul>
                </div>
            </div>
            <a href="#" class="btn-shine">PUBLIC Skin library</a>
        </div>
    </nav>
    <div class="multi-button">
        <button id="publicSkinsTab">PUBLIC SKINS</button>
        <button id="mySkinsTab">MY SKINS</button>
        <button id="favoritesTab">❤️</button>
    </div>
    <div class="offcanvas-body">
        <div id="skinsContainer" style="display: none;"></div>
        <div id="mySkinsContainer" style="display: none;"></div>
        <div id="favoritesContainer" style="display: none;"></div>
    </div>
`;

        document.body.appendChild(drawer);


        button.setAttribute('data-bs-toggle', 'offcanvas');
        button.setAttribute('data-bs-target', '#publicSkinsDrawer');

        const skinsContainer = document.getElementById('skinsContainer');
        const customInputField = document.getElementById('customInputField');

        // Tooltip Initialization
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
        setupTabSwitching();

                // Refresh Skins Functionality
        document.getElementById('refreshSkins').addEventListener('click', async () => {
            skinsContainer.innerHTML = `
                <div class="dot-spinner">
            <div class="dot-spinner__dot"></div>
            <div class="dot-spinner__dot"></div>
            <div class="dot-spinner__dot"></div>
            <div class="dot-spinner__dot"></div>
            <div class="dot-spinner__dot"></div>
            <div class="dot-spinner__dot"></div>
            <div class="dot-spinner__dot"></div>
            <div class="dot-spinner__dot"></div>
                </div>`;
            try {
                const images = await fetchImages();
                renderImagesLazy(images, skinsContainer);
                console.log("Skins refreshed successfully!");

                // Update profile picture after refreshing skins
                updateProfilePicture();
            } catch (error) {
                console.log("Failed to refresh skins.");
            }
        });

        try {
            const images = await fetchImages();
            renderImagesLazy(images, skinsContainer);

            // Add search functionality
            customInputField.addEventListener('input', () => {
                const searchTerm = customInputField.value.toLowerCase();
                const filteredImages = images.filter(image => image.name.toLowerCase().includes(searchTerm));
                renderImagesLazy(filteredImages, skinsContainer);
            });
        } catch (error) {
            skinsContainer.innerHTML = '<p style="color: white;">Failed to load skins. Please try again later.</p>';
        }

        // Function to determine the profile picture path
        function getProfilePicturePath(skin) {
            if (!skin) {
                console.warn('Skin value is undefined or null.');
                return 'https://via.placeholder.com/150'; // Default fallback image
            }

            if (skin.startsWith('http')) {
                return skin;
            }

            const skinMappings = {
                Premium: './assets/skins/Premium/',
                Creators: './assets/skins/Creators/',
                Flags: './assets/skins/Flags/',
                Free: './assets/skins/Free/',
                Level: './assets/skins/Level/'
            };

            if (skin.startsWith('YT(')) {
                return `${skinMappings.Creators}${skin}.png`;
            } else if (skin.startsWith('FREE')) {
                return `${skinMappings.Free}${skin}.png`;
            } else if (skin.startsWith('LVL')) {
                return `${skinMappings.Level}${skin}.png`;
            } else if (skin.length === 2) {
                return `${skinMappings.Flags}${skin.toLowerCase()}.png`;
            } else {
                return `${skinMappings.Premium}${skin}.png`;
            }
        }

        // Function to update the profile picture
        function updateProfilePicture() {
            try {
                const skin = protoService?.userInfo?.skin;
                if (!skin) {
                    console.warn('protoService.userInfo.skin is undefined.');
                    return;
                }

                const profilePicturePath = getProfilePicturePath(skin);
                const profileImageElement = document.getElementById('profileDropdown');
                if (profileImageElement) {
                    profileImageElement.src = profilePicturePath;
                    console.log('Profile picture updated successfully:', profilePicturePath);
                } else {
                    console.error('Element with id="profileDropdown" not found.');
                }
            } catch (error) {
                console.error('Error updating profile picture:', error);
            }
        }

        // Call updateProfilePicture every 5 seconds
        setInterval(updateProfilePicture, 5000);

    }

    main();
})();
