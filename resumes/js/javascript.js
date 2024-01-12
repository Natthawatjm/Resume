function test() {
    var fname = document.getElementById("fname").value;
    var lname = document.getElementById("lname").value;
    var skill = document.getElementById("sk").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var education = document.getElementById("education").value;
    var ctemail = document.getElementById("ctemail").value;
    var ctphone = document.getElementById("ctphone").value;
    var line = document.getElementById("lines").value;
    var address = document.getElementById("address").value;
    var major = document.getElementById("major").value;

    localStorage.setItem('frname', fname)
    localStorage.setItem('lname', lname)
    localStorage.setItem('skill', skill)
    localStorage.setItem('email', email)
    localStorage.setItem('phone', phone)
    localStorage.setItem('education', education)
    localStorage.setItem('ctemail', ctemail)
    localStorage.setItem('ctphone', ctphone)
    localStorage.setItem('line', line)
    localStorage.setItem('address', address)
    localStorage.setItem('major', major)


    const imgPath = document.querySelector('input[type=file]').files[0];
    const reader = new FileReader();

    reader.addEventListener("load", function() {
        // convert image file to base64 string and save to localStorage
        localStorage.setItem("image", reader.result);
    }, false);

    if (imgPath) {
        reader.readAsDataURL(imgPath);
    }
}

function display() {
    let fname = localStorage.getItem('frname');
    let lname = localStorage.getItem('lname');
    let skill = localStorage.getItem('skill');
    let email = localStorage.getItem('email');
    let phone = localStorage.getItem('phone');
    let educt = localStorage.getItem('education');
    let img = localStorage.getItem('image')
    let ctemail = localStorage.getItem('ctemail');
    let ctphone = localStorage.getItem('ctphone');
    let line = localStorage.getItem('line');
    let address = localStorage.getItem('address');
    let major = localStorage.getItem('major');


    document.getElementById("temp").innerHTML = fname;
    document.getElementById("a").innerHTML = lname;
    document.getElementById("b").innerHTML = skill;
    document.getElementById("c").innerHTML = email;
    document.getElementById("phone").innerHTML = phone;
    document.getElementById("edct").innerHTML = educt;
    document.getElementById("image").src = img;
    document.getElementById("ctemail").innerHTML = ctemail;
    document.getElementById("ctphone").innerHTML = ctphone;
    document.getElementById("line").innerHTML = line;
    document.getElementById("address").innerHTML = address;
    document.getElementById("major").innerHTML = major;


}

function reset() {
    localStorage.removeItem("fname");
    localStorage.removeItem("lname");
    localStorage.removeItem("skill");
    localStorage.removeItem("email");
    localStorage.removeItem("image");
    localStorage.removeItem("phone");
    localStorage.removeItem("education");
    localStorage.removeItem("ctemail");
    localStorage.removeItem("ctphone");
    localStorage.removeItem("line");
    localStorage.removeItem("address");
    localStorage.removeItem("major");
    display();
}

display();

const greeting = document.querySelector('.greetings');
window.onload = () => {
    greeting.innerHTML = `${sessionStorage.email}`

}