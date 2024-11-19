// fetch listings by user/id
const apiKey = import.meta.env.VITE_API_KEY;

export async function fetchListingsByUser() {
    const name = sessionStorage.getItem('name');
    const token = sessionStorage.getItem('accessToken');
    const url = `https://v2.api.noroff.dev/auction/profiles/${name}/listings`;

    if (!token) {
        console.error('No access token found in session storage.');
        return null;
    }

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'X-Noroff-API-KEY': apiKey,
            },
        });

        if (!response.ok) {
            console.error("Response details:", response);
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data.data;

    } catch (error) {
        console.error('Error fetching fetch-requests data:', error.message);
        return null;
    }
}
fetchListingsByUser();