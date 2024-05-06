var box1div1 = document.getElementById("SignInForm");
var box1div2 = document.getElementById("LogInButton");
var box2div1 = document.getElementById("inputformdiv");
var box2div2 = document.getElementById("SignUpFormButton");

box1div2.style.display = 'none'
box2div1.style.display = 'none'

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
}

function RightClick(){
    fadeOutAndToggle(box1div1,true);
    fadeOutAndToggle(box1div2,false);
    fadeOutAndToggle(box2div1,false);
    fadeOutAndToggle(box2div2,true);
}