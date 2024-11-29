import './styles/input.css'
import { profileData } from './api/profile/profileData.js';
import { updateLogin, logoutHandler } from './ui/auth/authHelpers.js';

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
