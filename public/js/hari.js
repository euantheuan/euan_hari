const db = firebase.firestore();
const storage = firebase.storage();

db.collection('hari').orderBy("date", "asc").onSnapshot((snapshot) => {
    snapshot.forEach((doc) => {
        const timestamp = doc.data().date; 
        const date = timestamp.toDate();
        const year = date.getFullYear();        
        const month = ('0'+(date.getMonth() + 1)).slice(-2); 
        const day = ('0' + date.getDate()).slice(-2); 
        const hour = ('0' + date.getHours()).slice(-2);
        const min = ('0' + date.getMinutes()).slice(-2)
        const sec = ('0' + date.getSeconds()).slice(-2)
        let docId = doc.id;

        if (!doc.data().image) {
            let post = `<li class='post'>
                            <div class="title_area">
                                <p class="title"><a href="/detailhari.html?id=${docId}">${doc.data().title}</a></p>
                                <p class="writer">${doc.data().writer} </p>
                                <p class="date">${year}-${month}-${day} ${hour}:${min}:${sec}</p>
                            </div>
                            <p class="content">${doc.data().content}</p>
                        </li>`;

            const board = document.querySelector('ul#board')
            board.insertAdjacentHTML('afterbegin', post);
            
        } else {
            let post = `<li class='post'>
                            <div class="title_area">
                                <p class="title"><a href="/detailhari.html?id=${docId}"><i class="fa-regular fa-file-image"></i> ${doc.data().title}</a></p>
                                <p class="writer">${doc.data().writer} </p>
                                <p class="date">${year}-${month}-${day} ${hour}:${min}:${sec}</p>
                            </div>
                            <figure class='mw-100'>
                                <img src="${doc.data().image}" class='thumbnail object-fit-contain border rounded'>
                            </figure>
                            <p class="content">${doc.data().content}</p>
                        </li>`;

            const board = document.querySelector('ul#board')
            board.insertAdjacentHTML('afterbegin', post);
        }
    })
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            if (user.uid == 'OUGroZYMhXaRNR7fHlInY7qfzNR2' || '6LcuB5b1Ebb69mbwNlaNCFDdIA53') {
                let btn = `<div class="btn_area">
                                <button type="button" class="btn btn-warning"><a href="uploadhari.html">글 작성하기</a></button>
                            </div>`
                
                document.querySelector('ul#board').insertAdjacentHTML('beforebegin', btn);
            }
        }
    })
})


