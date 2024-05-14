var modalDiv = document.getElementById("myModal");
var modalContentDiv = document.getElementById("modal-content");
const starDiv = document.getElementById("StarDiv");
const inputDiv = document.getElementById("InputDiv");
const radios = inputDiv.querySelectorAll("input[type='radio']");
const labels = starDiv.querySelectorAll("label");

const SubmitButton = document.getElementById("ReviewSubmit");

function OnAddReviewButtonClick(){
    modalDiv.style.display = "block";
}
window.onclick = function (event) {
    if (event.target == modalDiv) {
      modalDiv.style.display = "none";
    }
};

SubmitButton.addEventListener("click",()=>{
    modalDiv.style.display = "none";
});


let checkedIndex;

radios.forEach((radio, index) => {
    radio.addEventListener("mouseover", function() {
        resetStars(); // Reset stars class
        fillStars(index); // Fill stars up to hovered star
    });
});

inputDiv.addEventListener("mouseleave", function() {
    resetStars(); // Reset stars class when mouse leaves the star area
});
starDiv.addEventListener("mouseleave", function() {
    resetStars(); // Reset stars class when mouse leaves the star area
});

function fillStars(index) {
    for (let i = 0; i <= index; i++) {
        labels[i].classList.remove("fa-star-o");
        labels[i].classList.add("fa-star"); // Add class to fill stars up to the hovered star
    }
}

function resetStars() {
    labels.forEach(label => {
        label.classList.remove("fa-star");
        label.classList.add("fa-star-o"); // Remove class from all stars
    });
    // If a radio button is checked, fill stars up to that point
    checkedIndex = Array.from(radios).findIndex(radio => radio.checked);
    if (checkedIndex !== -1) {
        fillStars(checkedIndex);
    }
}

//checkedIndex is correct but the calue is not updated the moment we want to get it so call this function to get updated

radios.forEach((radio) => {
    radio.addEventListener("change",()=>{
        checkedIndex = Array.from(radios).findIndex(radio => radio.checked);
    });
});