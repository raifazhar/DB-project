async function sendData() {

    let subject = document.getElementById("subj");
    let descript = document.getElementById("descr");

    let data = {
        subject: subject.value,
        descript: descript.value
    }

    let results = await fetch(url + "/api/custSup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "x-auth-token": localStorage.getItem("token")
        },
        body: JSON.stringify(data)
    });

    if (results.status == 200) {
        let response = await results.json();
        //console.log(response.msg);
        alert("Feedback submitted!");
    }
    else if (results.status == 401) {
        alert("Please log in again.");
        window.location.href = "../signUpPage/signup.html";
    }
    else {
        alert("Server error");
    }

}