const db = firebase.firestore();
let queryString = new URLSearchParams(window.location.search)
let postId = queryString.get('id')

db.collection('hari').doc(postId).get().then((result) => {
     $('#title').val(result.data().title);
     $('#content').val(result.data().content);
})

$('#modify').click(function() {
     let changed = {
          title: $('#title').val(),
          content: $('#content').val()
     };

     if (confirm('수정하시겠습니까?')) {
          if (!document.querySelector('#thumbnail').files[0]) {
               db.collection('hari').doc(postId).update(changed).then(() => {
                    alert('수정되었습니다.')
                    windogit w.location.href = `/detail.html?id=${postId}`
               }).catch((error) => {
                    console.log(error)
                    alert('에러가 발생했습니다.')
               })
          } else {
               const file = document.querySelector('#thumbnail').files[0];
               const storageRef = storage.ref();
               const storagePath = storageRef.child('img/' + file.name);
               const uploadImg = storagePath.put(file);
     
               changed.img = uploadImg
     
               db.collection('hari').doc(postId).update(changed).then(()=>{
     
               }).catch((error) => {
                    console.log(error)
                    alert('에러가 발생했습니다.')
               })
          }
     }
     
     
})