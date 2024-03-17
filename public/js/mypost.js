const db = firebase.firestore();

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        db.collection('board').orderBy("date", "desc").onSnapshot((snapshot) => {
            snapshot.forEach((doc) => {
                if (doc.data().uid === user.uid) {
                    const timestamp = doc.data().date; 
                    const date = timestamp.toDate();
                    const [year, month, day, hour, min, sec] = [
                        date.getFullYear(),
                        ('0'+(date.getMonth() + 1)).slice(-2),
                        ('0' + date.getDate()).slice(-2),
                        ('0' + date.getHours()).slice(-2),
                        ('0' + date.getMinutes()).slice(-2),
                        ('0' + date.getSeconds()).slice(-2)
                        ];
                    let docId = doc.id;
                    if (!doc.data().image) {
                        let postmy = `<li class='post'>
                                        <div class="title_area">
                                            <p class="title"><a href="/detail.html?id=${docId}">${doc.data().title}</a></p>
                                            <p class="writer">${doc.data().writer} </p>
                                            <p class="date">${year}-${month}-${day} ${hour}:${min}:${sec}</p>
                                        </div>
                                        <p class="content">${doc.data().content}</p>
                                        <div class='btn_area'>
                                            <button type="button" class="modify">수정</button>
                                            <button type="button" class="delete" data-id='${doc.id}'>삭제</button>
                                        </div>
                                    </li>`;
                        $('ul#board').append(postmy)
                    } else {
                        const timestamp = doc.data().date; 
                        const date = timestamp.toDate();
                        const year = date.getFullYear();        
                        const month = ('0'+(date.getMonth() + 1)).slice(-2); 
                        const day = ('0' + date.getDate()).slice(-2); 
                        const hour = ('0' + date.getHours()).slice(-2);
                        const min = ('0' + date.getMinutes()).slice(-2)
                        const sec = ('0' + date.getSeconds()).slice(-2)
                        let postmy = `<li class='post'>
                                        <div class="title_area">
                                            <p class="title"><a href="/detail.html?id=${docId}">${doc.data().title}</a></p>
                                            <p class="writer">${doc.data().writer} </p>
                                            <p class="date">${year}-${month}-${day} ${hour}:${min}:${sec}</p>
                                        </div>
                                        <figure class='mw-100'>
                                            <img src="${doc.data().image}" class='thumbnail object-fit-contain border rounded'>
                                        </figure>
                                        <p class="content">${doc.data().content}</p>
                                        <div class='btn_area'>
                                            <button type="button" class="modify">수정</button>
                                            <button type="button" class="delete" data-id='${doc.id}'>삭제</button>
                                        </div>
                                    </li>`;
                        $('ul#board').append(postmy)
                    }
                };
            })
            
            $('.delete').on('click', function() {
                let docId = $(this).data('id');

                if (confirm('삭제하시겠습니까?')) {
                    db.collection('board').doc(docId).delete().then(()=>{
                        $(this).closest('.post').remove();
                        window.location.href = 'mypost.html'
                    }).catch((error) => {
                        console.log('게시글 삭제 중 에러가 발생했습니다:', error);
                        alert('게시글 삭제 중 에러가 발생했습니다.')
                    });
                } else {
                    alert('취소하셨습니다.')
                }
            })
            $("button.modify").click(()=>{
                window.location.href = `/edit.html?id=${doc.id}`
            })
        })
    } else {
        $('ul#board').remove();
        let signIn = "<div class='alert'><p><a href='login.html'>로그인 후 이용해주세요.</a></p></div>"
        $('div.wrapper').append(signIn)
    }
});
