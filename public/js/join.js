const db = firebase.firestore();
var provider = new firebase.auth.GoogleAuthProvider();

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        $('.container').empty();
        console.log('이미 로그인되어 있습니다.')
        document.querySelector('.container').innerHTML = 
        "<h5>이미 로그인되어 있습니다.</h5><div class='btn_area'><button id='logout' class='btn btn-danger'>로그아웃하기</button></div>";
        $('#logout').on('click', function() {
            if (confirm('로그아웃하시겠습니까?')) {
                firebase.auth().signOut();
                alert('안녕히 가세요.')
                window.location.href = 'index.html'
            }
        });
    }
})



$('#register').on('click', function() {

    let userName = $('#name_new').val();
    let userEmail = $('#email_new').val();
    let userPw = $('#password_new').val();
    
    if (confirm(`${userEmail}로 가입을 진행합니다.`)) {
        firebase.auth().createUserWithEmailAndPassword(userEmail, userPw).then((person) => {
            return person.user.updateProfile({
                displayName: userName
            });
        }).then(function() {
            alert(`${userName} 님의 가입을 환영합니다.`);
            window.location.href = 'index.html';
        }).catch((error) => {
                alert('에러가 발생했습니다.')
                console.log('실패 사유는:', error)
            })
        }
})

$('#login_google').on('click', function() {
    if (confirm('구글 계정으로 로그인하시겠습니까?')) {
        firebase.auth().signInWithPopup(provider).then(function() {
            //var token = result.credential.accessToken;
            alert('구글 계정으로 로그인하셨습니다.')
            window.location.href = 'login.html'
        }).catch(function(error) {
            console.log('실패 사유는:', error)
            alert('오류가 발생했습니다.')
        })
    }
})

/* $('#login_apple').on('click', function() {
    if (confirm('애플 계정으로 로그인하시겠습니까?')) {
        firebase.auth().signInWithPopup(provider).then(function() {
            //var token = result.credential.accessToken;
            alert('구글 계정으로 로그인하셨습니다.')
            window.location.href = 'login.html'
        }).catch(function(error) {
            console.log('실패 사유는:', error)
            alert('오류가 발생했습니다.')
        })
    }
}) */

$(document).ready(function() {
    setTimeout(removeLoad, 500)
    function removeLoad() {
        $('div.load').hide();
    }
})
