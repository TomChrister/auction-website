import '../styles/input.css';
const apiKey = import.meta.env.VITE_API_KEY;

// login and logout functions
function loggedIn() {
    const accessToken = sessionStorage.getItem('accessToken');
    return accessToken !== null;
}

function updateLogin() {
    const loginAnchor = document.getElementById('loginAnchor');
    if (loggedIn()) {
        loginAnchor.textContent = 'Log out';
        loginAnchor.href = 'index.html';
    } else {
        loginAnchor.textContent = 'Login';
        loginAnchor.href = 'account/login.html';
    }
}
updateLogin()

function logOut() {
    event.preventDefault();
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('name');
    window.location.href = 'index.html';
}

const logoutBtn = document.getElementById('loginAnchor');
if (logoutBtn) {
    logoutBtn.addEventListener('click', function (event) {
        if (loggedIn()) {
            logOut(event)
        }
    });
}

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

// displaying profile data
async function displayProfile() {
    const profile = await fetchProfile();

    if (profile) {
        document.getElementById("name").textContent = profile.name;
        document.getElementById("credits").textContent = `Credits: ${profile.credits}`;

        const avatar = document.getElementById("avatar");
        avatar.src = profile.avatar.url;
        avatar.alt = profile.avatar.alt;
    }
}
displayProfile();
