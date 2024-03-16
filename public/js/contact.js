firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        $("#email").val(user.email);
    } else {
        $('div.container').empty();
        let signIn = "<div class='alert'><p><a href='login.html'>로그인 후 이용해주세요.</a></p></div>"
        $('div.container').append(signIn);
    }
})
