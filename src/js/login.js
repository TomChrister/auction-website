const api = 'https://v2.api.noroff.dev/auth/login'
const loginBtn = document.getElementById('loginBtn');
const mail = document.getElementById('email');
const password = document.getElementById('password');
const errorMessage = document.getElementById('errorMessage');

loginBtn.onclick = function authorize() {
    const mailValue = mail.value;
    const pwdValue = password.value;
    const postData = {
        email: mailValue,
        password: pwdValue,
    };

    fetch(api, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Incorrect email or password');
            }
            return response.json();
        })
        .then(data => {
            window.alert(`User ${data.data.name} successfully logged in!`);
            sessionStorage.setItem('accessToken', data.data.accessToken);
            window.location.href = '../index.html';
        })
        .catch(error => {
            console.error('Error', error);
            errorMessage.textContent = 'Incorrect email or password';
            errorMessage.style.display = 'block';
        })
}
