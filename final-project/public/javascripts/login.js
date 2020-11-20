function handleLogin(event) {
    let username=$("#username").val();
    let password=$("#password").val();


    $.post("/login",{"user": username, "password": password}, function(data){
        if (data==true){
                $.router.set('/');
                location.reload();
        } else {
            alert("incorrect password")
        }
      });

}

function returnHome(event) {
    $.router.set('/');
                location.reload();

}
 
 function doStuff() {
    $(document).on("click", "#login", handleLogin)
    $(document).on("click", "#cancelbtn", returnHome)

    
}
doStuff();