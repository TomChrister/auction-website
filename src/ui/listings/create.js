import { createListing } from '../../api/listings/createListing.js';
import { profileData } from '../../api/profile/profileData.js';
import { updateLogin, logoutHandler } from '../auth/authHelpers.js';

// create listing submit function
document.getElementById('createForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const title = document.getElementById('title').value.trim();
    const description = document.getElementById('description').value.trim();
    const tags = document.getElementById('tags').querySelector('input').value.trim();
    const media = document.getElementById('media').querySelector('input').value.trim();
    const endsAtInput = document.getElementById('endsAt').querySelector('input').value.trim();

    // check if date-time format is valid
    const isoFormatRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;

    let endsAt;
    if (!isoFormatRegex.test(endsAtInput)) {
        alert('Please enter the date and time in the correct format.');
        return;
    } else {
        endsAt = new Date(endsAtInput).toISOString();
    }

    const listingData = {
        title,
        description: description || undefined,
        tags: tags ? tags.split(',').map((tag) => tag.trim()) : undefined,
        media: media
            ? [
                {
                    url: media,
                    alt: 'User-provided data',
                },
            ]
            : undefined,
        endsAt,
    };

    try {
        const result = await createListing(listingData);
        console.log('Listing created successfully:', result);
        window.location.href = 'index.html';
    } catch (error) {
        console.error('Failed to create listing:', error.message);
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

// call updated login/logout functions
updateLogin();
logoutHandler();
