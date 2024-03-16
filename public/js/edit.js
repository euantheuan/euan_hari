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
    db.collection('board').doc(postId).update(changed).then(() => {
        alert('수정되었습니다.')
        window.location.href = `/detail.html?id=${postId}`
    }).catch((error) => {
        console.log(error)
        alert('에러가 발생했습니다.')
    })
})