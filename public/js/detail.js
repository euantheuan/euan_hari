const db = firebase.firestore();
const storage = firebase.storage();

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        let queryString = new URLSearchParams(window.location.search)

        db.collection('board').doc(queryString.get('id')).get().then((result) => {
            const timestamp = result.data().date; 
                const date = timestamp.toDate();
                const [year, month, day, hour, min, sec] = [
                                                            date.getFullYear(),
                                                            ('0'+(date.getMonth() + 1)).slice(-2),
                                                            ('0' + date.getDate()).slice(-2),
                                                            ('0' + date.getHours()).slice(-2),
                                                            ('0' + date.getMinutes()).slice(-2),
                                                            ('0' + date.getSeconds()).slice(-2)
                                                            ];
                if (!result.data().image) {
                    let post = `
                            
                        <div class="mainPost">
                            <div class="thispost">
                                <div class="title_area">
                                    <p class="title">${result.data().title}</p>
                                    <p class="writer">${result.data().writer}</p>
                                    <p class="date">${year}-${month}-${day} ${hour}:${min}:${sec}</p>
                                </div>
                                <p class="content">${result.data().content}</p>
                            </div>
                            <div class='replyInput'>
                                <textarea class="form-control" rows="2"></textarea>
                                <button type="button" id="btnReply" class="btn btn-warning">답글 달기</button>
                            </div>
                        </div>`;
                    $('.wrapper').append(post)
                } else {
                    let post = `
                                <div class="mainPost">
                                    <div class="thispost">
                                        <div class="title_area">
                                            <p class="title"><i class="fa-regular fa-file-image"></i> ${result.data().title}</p>
                                            <p class="writer">${result.data().writer}</p>
                                            <p class="date">${year}-${month}-${day} ${hour}:${min}:${sec}</p>
                                        </div>
                                        <figure class='mw-100'>
                                            <img src="${result.data().image}" class='thumbnail object-fit-contain border rounded'>
                                        </figure>
                                        <p class="content">${result.data().content}</p>
                                    </div>
                                    <div class='replyInput'>
                                        <textarea class="form-control" rows="2"></textarea>
                                        <button type="button" id="btnReply" class="btn btn-warning">댓글 달기</button>
                                    </div>
                                </div>
                            `;
                    $('.wrapper').append(post)
                }

                
                
                if (result.data().uid == user.uid) {
                    let btn = `
                                <div class='btn_area_modify'>
                                    <button type="button" class="modify">수정</button>
                                    <button type="button" class="delete" data-id='${result.id}'>삭제</button>
                                </div>`
                    document.querySelector('div.wrapper').insertAdjacentHTML("beforeend", btn)
                    $('button.modify').click(()=> {
                        window.location.href = `/edit.html?id=${result.id}`
                    })
                }

                const mainPostId = result.id
                const checkReplies = function() {
                    const repliesRef = db.collection('board').doc(mainPostId).collection('replies');
                    repliesRef.orderBy("date", "asc").onSnapshot((snapshot) => {
                        if (snapshot.size > 0) {
                            snapshot.forEach((doc) => {
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
                                //댓글 본문 밑에 보여주기
                                let reply = `
                                    <div class="thisreply">
                                        <div class="reply">
                                            <div class="reply_content">
                                                <p class="content_reply">${doc.data().content}</p>
                                                <p class="writer_reply">${doc.data().writer}</p>
                                                <p class="date_reply">${year}-${month}-${day} ${hour}:${min}:${sec}</p>
                                            </div>
                                        </div>
                                        <div class='replyOrDelete'>
                                            <textarea class="form-control rereplyInput" rows="1"></textarea>
                                            <button class='rereply' data-id="${doc.id}">답글</button>
                                        </div>
                                        <div class='rereply_area'></div>
                                    </div>`;
                                const mainPost = document.querySelector('.mainPost')
                                mainPost.insertAdjacentHTML('afterend', reply)

                                if (doc.data().uid == user.uid) {
                                    const btnDeleteReply = `<button class="btnDeleteReply" data-id="${doc.id}">삭제</button>`
                                    document.querySelector('.reply').insertAdjacentHTML('beforeend', btnDeleteReply)

                                    $(".btnDeleteReply").click(function() {
                                        let docId = $(this).data('id');
                        
                                        if (confirm('삭제하시겠습니까?')) {
                                            db.collection('board').doc(mainPostId).collection('replies').doc(docId).delete().then(() => {
                                                alert('삭제되었습니다.')
                                                location.reload(true);
                                            }).catch((error) => {
                                                console.log('게시글 삭제 중 에러가 발생했습니다:', error);
                                                alert('게시글 삭제 중 에러가 발생했습니다.')
                                            });
                                        }
                                    })
                                }

                                const checkRereplies = function() {
                                    const rerepliesRef = db.collection('board').doc(mainPostId).collection('replies').doc(doc.id).collection('rereplies');
                                    rerepliesRef.orderBy("date", "asc").onSnapshot((snapshot) => {
                                        if (snapshot.size > 0) {
                                            snapshot.forEach((doc) => {
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
                                                //댓글 본문 밑에 보여주기
                                                let rereply = `
                                                    <div class="thisrereply">
                                                        <div class="rereply">
                                                            <div class="rereply_content">
                                                                <p class="content_rereply">${doc.data().content}</p>
                                                                <p class="writer_rereply">${doc.data().writer}</p>
                                                                <p class="date_rereply">${year}-${month}-${day} ${hour}:${min}:${sec}</p>
                                                            </div>
                                                        </div>
                                                    </div>`;
                                                const rereply_area = document.querySelector('.rereply_area')
                                                rereply_area.insertAdjacentHTML('beforeend', rereply)
                
                                                if (doc.data().uid == user.uid) {
                                                    const btnDeleteRereply = `<button class="btnDeleteRereply" data-id="${doc.id}">삭제</button>`
                                                    document.querySelector('.thisrereply').insertAdjacentHTML('beforeend', btnDeleteRereply)
                
                                                    $(".btnDeleteRereply").click(function() {
                                                        let docId = $(this).data('id');
                                        
                                                        if (confirm('삭제하시겠습니까?')) {
                                                            db.collection('board').doc(mainPostId).collection('replies').doc(docId).delete().then(() => {
                                                                alert('삭제되었습니다.')
                                                                location.reload(true);
                                                            }).catch((error) => {
                                                                console.log('게시글 삭제 중 에러가 발생했습니다:', error);
                                                                alert('게시글 삭제 중 에러가 발생했습니다.')
                                                            });
                                                        }
                                                    })
                                                }
                                            })
                                        }
                                    })
                                }
                                checkRereplies()

                                $("button.rereply").click(function() {
                                    const replyId = $(this).data('id');
                                    const content = $("textarea.rereplyInput").val();
                                    const currentUser = firebase.auth().currentUser;
                                    const userName = currentUser.displayName;
                                    const userID = currentUser.uid;
                                    const rereplyPost = {
                                        content: content,
                                        date: new Date(),
                                        writer: userName,
                                        uid: userID
                                    };
                                    console.log(replyId, content, rereplyPost)
                                    function uploadRereply() {
                                        const rerepliesRef = db.collection('board').doc(queryString.get('id')).collection('replies').doc(replyId).collection('rereplies');
                                        rerepliesRef.add(rereplyPost).then(() => {
                                            alert('저장합니다.')
                                            location.reload(true);
                                        }).catch((error) => {
                                            alert('에러가 발생했습니다.')
                                            console.log(error)
                                        })
                                    }
                                    uploadRereply();
                                })
                            });
                        }
                    })
                
                }
            checkReplies()

            

            $('.delete').on('click', function() {
                let docId = $(this).data('id');

                if (confirm('삭제하시겠습니까?')) {
                    db.collection('board').doc(docId).delete().then(()=>{
                        alert('삭제되었습니다.')
                        window.location.href = 'board.html'
                    }).catch((error) => {
                        console.log('게시글 삭제 중 에러가 발생했습니다:', error);
                        alert('게시글 삭제 중 에러가 발생했습니다.')
                    });
                }
            })

            $("#btnReply").click(function() {
                const content = $("div.replyInput > textarea").val();
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
                    const repliesRef = db.collection('board').doc(queryString.get('id')).collection('replies');
                    repliesRef.add(replyPost).then((rereply) => {
                        db.collection('board').doc(queryString.get('id')).collection('replies').doc(rereply.id).collection('rereplies').doc().set({initialField: true});
                        location.reload(true);
                    }).catch((error) => {
                        alert('에러가 발생했습니다.')
                        console.log(error)
                    })
                }
                uploadReply();

            })
            
        }).catch((error) => {
            console.log(error)
            alert('에러가 발생했습니다.')
        })
    } else {
        $('div.wrapper').empty();
        let signIn = "<div class='alert'><p><a href='login.html'>로그인 후 이용해주세요.</a></p></div>"
        $('div.wrapper').append(signIn);
    }
})


