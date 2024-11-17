// APIs
const apiLogin = 'https://v2.api.noroff.dev/auth/login';
const apiRegister = 'https://v2.api.noroff.dev/auth/register';

// Elements
const loginEmail = document.getElementById('loginEmail');
const loginPassword = document.getElementById('loginPassword');
const registerUsername = document.getElementById('registerUsername');
const registerEmail = document.getElementById('registerEmail');
const registerPassword = document.getElementById('registerPassword');
const errorMessage = document.getElementById('errorMessage');
const loginFormElement = document.getElementById('login');
const registerFormElement = document.getElementById('register');
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');

// Login function
loginBtn.addEventListener('click', async function () {
    const mailValue = loginEmail.value;
    const pwdValue = loginPassword.value;
    const postData = { email: mailValue, password: pwdValue };

    try {
        const response = await fetch(apiLogin, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postData),
        });

        if (!response.ok) {
            throw new Error('Incorrect email or password');
        }

        const data = await response.json();

        console.log(data);
        alert(`User ${data.data.name} successfully logged in!`);
        sessionStorage.setItem('name', data.data.name);
        sessionStorage.setItem('accessToken', data.data.accessToken);

        window.location.href = '../index.html';
    } catch (error) {
        console.error('Error', error);
        errorMessage.textContent = 'Incorrect email or password';
        errorMessage.style.display = 'block';
    }
});

// Register Function
registerBtn.addEventListener('click', async function () {
    const userName = registerUsername.value;
    const email = registerEmail.value;
    const password = registerPassword.value;
    const registerData = { name: userName, email: email, password: password }; // Ensure correct field names

    try {
        const response = await fetch(apiRegister, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(registerData),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);

        alert('User successfully registered! Please log in.');
        window.location.href = '../account/login.html';
    } catch (error) {
        console.error('Register error:', error);
    }
});

// Toggle between forms
const registerLink = document.getElementById('registerLink');
const loginLink = document.getElementById('loginLink');

registerLink.addEventListener('click', function(event) {
    event.preventDefault();
    loginFormElement.style.display = 'none';
    registerFormElement.style.display = 'flex';
});

loginLink.addEventListener('click', function(event) {
    event.preventDefault();
    registerFormElement.style.display = 'none';
    loginFormElement.style.display = 'flex';
});
