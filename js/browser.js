
url = "http://localhost:3000";
console.log(url)

const searchbutton=document.querySelector('#search')
searchbutton.addEventListener('click',function()
    {
        const inputValue = document.getElementById("searchtext").value;
        search(inputValue)
    }
)

fetch(url + "/api/browser",{
    method: "GET"
    
})
.then(async(response)=>{
    if(response.status==200)
    {
          reorganizebrowser(response)
    }
})



function search(string)
{
    console.log(string)
    fetch("http://localhost:3000" + "/api/search?searchstring=" + string,{
      method: "GET",
      headers:{"Content-Type": "application/json;charset=UTF-8"}
    })
    .then(async(response)=>{
        if(response.status==200)
        {
            reorganizebrowser(response)
        }
    })
    
}    

async function reorganizebrowser(response)
{
    const browsercontainer=document.querySelector('#grid-container')
    while (browsercontainer.hasChildNodes()) {
        browsercontainer.removeChild(browsercontainer.firstChild);
      }
      
    let responsejson = await response.json();
    console.log(responsejson);
    responsejson.forEach((element) => {
        var browserli = document.createElement('li');
        var browsertitle =document.createElement('div');
        browsertitle.classList.add('broswercell-textcontainer');
        browsertitle.innerHTML=`<a href="" class="browsercell-title">${element.title}</a>`
        var browserimg=document.createElement('img');
        browserimg.setAttribute('src',element.url);
        browserimg.classList.add('browsercell-image')
        browserli.appendChild(browsertitle)
        browserli.appendChild(browserimg)
        console.log(element.pictureID)
        browserli.setAttribute('data-picture-id',element.pictureID);
        browserli.addEventListener('click',function(){getpage(element.pictureID)})
        console.log(browserli)
        browsercontainer.appendChild(browserli)
    });
}
// function getpage(id)
// {
//     fetch(url+"/api/palace",
//     {
//         method:"GET",
//         body:{pictureID:id}
//     })
//     .then(async(response)=>{
//         if(response.status==200)
//         {
//             let responsejson = await response.json();
//         }
//     })
//     console.log(id);
// }