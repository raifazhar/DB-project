const btns=document.querySelectorAll(".nav-button");
const slider=document.querySelectorAll(".videoslider");
document.getElementsByClassName(".videoslider").addEventListener('ended',updatevideo,false)
var count=0;
var slidernav=function(manual)
{  

    btns.forEach((btn)=>{
        btn.classList.remove("active");
    })
    slider.forEach((slide)=>{
        slide.classList.remove("active");
    })
    count=manual;
    btns[manual].classList.add("active");
    slider[manual].classList.add("active");

}

btns.forEach((btn,i)=>{
    btn.addEventListener("click",()=>{slidernav(i);});
});

function updatevideo(e)
{   
    count++;
    count=count%5;
    slidernav(count);
}


