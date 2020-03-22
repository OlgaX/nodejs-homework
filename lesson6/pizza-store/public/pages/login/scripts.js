// variables

const userEmail = document.getElementById('userEmail');
const userPassword = document.getElementById('userPassword');
const submit = document.getElementById('submit');
const output = document.getElementById('output');

// listeners

submit.addEventListener('click', login);

// login

function login() {
    const body = {
        email: userEmail.value,
        password: userPassword.value,
    };

    const options = {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
        }
    };

    fetch('/login', options).then((res) => res.json()).then((data) => {
        if (data.token) {
            localStorage.setItem('token', data.token);
            location.href = '/order-page';
        } else {
            output.innerText = data;
        }
    });
}
