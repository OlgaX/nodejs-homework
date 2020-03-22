// variables

const userName = document.getElementById('userName');
const userEmail = document.getElementById('userEmail');
const userPassword = document.getElementById('userPassword');
const submit = document.getElementById('submit');
const output = document.getElementById('output');

// listeners

submit.addEventListener('click', login);

// login

function login() {
    const body = {
        name: userName.value,
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

    fetch('/registration', options).then((res) => res.json()).then((data) => {
        output.innerHTML = `${data}. Please, <a href="/login">login</a>`;
    });
}