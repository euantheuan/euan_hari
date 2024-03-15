const db = firebase.firestore();
const storage = firebase.storage();

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        let queryString = new URLSearchParams(window.location.search)

        db.collection('hari').doc(queryString.get('id')).get().then((result) => {
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
                            <div class="thispost">
                                <div class="title_area">
                                    <p class="title">${result.data().title}</p>
                                    <p class="writer">${result.data().writer}</p>
                                    <p class="date">${year}-${month}-${day} ${hour}:${min}:${sec}</p>
                                </div>
                                <p class="content">${result.data().content}</p>
                            </div>`;

                    $('.wrapper').append(post)
                } else {
                    let post = `
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
                            </div>`;
                    $('.wrapper').append(post)
                }
                
                if (result.data().uid == user.uid) {
                    console.log('내 글입니다.')
                    let btn = `
                                <div class='btn_area_modify'>
                                    <button type="button" class="btn btn-primary modify"><a href="/edit.html?id=${result.id}">수정</a></button>
                                    <button type="button" class="btn btn-danger delete" data-id='${result.id}'>삭제</button>
                                </div>`
                    document.querySelector('div.thispost').insertAdjacentHTML("afterend", btn)
                } else {
                    console.log('내 글이 아닙니다.')
                }

                $('.delete').on('click', function() {
                    let docId = $(this).data('id');

                    if (confirm('삭제하시겠습니까?')) {
                        db.collection('hari').doc(docId).delete().then(()=>{
                            alert('삭제되었습니다.')
                            window.location.href = 'hari.html'
                        }).catch((error) => {
                            console.log('게시글 삭제 중 에러가 발생했습니다:', error);
                            alert('게시글 삭제 중 에러가 발생했습니다.')
                        });
                    } else {
                        alert('취소하셨습니다.')
                    }
                })
        }).catch((error) => {
            console.log(error)
            alert('에러가 발생했습니다.')
        })
    } else {
        $('div.wrapper').empty();
        let signIn = "<p class='alert'>로그인 후 이용하세요.</p>"
        $('div.wrapper').append(signIn);
    }
})


