window.onload = () => {
    if (sessionStorage.name) {
        location.href = '/home';
    }
}
const back = document.querySelector(".back");
const submitBtn = document.querySelector('.submit-btn');
const register = document.querySelector('.register');
const email = document.querySelector('#email');
const name = document.querySelector('.name') || null;
if (name == null) {
    submitBtn.addEventListener('click', () => {
        fetch('/login-user', {
                method: 'post',
                headers: new Headers({ 'Content-Type': 'application/json' }),
                body: JSON.stringify({
                    email: email.value,
                })
            })
            .then(res => res.json())
            .then(data => {
                validateData(data);
            })
    })
}


const validateData = (data) => {
    if (email.value != data) {
        document.getElementById('error').innerHTML = "ข้อมูลผิดพลาด ";
    }
    if (data.name) {
        sessionStorage.name = data.name;
        sessionStorage.email = data.email;
        sessionStorage.fname = data.fname;
        sessionStorage.lname = data.lname;
        sessionStorage.address = data.address;
        sessionStorage.phone = data.phone;
        location.href = '/home';
    }
}

register.onclick = () => {
    location.href = '/register'
}

back.onclick = () => {
    location.href = '/pleaselogin'
}