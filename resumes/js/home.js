const greeting = document.querySelector('.greeting');

const error = document.querySelector('.error');
const logOut = document.querySelector('.logout');

logOut.onclick = () => {
    sessionStorage.clear();
    location.reload();
}

window.onload = () => {
    if (!sessionStorage.name) {
        location.href = '/pleaselogin'
    } else {
        greeting.innerHTML = `${sessionStorage.name}`
    }
}