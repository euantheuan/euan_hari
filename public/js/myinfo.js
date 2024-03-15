const db = firebase.firestore();
const user = firebase.auth().currentUser;

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {

        $("#name").val(user.displayName);
        $("#email").val(user.email);
        $("#pw").val(user.password)

        $("#modify").click(function() {

            const name = $("#name").val();
            const email = $("#email").val();

            user.updateProfile({
                displayName: name
            }).then(() => {
                user.updateEmail(email)
                .then(() => {
                    alert('업데이트되었습니다.')
                    window.location.href = 'index.html'
                }).catch((error) => {
                    console.log(error)
                    alert('에러가 발생했습니다.')
                });
            })
        })
        
        

        $("#pw").click(function() {
            if (confirm('비밀번호 재설정 링크를 메일로 보내드립니다.')) {
                firebase.auth().sendPasswordResetEmail(user.email)
                .then(() => {
                    alert('메일을 보냈습니다.')
                })
                .catch((error) => {
                    console.log(error)
                    alert('에러가 발생했습니다.')
                });
            } else {
                alert('비밀번호 재설정을 취소하셨습니다.')
            }
        })

    } else {
        $('div.container').empty();
        let signIn = "<p class='alert'>로그인 후 이용하세요.</p>"
        $('div.container').append(signIn);
    }
})

