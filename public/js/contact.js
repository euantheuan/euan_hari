firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        $("#email").val(user.email);
    } else {
        $('div.container').empty();
        let signIn = "<p class='alert'>로그인 후 이용하세요.</p>"
        $('div.container').append(signIn);
    }
})
