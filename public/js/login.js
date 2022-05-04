
function login() {

	const username = $("#username").val()

    console.log("the user chosen is: " + username)

    $.post(
        "/login", {
            username: username,
            forter_token: localStorage.getItem("forter_token")
    })
    .done(function( data ) {

        console.log("response from Forter:")

        console.dir(data)

    })
}

function select_user(username) {
    $("#username").val(username)
}