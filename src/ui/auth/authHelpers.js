// check if user is logged in
export function loggedIn() {
    const accessToken = sessionStorage.getItem('accessToken');
    return accessToken !== null;
}

// update login/logout anchor tag
export function updateLogin() {
    const loginAnchor = document.getElementById('loginAnchor');
    if (loginAnchor) {
        if (loggedIn()) {
            loginAnchor.textContent = 'Log out';
            loginAnchor.href = '../index.html';
        } else {
            loginAnchor.textContent = 'Login';
            loginAnchor.href = '../account/auth.html';
        }
    }
}

// log out function
export function logOut(event) {
    if (event) event.preventDefault();
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('name');
    window.location.href = '../../../../index.html';
}

// logout functionality if logged in
export function logoutHandler() {
    const logoutBtn = document.getElementById('loginAnchor');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function (event) {
            if (loggedIn()) {
                logOut(event);
            }
        });
    }
}
