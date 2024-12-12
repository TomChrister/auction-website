import { createListing } from '../../api/listings/createListing.js';

// Create listing submit function
document.getElementById('createForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const title = document.getElementById('title').value.trim();
    const description = document.getElementById('description').value.trim();
    const tags = document.getElementById('tags').querySelector('input').value.trim();
    const media = document.getElementById('media').querySelector('input').value.trim();
    const endsAtInput = document.getElementById('endsAt').querySelector('input').value.trim();

    // Check if date-time format is valid
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
