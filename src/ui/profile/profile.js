import { updateLogin, logoutHandler } from '../auth/authHelpers.js';
import { fetchListingsByUser } from '../../api/listings/userListings.js';
import { profileData } from '../../api/profile/profileData.js';
import { updateAvatar } from '../../api/profile/updateAvatar.js';

// display profile data
async function displayProfile() {
    const profile = await profileData();

    if (profile) {
        document.getElementById('name').textContent = profile.name;
        document.getElementById('email').textContent = profile.email;
        document.getElementById('nameHeader').textContent = profile.name;
        document.getElementById('creditsHeader').textContent = `Credits: ${profile.credits}`;
        document.getElementById('credits').textContent = `Credits: ${profile.credits}`;
        document.getElementById('listings').textContent = `Listings: ${profile._count.listings}`;
        document.getElementById('wins').textContent = `Wins: ${profile._count.wins}`;

        const avatar = document.getElementById('avatar');
        avatar.src = profile.avatar.url;

        const avatarImage = document.querySelector('.avatar .avatar-image');
        if (avatar) {
            avatarImage.src = profile.avatar.url;
        }
    }
}
displayProfile();

// display listings by user
async function displayListings() {
    const listings = await fetchListingsByUser();

    if (listings) {
        const listingsContainer = document.getElementById('listingsContainer');
        const listingTemplate = document.getElementById('listingTemplate');

        listings.forEach(listing => {
            const listingElement = listingTemplate.cloneNode(true);
            listingElement.classList.remove('hidden');

            const listingLink = listingElement.querySelector('#listingLink');
            listingLink.href = `../listing/singleListing.html?id=${listing.id}`;

            const image = listingElement.querySelector('#listingImage');
            if (listing.media && listing.media.length > 0) {
                image.src = listing.media[0].url;
                image.alt = listing.media[0].alt;
            }

            const title = listingElement.querySelector('#listingTitle');
            title.textContent = listing.title;

            const description = listingElement.querySelector('#listingDescription');
            description.textContent = listing.description;

            const category = listingElement.querySelector('#category');
            category.textContent = listing.tags || 'Uncategorized';

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

// call the updated login/logout functions
updateLogin();
logoutHandler();
