function handleSignup(event) {
    
    event.preventDefault();
    event.stopPropagation();

    let username=$("#username").val();
    let password=$("#password").val();
    
    $.ajax({
        url: '/signup',
        type: 'POST',
        data: {"username": username, "password": password},
        dataType: 'json',
        success: function(response, textStatus, jqXHR) {

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
                  alrt("Incorrect Username or Password")
               }
             });
        },
        error: function(jqXHR, textStatus, errorThrown){
          alert("Username Not Available");
       }
     });

}

function returnHome(event) {
    $.router.set('/');
                location.reload();

}
 
 function doStuff() {
    $(document).on("click", "#register", handleSignup)
    $(document).on("click", "#cancelbtn", returnHome)

    
}

doStuff();