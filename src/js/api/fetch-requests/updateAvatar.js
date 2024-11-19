// update avatar request
const apiKey = import.meta.env.VITE_API_KEY;

export async function updateAvatar(avatarUrl) {
    const name = sessionStorage.getItem('name');
    const token = sessionStorage.getItem('accessToken');

    if (!token || !name) {
        console.error('No access token or name found in session storage.');
        return;
    }

    const apiUrl = `https://v2.api.noroff.dev/auction/profiles/${name}`;
    const updatedProfileData = {
        avatar: {
            url: avatarUrl,
            alt: '',
        },
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                'X-Noroff-API-KEY': apiKey,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedProfileData),
        });

        if (!response.ok) {
            console.error("Response details:", response);
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const updatedData = await response.json();
        console.log('Avatar updated successfully:', updatedData);
        alert('Avatar updated!');
    } catch (error) {
        console.error('Error updating avatar:', error.message);
    }
}