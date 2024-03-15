firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        $("#email").val(user.email);
    } else {
        $('div.container').empty();
        let signIn = "<p class='alert'>로그인 후 이용하세요.</p>"
        $('div.container').append(signIn);
    }
})


    window.formbutton=window.formbutton||function(){(formbutton.q=formbutton.q||[]).push(arguments)};
    /* customize formbutton below*/     
    formbutton("create", {
        action: "https://formspree.io/f/mwkgqgqn",
        title: "How can we help?",
        fields: [
        { 
            type: "email", 
            label: "이메일:", 
            name: "email",
            required: true,
            placeholder: "your@email.com"
        },
        {
            type: "textarea",
            label: "건의사항:",
            name: "message",
            placeholder: "불편하신 점이라도 있나요?",
        },
        { type: "submit" }      
        ]
    });