function save() {
    $.ajax({
        method: 'post',
        url: 'http://localhost:4200/api/login',
        data: {
            fname: $("#fnames").val(),
            lname: $("#lnames").val(),
            name: $("#names").val(),
            phone: $("#phones").val(),
            address: $("#addresss").val(),
            email: $("#emails").val()
        },
        success: (response) => {
            Swal.fire({
                icon: 'success',
                title: 'Register successfully'
            })
            console.log('good', response)
        },
        error: (err) => {
            console.log('bad', err)
        }
    })
}

const login = document.querySelector('.login');


login.onclick = () => {
    location.href = '/login'
}