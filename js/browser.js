
url = "http://localhost:3000";
console.log(url)
fetch(url + "/api/browser",{
    method: "GET"
    
})
.then(async(response)=>{
    if(response.status==200)
    {
            const browsercontainer=document.querySelector('#grid-container')
            let responsejson = await response.json();
            
            responsejson.forEach((element) => {
                var browserli = document.createElement('li');
                var browsertitle =document.createElement('div');
                browsertitle.classList.add('broswercell-textcontainer');
                browsertitle.innerHTML=`<a href="" class="browsercell-title">${element.title}</a>`
                var browserimg=document.createElement('img');
                browserimg.setAttribute('src',element.url);
                browserimg.classList.add('browsercell-image')
                console.log(element.title)
                console.log(element.url)
                browserli.appendChild(browsertitle)
                browserli.appendChild(browserimg)
                browserli.setAttribute('id',responsejson.pictureID);
                console.log(browserli)
                browsercontainer.appendChild(browserli)
            });
            
        }
    })