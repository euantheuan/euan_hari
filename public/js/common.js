firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        let userName = firebase.auth().currentUser.displayName;
        document.querySelector('header h5').innerHTML = 
        `<span>${userName}</span> 님 환영합니다.`
        document.querySelector('.gnb_area > ul.depth01 > li:last-child > ul.depth02 > li:nth-child(3) > a').innerHTML = '<i class="fa-solid fa-right-from-bracket"></i> 로그아웃'
    }
})

$('div.mobile').click(function() {
    $(this).toggleClass('on off');
    if ($(this).hasClass('on')) {
        $('div.gnb_area').animate({
            left: '-100%'
        });
    } else {
        $('div.gnb_area').animate({
            left: 0
        });
    }
})

$('li.mypage').click(function() {
    $(this).toggleClass('off on')
    $('li.mypage > ul.depth02').slideToggle();
})