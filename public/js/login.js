const db = firebase.firestore();
var provider = new firebase.auth.GoogleAuthProvider();

$('#login').on('click', function() {
    let loginEmail = $('#email_login').val();
    let loginPw = $('#password_login').val();

    if (confirm(`${loginEmail}으로 로그인하시겠습니까?`)) {
        firebase.auth().signInWithEmailAndPassword(loginEmail, loginPw).then(() => {
            alert('환영합니다.')
            window.location.href = 'index.html'
        }).catch(function(error) {
            alert('오류가 발생했습니다. 다시 시도하세요.')
            console.log(error)
        })
    } else {
        alert('취소하셨습니다.')
    }
})


firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        $('.container').empty();
        document.querySelector('.container').innerHTML = 
        "<h5>이미 로그인되어 있습니다.</h5><div class='btn_area_added'><button id='logout' class='btn btn-danger'>로그아웃하기</button></div>";
        $('#logout').on('click', function() {
            if (confirm('로그아웃하시겠습니까?')) {
                firebase.auth().signOut();
                alert('안녕히 가세요.')
                window.location.href = 'index.html'
            } else {
                alert('취소하셨습니다.')
            }
        });
    }
})

$('#login_google').on('click', function() {
    if (confirm('구글 계정으로 로그인하시겠습니까?')) {
        firebase.auth().signInWithPopup(provider).then(function() {
            //var token = result.credential.accessToken;
            alert('구글 계정으로 로그인하셨습니다.')
            window.location.href = 'index.html'
        }).catch(function(error) {
            console.log('실패 사유는:', error)
            alert('오류가 발생했습니다.')
        })
    } else {
        alert('취소하셨습니다.')
    }
})