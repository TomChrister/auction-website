import '../styles/input.css';
import { fetchProfile } from './api/index.js';

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

// displaying fetch-requests data
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
