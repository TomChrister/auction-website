import '../styles/input.css';

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
