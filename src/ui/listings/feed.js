// main feed page
import { feedListings } from '../../api/listings/feedListings.js';

// pagination
let currentPage = 0;
const listingsPerPage = 12;
let allListings = [];

// display all listings
function displayListings() {
    const container = document.getElementById('listingsContainer');
    const start = currentPage * listingsPerPage;
    const end = start + listingsPerPage;
    const listingsToDisplay = allListings.slice(start, end);

    listingsToDisplay.forEach(listing => {
        const listingDiv = document.createElement('div');
        listingDiv.className = 'listing-card';
        listingDiv.innerHTML = `
            <a href="../listing/singleListing.html?id=${listing.id}">
            <h2 class='text-xl font-medium capitalize'>${listing.title}</h2>
            <p class='capitalize'><strong>Description:</strong> ${truncateDescription(listing.description)}</p>
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
        container.appendChild(listingDiv);
    });

    if (end < allListings.length) {
        const showMoreContainer = document.getElementById('showMoreContainer');
        showMoreContainer.innerHTML = '';
        const showMoreButton = document.createElement('button');
        showMoreButton.className = 'show-more-btn bg-blue-500 text-white py-2 px-4 rounded';
        showMoreButton.textContent = 'Show More';
        showMoreButton.onclick = loadMoreListings;
        showMoreContainer.appendChild(showMoreButton);
    }
}
feedListings();

// loads more listings - pagination
function loadMoreListings() {
    currentPage++;
    displayListings();
}

// get data from feedListings
async function initializeListings() {
    try {
        allListings = await feedListings();
        displayListings();
    } catch (error) {
        console.error('Error initializing listings:', error.message);
    }
}
initializeListings();

// limit description to 15 characters in listings
function truncateDescription(description) {
    if (!description) return 'No description';
    if (description.length > 15) {
        return description.slice(0, 15) + '...';
    }
    return description;
}
