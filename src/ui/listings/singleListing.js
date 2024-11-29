import { updateLogin, logoutHandler } from '../auth/authHelpers.js';
import { getBidderHistory } from '../../api/bid/bidHistory.js';
import { singleListing } from '../../api/listings/singleListing.js';
import { profileData } from '../../api/profile/profileData.js';

// display single listing
async function displaySingleListing() {
    const listing = await singleListing();

    if (listing) {
        const container = document.getElementById('singleListingContainer');

        const image = container.querySelector('#singleListingImage');
        if (listing.media && listing.media.length > 0) {
            image.src = listing.media[0].url;
            image.alt = listing.media[0].alt || 'Listing image';
        }

        const title = container.querySelector('#singleListingTitle');
        title.textContent = `Title: ${listing.title.charAt(0).toUpperCase() + listing.title.slice(1).toLowerCase()}`;

        const description = container.querySelector('#singleListingDescription');
        description.textContent = `Description: ${listing.description.charAt(0).toUpperCase() + listing.description.slice(1).toLowerCase()}`;

        const category = container.querySelector('#singleListingCategory');
        category.textContent = `Category: ${listing.tags && listing.tags.length > 0 ? listing.tags.join(', ').charAt(0).toUpperCase() + listing.tags.join(', ').slice(1).toLowerCase() : 'Uncategorized'}`;

        const created = container.querySelector('#created');
        created.textContent = `Created: ${listing.created ? new Date(listing.created).toLocaleDateString() : 'No date available'}`;

        const endsAt = container.querySelector('#endsAt');
        endsAt.textContent = `Ends at: ${listing.endsAt ? new Date(listing.endsAt).toLocaleDateString() : 'No end date available'}`;

        const bids = container.querySelector('#bids');
        bids.textContent = `Bids: ${listing._count.bids || 0}`;
    } else {
        console.error('Failed to fetch or display the listing');
    }
}
displaySingleListing();
singleListing();

// display the bidder history
async function displayBidderHistory() {
    const bidderHistory = await getBidderHistory();

    if (Array.isArray(bidderHistory)) {
        const bidderList = document.getElementById('bidderHistory');

        bidderHistory.forEach(bid => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
            <img src="${bid.bidder.avatar.url}" alt="${bid.bidder.avatar.alt}" width="50">
            <strong>${bid.bidder.name}</strong> 
            bid amount: $${bid.amount} 
            on ${new Date(bid.created).toLocaleDateString()}
            <br>
            `;
            bidderList.appendChild(listItem);
        });
    } else {
        console.error('Expected bidderHistory to be an array, but got:', bidderHistory);
    }
}
displayBidderHistory()

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
