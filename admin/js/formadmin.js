
const imgs = sessionStorage.getItem('image')
window.onload = () => {
    if (!sessionStorage.username) {
        location.href = '/loginadmin'
    } else {
        document.getElementById('images').src = imgs
    }
}

const logOut = document.querySelector('#logout');

logOut.onclick = () => {
    sessionStorage.clear();
    location.reload();
}