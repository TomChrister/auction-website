// fetch all listings from all users
export async function feedListings() {
    const url = `https://v2.api.noroff.dev/auction/listings?sort=created`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            console.error('Response details:', response);
            throw new Error(`HTTP error ${response.status}`);
        }

        const { data } = await response.json();
        return data;

    } catch (error) {
        console.error('Error fetching listings:', error.message);
        throw error;
    }
}

