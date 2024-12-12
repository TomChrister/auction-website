// Fetch profile data
import { authHeaders } from '../../utils/headers.js';

export async function profileData() {
    const name = localStorage.getItem('name');
    const token = localStorage.getItem('accessToken');
    const url = `https://v2.api.noroff.dev/auction/profiles/${name}`;

    if (!token) {
        console.error('No access token found in session storage.');
        return null;
    }

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: authHeaders()
        });

        if (!response.ok) {
            console.error('Response details:', response);
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching fetch-requests data:', error.message);
        return null;
    }
}
