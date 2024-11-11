// Variable to store the selected background image URL
var backgroundImg = '';

function addingPost(){
    console.log("hdfjh");
    var title = document.getElementById("postTitle");
    var descript = document.getElementById("postDescription");
    var post = document.getElementById("postOutput");
console.log(title.value, descript.value)
if (title.value && descript.value){
    post.innerHTML += `<div class="card mt-3 card-bg border customBg">
    <div class="card-body">
        <h5 class="card-title fontStyle" id="previousTitle">${title.value}</h5>
        <p class="card-text fontStyle"  id="previousDescription">${descript.value}</p>
    </div>
    <div class="d-flex p-3 gap-2">
        <button type="button" class="btn btn-success border-white" onclick = "editPost()">Edit</button>
        <button type="button" class="btn btn-danger border-white" onclick = "deletepost(event)">Delete</button>
    </div>
</div>`
}
else {
    Swal.fire({
        title: "Title and description both are required!",
        icon: 'warning',
        customClass: {
            confirmButton: 'custom-confirm-button'
        },
        confirmButtonText: 'OK'
    });
}


title.value = "";
descript.value = "";
}

function deletepost(event){
    event.target.parentNode.parentNode.remove();
}


async function editPost(event) {
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
},1500)

}

function selectImg(url) {
	backgoundImg = url;
	var images = document.getElementsByClassName('bgImg');
	for (var i = 0; i < images.length; i++) {
		images[i].className = 'bgImg';
	}
	event.target.className += ' selectedImg';
}

// Function to handle background image selection
function selectImg(url) {
    var images = document.getElementsByClassName('bgImg');

    // Reset all images to remove the selected class
    for (var i = 0; i < images.length; i++) {
        images[i].className = 'bgImg';
    }

    // Set the selected image class
    event.target.className += ' selectedImg';

    // Get the element with the 'card-bg' class
    var cardElement = document.querySelector('.customBg');

    // Apply the selected background image or color
    if (url && cardElement) {
        cardElement.style.backgroundImage = `url(${url})`; // Set the background image
        cardElement.style.backgroundColor = ''; // Reset the background color if an image is selected
    } else if (cardElement) {
        cardElement.style.backgroundImage = ''; // Remove any existing background image
        cardElement.style.backgroundColor = 'grey'; // Set the background color to grey
    }
}

function onBtn(){
    selectImg();
}