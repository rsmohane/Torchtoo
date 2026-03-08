// JavaScript source code
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'GrtAutomation' && password === 'Grt@Auto369') {
        document.getElementById('message').innerText = 'Login Successful!';
    } else {
        document.getElementById('message').innerText = 'Invalid Credentials!';
    }
}
