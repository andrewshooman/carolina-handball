function handleLogin(event) {
    event.preventDefault();
    event.stopPropagation();

    let username=$("#username").val();
    let password=$("#password").val();

    $.ajax({
        url: '/login',
        type: 'POST',
        data: {"username": username, "password": password},
        dataType: 'json',
        success: function(response, textStatus, jqXHR) {
            $.router.set('/');
            location.reload();
        },
        error: function(jqXHR, textStatus, errorThrown){
          alert("Incorrect Username or Password")
       }
     });

    // $.post("/login",{"username": username, "password": password}, function(data, status){
    //     console.log(data)
    //     if (data==true){
    //             
    //     } else {
    //         $.router.set('/');

    //         console.log("failed password")
    //     }
    //   });

}

function returnHome(event) {
    $.router.set('/');
                location.reload();

}
 
 function doStuff() {
    $(document).keypress(function(e) {
        if(e.which == 13) {
            handleLogin(e)
        }
    });


    $(document).on("click", "#login", handleLogin)
    $(document).on("click", "#cancelbtn", returnHome)

  
    
}
doStuff();