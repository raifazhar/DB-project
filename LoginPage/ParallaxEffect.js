var ParallaxObject = document.getElementById("Parallax");

ParallaxObject.addEventListener("mousemove",(e)=>{

    var rect = ParallaxObject.getBoundingClientRect();
    var CenterX = rect.left + rect.width/2;
    var CenterY = rect.top + rect.height/2;

    ParallaxObject.querySelectorAll(".Object").forEach(function(move){
        var moving_value = move.getAttribute("data-value");

        var xDistance = e.clientX - CenterX;
        var yDistance = e.clientY - CenterY;
        
        var x = xDistance * moving_value;
        var y = yDistance * moving_value;

        move.style.transform = "translateX(" + x + "%) translateY(" + y + "%)";
    })
});