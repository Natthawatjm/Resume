let addCard = document.getElementById("addCard");
let displayCard = document.getElementById("displayCard");
let loadingCard = document.getElementById("loadingCard");
let downloadCard = document.getElementById("downloadCard");
let fileInput = document.getElementById("fileInput");
let imageBefore = document.getElementById("display-img");
let startBtn = document.getElementById("startBtn");
let imageAfter = document.querySelector(".image-after");
let imageBeforeSM = document.querySelector(".image-before");
let uploadAnother = document.getElementById("uploadAnother");
let downloadHref = document.getElementById("downloadHref");

const reader = new FileReader();
const formData = new FormData();
let file = null;
const API_URL = "https://api.remove.bg/v1.0/removebg";
const API_KEY = "1pWRtuMRtQBMCLtvTcDQ3kCS";

const activeScreen = (screen) => {
    addCard.style.display = "none";
    displayCard.style.display = "none";
    loadingCard.style.display = "none";
    downloadCard.style.display = "none";
    screen.style.display = "flex";
};

activeScreen(addCard);

fileInput.addEventListener("input", () => {
    file = fileInput.files[0];
    reader.readAsDataURL(file);
    reader.onloadend =() => {
       // console.log(reader.result);
        imageBefore.src = reader.result;
        imageBeforeSM.src = reader.result;
    };
    activeScreen(displayCard);
});

startBtn.addEventListener("click",() => {
    formData.append("image_file", file);
    activeScreen(loadingCard);
    fetch(API_URL, {
        method: "POST",// Method => GET - POST
        headers: {
            "X-Api-Key": API_KEY,
        },
        body: formData,
    })
    .then((res) => res.blob())
    .then((blob) => {
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
            imageAfter.src = reader.result;
            downloadHref.setAttribute("href", reader.result);
        };
        activeScreen(downloadCard);
    });
});

uploadAnother.addEventListener("click",() => {
    window.location.reload();
});


const selectImage = document.querySelector('.select-image');
const inputFile = document.querySelector('#file');
const imgArea = document.querySelector('.img-area');

selectImage.addEventListener('click', function () {
	inputFile.click();
})

inputFile.addEventListener('change', function () {
	const image = this.files[0]
	if(image.size < 2000000) {
		const reader = new FileReader();
		reader.onload = ()=> {
			const allImg = imgArea.querySelectorAll('img');
			allImg.forEach(item=> item.remove());
			const imgUrl = reader.result;
			const img = document.createElement('img');
			img.src = imgUrl;
			imgArea.appendChild(img);
			imgArea.classList.add('active');
			imgArea.dataset.img = image.name;
		}
		reader.readAsDataURL(image);
	} else {
		alert("Image size more than 2MB");
	}
})