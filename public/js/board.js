const db = firebase.firestore();
const storage = firebase.storage();

firebase.auth().onAuthStateChanged(function(user) {
    if (!user) {
        $("div.btn_area").remove();
    }
})


$("button.upload").click(()=> {
    window.location.href = 'uploadboard.html'
})

db.collection('board').orderBy("date", "asc").onSnapshot((snapshot) => {
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
        let docId = doc.id;
        const board = document.querySelector('ul#board');

        if (!doc.data().image) {
            let post = `<li class='post'>
                            <div class="title_area">
                                <p class="title" data-id="${docId}"><a href="/detail.html?id=${docId}">${doc.data().title}</a></p>
                                <p class="writer">${doc.data().writer} </p>
                                <p class="date">${year}-${month}-${day} ${hour}:${min}:${sec}</p>
                            </div>
                        </li>`;

            board.insertAdjacentHTML('afterbegin', post);
            
        } else {
            let post = `<li class='post'>
                            <div class="title_area">
                                <p class="title" data-id="${docId}"><a href="/detail.html?id=${docId}"><i class="fa-regular fa-file-image"></i> ${doc.data().title}</a></p>
                                <p class="writer">${doc.data().writer} </p>
                                <p class="date">${year}-${month}-${day} ${hour}:${min}:${sec}</p>
                            </div>
                        </li>`;


            board.insertAdjacentHTML('afterbegin', post);
        }
        const repliesRef = db.collection('board').doc(docId).collection('replies')
        repliesRef.get().then((snapshot) => {
            const numSnapshot = snapshot.size;
            if (numSnapshot > 1) {
                const postTitle = board.querySelector(`.title[data-id="${docId}"]`);
                const num = `<span class='num'>+ ${numSnapshot -1}</span>`
                postTitle.insertAdjacentHTML('beforeend', num);
            }
        }).catch((error)=>{
            console.log(error)
        })
    })

})


