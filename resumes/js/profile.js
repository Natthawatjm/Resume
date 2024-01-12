const firstname = document.querySelector('#firstname');
const surname = document.querySelector('#surname');
const names = document.querySelector('#names');
const phone = document.querySelector('#phone');
const address = document.querySelector('#address');
const emails = document.querySelector('#emails');
const namess = document.querySelector('#namess');
const email = document.querySelector('#email');
const greeting = document.querySelector('.greeting');

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
        firstname.innerHTML = `${sessionStorage.fname}`
        surname.innerHTML = `${sessionStorage.lname}`
        names.innerHTML = `${sessionStorage.name}`
        phone.innerHTML = `${sessionStorage.phone}`
        address.innerHTML = `${sessionStorage.address}`
        emails.innerHTML = `${sessionStorage.email}`
        namess.innerHTML = `${sessionStorage.name}`
        email.innerHTML = `${sessionStorage.email}`

    }
}