import { fetchProfile, updateAvatar, fetchListingsByUser } from './api/index.js';

// displaying profile data
async function displayProfile() {
    const profile = await fetchProfile();

    if (profile) {
        document.getElementById("name").textContent = profile.name;
        document.getElementById("email").textContent = profile.email;
        document.getElementById("nameHeader").textContent = profile.name;
        document.getElementById("creditsHeader").textContent = `Credits: ${profile.credits}`;
        document.getElementById("credits").textContent = `Credits: ${profile.credits}`;
        document.getElementById("listings").textContent = `Listings: ${profile._count.listings}`;
        document.getElementById("wins").textContent = `Wins: ${profile._count.wins}`;

        const avatar = document.getElementById("avatar");
        avatar.src = profile.avatar.url;

        const avatarImage = document.querySelector(".avatar .avatar-image");
        if (avatar) {
            avatarImage.src = profile.avatar.url;
        }
    }
}
displayProfile();

// displaying listings by user
async function displayListings() {
    const listings = await fetchListingsByUser();

    if (listings) {
        const listingsContainer = document.getElementById("listingsContainer");
        const listingTemplate = document.getElementById("listingTemplate");

        listings.forEach(listing => {
            const listingElement = listingTemplate.cloneNode(true);
            listingElement.classList.remove('hidden');

            // Image
            const image = listingElement.querySelector("#listingImage");
            if (listing.media && listing.media.length > 0) {
                image.src = listing.media[0].url;
                image.alt = listing.media[0].alt;
            }

            const title = listingElement.querySelector("#listingTitle");
            title.textContent = listing.title;

            const description = listingElement.querySelector("#listingDescription");
            description.textContent = listing.description;

            const category = listingElement.querySelector("#category");
            category.textContent = listing.tags || "Uncategorized";

            listingsContainer.appendChild(listingElement);
        });
    }
}
displayListings();

// modal for updating avatar
document.getElementById('editAvatarBtn').addEventListener('click', () => {
    document.getElementById('editAvatarModal').style.display = 'block';
});

document.getElementById('cancelAvatarBtn').addEventListener('click', () => {
    document.getElementById('editAvatarModal').style.display = 'none';
});

document.getElementById('submitAvatarBtn').addEventListener('click', () => {
    const avatarUrl = document.getElementById('avatarUrlInput').value;

    if (avatarUrl) {
        updateAvatar(avatarUrl);
        document.getElementById('editAvatarModal').style.display = 'none';
    } else {
        alert('Please enter a valid avatar URL.');
    }
});

// login and logout functions
function loggedIn() {
    const accessToken = sessionStorage.getItem('accessToken');
    return accessToken !== null;
}

function updateLogin() {
    const loginAnchor = document.getElementById('loginAnchor');
    if (loggedIn()) {
        loginAnchor.textContent = 'Log out';
        loginAnchor.href = '../index.html';
    } else {
        loginAnchor.textContent = 'Login';
        loginAnchor.href = '../account/login.html';
    }
}
updateLogin();

function logOut() {
    event.preventDefault();
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('name');
    window.location.href = '../index.html';
}

const logoutBtn = document.getElementById('loginAnchor');
if (logoutBtn) {
    logoutBtn.addEventListener('click', function (event) {
        if (loggedIn()) {
            logOut(event)
        }
    });
}
