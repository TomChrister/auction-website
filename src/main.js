import './styles/input.css'
import { updateLogin, logoutHandler } from './ui/auth/authHelpers.js';
import { displayListings } from './ui/listings/feed.js';
import { profileData } from './api/profile/profileData.js';
import { fetchSearch } from './api/listings/searchListings.js';

// target the search input and results
const searchInput = document.getElementById('searchInput');
const resultsDiv = document.getElementById('listingsContainer');

// search function
searchInput.addEventListener('input', async function () {
    const query = searchInput.value;
    const listingId = null;

    // starts searching once the search hits 3 characters
    if (query.length > 2) {
        const {searchResults} = await fetchSearch(query, listingId);

        if (Array.isArray(searchResults)) {
            resultsDiv.innerHTML = '';

            searchResults.forEach(listing => {
                const listingDiv = document.createElement('div');
                listingDiv.className = 'listing-card';
                listingDiv.innerHTML = `
                    <a href="../listing/singleListing.html?id=${listing.id}">
                        <h2 class='text-xl font-medium capitalize'>${listing.title}</h2>
                        <p class='capitalize'><strong>Description:</strong> ${listing.description}</p>
                        <p><strong>Ends At:</strong> ${new Date(listing.endsAt).toLocaleDateString()}</p>
                        <p><strong>Number of Bids:</strong> ${listing._count.bids}</p>
                        <p><strong>Tags:</strong> ${listing.tags.length > 0 ? listing.tags.join(', ') : 'No tags'}</p>
                        <div> ${
                        listing.media.length > 0
                        ? `<img src='${listing.media[0].url}' alt='${listing.media[0].alt || listing.title}' class='media-img'>`
                        : 'No media available'
                    }</div> 
                    </a>
                `;
                resultsDiv.appendChild(listingDiv);
            });
        } else {
            console.error('searchResults is not an array', searchResults);
        }

    } else {
        resultsDiv.innerHTML = '';
        displayListings();
    }
});

// display profile data in header
async function displayProfile() {
    const profile = await profileData();

    if (profile) {
        document.getElementById('name').textContent = profile.name;
        document.getElementById('credits').textContent = `Credits: ${profile.credits}`;

        const avatar = document.getElementById('avatar');
        avatar.src = profile.avatar.url;
        avatar.alt = profile.avatar.alt;
    }
}
displayProfile();

// call the updated login/logout functions
updateLogin();
logoutHandler();
