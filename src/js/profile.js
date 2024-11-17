const apiKey = import.meta.env.VITE_API_KEY;

// fetching profile data
async function fetchProfile() {
    const name = sessionStorage.getItem('name');
    const token = sessionStorage.getItem('accessToken');
    const url = `https://v2.api.noroff.dev/auction/profiles/${name}`;

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
        console.error('Error fetching profile data:', error.message);
        return null;
    }
}

// Login and logout functions
function loggedIn() {
    const accessToken = sessionStorage.getItem('accessToken');
    return accessToken !== null;
}

function updateLogin() {
    const loginAnchor = document.getElementById('loginAnchor');
    if (loggedIn()) {
        loginAnchor.textContent = 'Log out';
        loginAnchor.href = '../index.html';
    } else {
        loginAnchor.textContent = 'Login';
        loginAnchor.href = '../account/login.html';
    }
}
updateLogin();

function logOut() {
    event.preventDefault();
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('name');
    window.location.href = '../index.html';
}

const logoutBtn = document.getElementById('loginAnchor');
if (logoutBtn) {
    logoutBtn.addEventListener('click', function (event) {
        if (loggedIn()) {
            logOut(event)
        }
    });
}

// Update avatar
async function updateAvatar(avatarUrl) {
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

// Modal for editing avatar
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

// displaying profile data
async function displayProfile() {
    const profile = await fetchProfile();

    if (profile) {
        document.getElementById("name").textContent = profile.name;
        document.getElementById("email").textContent = profile.email;
        document.getElementById("nameHeader").textContent = profile.name;
        document.getElementById("creditsHeader").textContent = `Credits: ${profile.credits}`;
        document.getElementById("credits").textContent = `Credits: ${profile.credits}`;
        document.getElementById("listings").textContent = `Listings: ${profile._count.listings}`;
        document.getElementById("wins").textContent = `Wins: ${profile._count.wins}`;

        const avatar = document.getElementById("avatar");
        avatar.src = profile.avatar.url;

        const avatarImage = document.querySelector(".avatar .avatar-image");
        if (avatar) {
            avatarImage.src = profile.avatar.url;
        }
    }
}
displayProfile();
