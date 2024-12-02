import {
  where,
  limit,
  query,
  orderBy,
  serverTimestamp,
  onSnapshot,
  getDoc,
  getDocs,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getFirestore,
  setDoc,
  doc,
  collection,
  addDoc,
  db,
}
  from "./firebase.js"

// Variable to store the selected background image URL
// var backgroundImg = '';
// function addingPost(){
//     console.log("hdfjh");
//     var title = document.getElementById("postTitle");
//     var descript = document.getElementById("postDescription");
//     var post = document.getElementById("postOutput");
// console.log(title.value, descript.value)
// if (title.value && descript.value){
//     post.innerHTML += `<div class="card mt-3 card-bg border customBg">
//     <div class="card-body">
//         <h5 class="card-title fontStyle" id="previousTitle">${title.value}</h5>
//         <p class="card-text fontStyle"  id="previousDescription">${descript.value}</p>
//     </div>
//     <div class="d-flex p-3 gap-2">
//         <button type="button" class="btn btn-success border-white" onclick = "editPost()">Edit</button>
//         <button type="button" class="btn btn-danger border-white" onclick = "deletepost(event)">Delete</button>
//     </div>
// </div>`
// }
// else {
//     Swal.fire({
//         title: "Title and description both are required!",
//         icon: 'warning',
//         customClass: {
//             confirmButton: 'custom-confirm-button'
//         },
//         confirmButtonText: 'OK'
//     });
// }


// title.value = "";
// descript.value = "";
// }
// async function addingPost() {
// let addingPost = document.getElementById("posting");
// addingPost.addEventListener("click", async ()=>{
//   console.log("hi")
//   try {
//     //   console.log("hdfjh");
//     const docRef = await addDoc(collection(db, "users"), {

//       title: document.getElementById("postTitle"),
//       descript: document.getElementById("postDescription"),
//       post: document.getElementById("postOutput"),
//     });

//     console.log(title.value, descript.value);

//     // Check for empty values before adding to DOM
//     if (!title.value || !descript.value) {
//       throw new Error("Title and description are required!");
//     }

//     post.innerHTML += `<div class="card mt-3 card-bg border customBg">
//       <div class="card-body">
//           <h5 class="card-title fontStyle" id="previousTitle">${title.value}</h5>
//           <p class="card-text fontStyle"  id="previousDescription">${descript.value}</p>
//       </div>
//       <div class="d-flex p-3 gap-2">
//           <button type="button" class="btn btn-success border-white" onclick="editPost()">Edit</button>
//           <button type="button" class="btn btn-danger border-white" onclick="deletepost(event)">Delete</button>
//       </div>
//   </div>`;

//     title.value = "";
//     descript.value = "";


//     // name: name.value,
//     // phone: phone.value,
//     // address: address.value,
//     // cnic: cnic.value,
//     // age: age.value,
//     // hobbies: arrayUnion(...hobbies),
//     // time: serverTimestamp(),

//     console.log("Document written with ID: ", docRef.id);
//   } catch (error) {
//     // console.error("Error adding post:", error.message);
//     // You can also display an error message to the user here using Swal or another method
//     Swal.fire({
//       title: "Error",
//       text: error.message,
//       icon: 'error',
//       customClass: {
//         confirmButton: 'custom-confirm-button'
//       },
//       confirmButtonText: 'OK'
//     });
//   }
// })

let addingPost = document.getElementById("posting");

addingPost.addEventListener("click", async () => {
  console.log("hi");
  let titleValue = document.getElementById("postTitle").value;
  let descriptValue = document.getElementById("postDescription").value;
  let post = document.getElementById("postOutput");

  // let title = titleValue;
  // let descript = descriptValue;
  try {
    // ... other code ...



    // console.log(title, descript)

    // Check for empty values before adding to DOM

    if (titleValue && descriptValue) {
      post.innerHTML += `<div class="card mt-3 card-bg border customBg">
      <div class="card-body">
          <h5 class="card-title fontStyle" id="previousTitle">${titleValue}</h5>
          <p class="card-text fontStyle"  id="previousDescription">${descriptValue}</p>
      </div>
      <div class="d-flex p-3 gap-2">
          <button type="button" class="btn btn-success border-white" id="editPost">Edit</button>
          <button type="button" class="btn btn-danger border-white" id="deletePost">Delete</button>
      </div>
  </div>`;
    }
    else{
      Swal.fire({
                title: "Title and description both are required!",
                icon: 'warning',
                customClass: {
                    confirmButton: 'custom-confirm-button'
                },
                confirmButtonText: 'OK'
            });
    }

   

    const docRef = await addDoc(collection(db, "posts"), {
      title: titleValue,
      descript: descriptValue,
      // Other fields if needed
    });

    console.log("Document written with ID: ", docRef.id);

    titleValue = "";
    descriptValue = "";
  } catch (error) {
    // ... error handling
    Swal.fire({
      title: "Error",
      text: error.message,
      icon: 'error',
      customClass: {
        confirmButton: 'custom-confirm-button'
      },
      confirmButtonText: 'OK'
    });
  }
 


// function deletepost(event) {
  let deletingPost = document.getElementById("deletePost");
  deletingPost.addEventListener("click",(event)=> {
  event.target.parentNode.parentNode.remove();
})

let editingPost = document.getElementById("editPost");
editingPost.addEventListener("click", async ()=> {
  var previousTitle = document.getElementById('previousTitle');
  var previousDescription = document.getElementById('previousDescription');
  const { value: formValues } = await Swal.fire({
    title: 'Update Post',
    html: `
  <label>
  <strong>Title: </strong><br>
  <input id="swal-input1" class="swal2-input" value="${previousTitle.innerHTML}">
  </label>
  <label>
  <br>
  <strong>Description: </strong><br>
  <input id="swal-input2" class="swal2-input" value="${previousDescription.innerHTML}">
  </label>
  `,

    focusConfirm: false,
    customClass: {
      confirmButton: 'custom-confirm-button'  // Add a custom class for the button
    },

    focusConfirm: false,
    preConfirm: () => {
      return [document.getElementById('swal-input1').value, document.getElementById('swal-input2').value];
    },
  });

  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Post has been updated',
    showConfirmButton: false,
    timer: 1500,
  });
  setTimeout(function () {

    previousTitle.innerHTML = formValues[0];
    previousDescription.innerHTML = formValues[1];
  }, 1500)

})
});





// function selectImg(url) {
// 	backgoundImg = url;
// 	var images = document.getElementsByClassName('bgImg');
// 	for (var i = 0; i < images.length; i++) {
// 		images[i].className = 'bgImg';
// 	}
// 	event.target.className += ' selectedImg';
// }

// Function to handle background image selection
// function selectImg(url) {
//     var images = document.getElementsByClassName('bgImg');

//     // Reset all images to remove the selected class
//     for (var i = 0; i < images.length; i++) {
//         images[i].className = 'bgImg';
//     }

//     // Set the selected image class
//     event.target.className += ' selectedImg';

//     // Get the element with the 'card-bg' class
//     var cardElement = document.querySelector('.customBg');

//     // Apply the selected background image or color
//     if (url && cardElement) {
//         cardElement.style.backgroundImage = `url(${url})`; // Set the background image
//         cardElement.style.backgroundColor = ''; // Reset the background color if an image is selected
//     } else if (cardElement) {
//         cardElement.style.backgroundImage = ''; // Remove any existing background image
//         cardElement.style.backgroundColor = 'grey'; // Set the background color to grey
//     }
// }

// function onBtn(){
//     selectImg();
// }