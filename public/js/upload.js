const db = firebase.firestore();
const storage = firebase.storage();

firebase.auth().onAuthStateChanged(function (user) {
    if (!user) {
        $('.container').empty().append("<div class='alert'><p><a href='login.html'>로그인 후 이용해주세요.</a></p></div>");
    }
});


$('#send').on('click', function () {
    const title = $('#title').val();
    const content = $('#content').val();
    const titleLength = title.length;
    const contentLength = content.length;

    if (titleLength && contentLength !== 0) {
        if (confirm('게시하시겠습니까? ')) {
            const currentUser = firebase.auth().currentUser;
            const userName = currentUser.displayName;
            const userID = currentUser.uid;
            const uploadPost = {
                title: title,
                content: content,
                date: new Date(),
                writer: userName,
                uid: userID
            };

            const uploadToFirestore = (post) => {
                db.collection('board').add(post)
                    .then((docRef) => {
                        db.collection('board').doc(docRef.id).collection('replies').doc().set({ initialReply: true });
                        alert('게시글을 저장했습니다.');
                        window.location.href = 'board.html';
                    })
                    .catch((err) => {
                        console.log(err);
                        alert('오류가 발생했습니다. 로그인은 하셨나요?');
                    });
            };

            if (!document.querySelector('#thumbnail').files[0]) {
                uploadToFirestore(uploadPost);
            } else {
                const file = document.querySelector('#thumbnail').files[0];
                const storageRef = storage.ref();
                const storagePath = storageRef.child('img/' + file.name);
                const uploadImg = storagePath.put(file);

                uploadImg.on('state_changed', null, (error) => {
                    console.log(error);
                    alert('에러가 발생했습니다.');
                }, () => {
                    uploadImg.snapshot.ref.getDownloadURL()
                        .then((url) => {
                            uploadPost.image = url;
                            uploadToFirestore(uploadPost);
                        });
                });
            }
        } else {
            alert('취소하셨습니다.');
        }
    } else {
        alert('제목과 본문을 모두 입력하세요.');
    }
});