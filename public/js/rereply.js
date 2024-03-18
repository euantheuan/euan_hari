$("button.rereply").click(()=>{
    const replyId = $(this).data('id')
    const content = $("div.rereplyInput > textarea").val();
    const currentUser = firebase.auth().currentUser;
    const userName = currentUser.displayName;
    const userID = currentUser.uid;
    const replyPost = {
        content: content,
        date: new Date(),
        writer: userName,
        uid: userID
    };
    function uploadReply() {
        const repliesRef = db.collection('board').doc(queryString.get('id')).collection('replies').doc(replyId).collection('rereplies');
        repliesRef.add(replyPost).then(() => {
            location.reload(true);
        }).catch((error) => {
            alert('에러가 발생했습니다.')
            console.log(error)
        })
    }
    uploadReply();
})