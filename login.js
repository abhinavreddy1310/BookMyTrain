function login(){

    const username =
    document.getElementById(
        "username"
    ).value;

    const password =
    document.getElementById(
        "password"
    ).value;

    if(
        username === "Abhinav Reddy" &&
        password === "181911"
    ){

        window.location.href =
        "index.html";

    }else{

        alert(
        "Invalid Username or Password"
        );
    }
}