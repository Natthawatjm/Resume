const greeting = document.querySelector('.greeting');
const img = sessionStorage.getItem('image')
window.onload = () => {
    if (!sessionStorage.username) {
        location.href = '/loginadmin'
    } else {
        greeting.innerHTML = `Hello ${sessionStorage.username}`
        document.getElementById('profiles').src = img
    }
}

const logOut = document.querySelector('#logout');

logOut.onclick = () => {
    sessionStorage.clear();
    location.reload();
}