const db = firebase.firestore();
const storage = firebase.storage();


$('#send').on('click', function () {
    let title = $('#title').val();
    let content = $('#content').val();
    let titlelength = title.length;
    let contentlength = content.length;
    if (titlelength&&contentlength !== 0) {
        if (confirm('게시하시겠습니까? ')) {
            let userName = firebase.auth().currentUser.displayName;
            let userID = firebase.auth().currentUser.uid;


                if (!document.querySelector('#thumbnail').files[0]) {
                    let uploadPost = {
                        title: title,
                        content: content,
                        date: new Date(),
                        writer: userName,
                        uid: userID,
                    };
                    db.collection('board').add(uploadPost).then(function() {
                        alert('게시글을 저장했습니다.');
                        window.location.href = 'board.html';
                    }).catch((err)=>{
                        console.log(err);
                        alert('오류가 발생했습니다. 로그인은 하셨나요?');
                    })
                } else {
                    let file = document.querySelector('#thumbnail').files[0];
                    let storageRef = storage.ref();
                    let storagePath = storageRef.child('img/' + file.name)
                    let uploadImg = storagePath.put(file);
        
                    uploadImg.on('state_changed', null, (error) => {
                        console.log(error)
                        alert('에러가 발생했습니다.')
                    }, () => {
                        uploadImg.snapshot.ref.getDownloadURL().then((url) => {
                            console.log('업로드된 경로는', url)
                            let uploadPost = {
                                title: $('#title').val(),
                                content: $('#content').val(),
                                date: new Date(),
                                writer: userName,
                                uid: userID,
                                image: url
                            };
                            db.collection('board').add(uploadPost).then(function() {
                                alert('게시글을 저장했습니다.');
                                window.location.href = 'board.html';
                            }).catch((err)=>{
                                console.log(err);
                                alert('오류가 발생했습니다. 로그인은 하셨나요?');
                            })
                        })
                    })
                }
        } else {
            alert('취소하셨습니다.');
        };
    } else {
        alert('제목과 본문을 모두 입력하세요.')
    }
});

firebase.auth().onAuthStateChanged(function(user) {
    if (!user) {
        $('.container').empty();
        let alert = '<h5>로그인 후 이용하세요.</h5>'
        $('.container').append(alert)
    }
});