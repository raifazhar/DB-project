var box1div1 = document.getElementById("SignInForm");
var box1div2 = document.getElementById("LogInButton");
var box2div1 = document.getElementById("inputformdiv");
var box2div2 = document.getElementById("SignUpFormButton");

var box1 = document.getElementById("LogInFormBG");
var box2 = document.getElementById("SignUpFormBG");

box1div2.style.display = 'none'
box2div1.style.display = 'none'

box1.style.backgroundColor = "rgba(0,0,0,0.65)";
box2.style.backgroundColor = "rgba(100,100,100,0.75)";

function fadeOutAndToggle(element,fadeOut) {
    if(fadeOut){
        element.style.transition = "opacity 0.5s";
        element.style.opacity = "0";

        setTimeout(() => {
            element.style.display = "none";
        }, 400); // Wait for 500 milliseconds (same duration as the fade-out transition)
    }
    else{
        element.style.display = 'block';
        
        element.style.opacity = "0";

        setTimeout(()=>{
            element.style.transition = "opacity 0.5s";
            element.style.opacity = "1";
        },200);
    }
}


function LeftClick(){
    fadeOutAndToggle(box1div1,false);
    fadeOutAndToggle(box1div2,true);
    fadeOutAndToggle(box2div1,true);
    fadeOutAndToggle(box2div2,false);

    // let opacity = 0;
    // const intervalID = setInterval(() => {
    //     opacity += 0.05;
    //     if (opacity >= 0.65) {
    //         clearInterval(intervalID); // Stop the interval when opacity reaches 1
    //     }
    //     box1.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;
    //     if(opacity <= 0.75){
    //         box2.style.backgroundColor = `rgba(100,100,100, ${opacity})`;
    //     }
    // }, 25); // Adjust the interval duration (e.g., 100 milliseconds)

    swapPositions();
}

function RightClick(){
    fadeOutAndToggle(box1div1,true);
    fadeOutAndToggle(box1div2,false);
    fadeOutAndToggle(box2div1,false);
    fadeOutAndToggle(box2div2,true);

    let opacity = 0;
    // const intervalID = setInterval(() => {
    //     opacity += 0.05;
    //     if (opacity >= 0.65) {
    //         clearInterval(intervalID); // Stop the interval when opacity reaches 1
    //     }
    //     box2.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;
    //     if(opacity <= 0.75){
    //         box1.style.backgroundColor = `rgba(100,100,100, ${opacity})`;
    //     }
    // }, 25); // Adjust the interval duration (e.g., 100 milliseconds)

    swapPositions();
}

let isSwapped = false; // Initialize a flag to track the current state

function swapPositions() {
    // Get the current positions of box1 and box2
    const box1Rect = box1.getBoundingClientRect();
    const box2Rect = box2.getBoundingClientRect();

    // Calculate the difference in x-coordinates
    const dx = box2Rect.left - box1Rect.left;

    // Apply the transition to both boxes
    box1.style.transition = "transform 0.5s";
    box2.style.transition = "transform 0.5s";

    if (isSwapped) {
        // Move box1 to the original position
        box1.style.transform = "translateX(0)";
        // Move box2 to the original position
        box2.style.transform = "translateX(0)";
    } else {
        // Move box1 to the position of box2
        box1.style.transform = `translateX(${dx}px)`;
        // Move box2 to the position of box1
        box2.style.transform = `translateX(-${dx}px)`;
    }

    // Toggle the flag
    isSwapped = !isSwapped;
}