const db = firebase.firestore();
let queryString = new URLSearchParams(window.location.search)
let postId = queryString.get('id')

db.collection('board').doc(postId).get().then((result) => {
    $('#title').val(result.data().title);
    $('#content').val(result.data().content);
})

$('#modify').click(function() {
    let changed = {
        title: $('#title').val(),
        content: $('#content').val()
    };

    function updateToFirestore(changed) {
        db.collection('board').doc(postId).update(changed).then(() => {
            alert('수정되었습니다.')
            window.location.href = `/detail.html?id=${postId}`
        }).catch((error) => {
            console.log(error)
            alert('에러가 발생했습니다.')
        })
    }

    if (confirm('수정하시겠습니까?')) {
        if (!document.querySelector('#thumbnail').files[0]) {
            updateToFirestore(changed)
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
                        changed.image = url;
                        updateToFirestore(changed);
                });
            });
        }
    }
    
    
})