// Get the URL of the current page
const urlplace = new URL(window.location.href);

// Get the value of a specific query parameter
const id = urlplace.searchParams.get('id');
//console.log(id); // Output: The value of the 'id' query parameter

 fetch("http://localhost:3000" + "/api/placepage?pageid="+id,{
     method: "GET",
    headers:{"Content-Type": "application/json;charset=UTF-8"}
    })
    .then(async(response)=>{
        if(response.status==200)
        {
            
        }
    })
