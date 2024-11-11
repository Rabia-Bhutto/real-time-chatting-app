import {
    getAuth,
    onAuthStateChanged,
    sendEmailVerification,
    updateProfile,
    signOut,
  } from "./firebase.js";
  
  const auth = getAuth();
  
  const Pages = {
    signin: "signin.html",
    profile: "profile.html",
    posts: "posts.html",
  };
  
  let profilePage = document.getElementById("profile-page");
  // let userName = document.getElementById("name");
  // console.log(userName);
  
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in
      profilePage.innerHTML = `
        <section class="h-100 gradient-custom-2">
          <div class="container py-5 h-100">
            <div class="row d-flex justify-content-center">
              <div class="col col-lg-9 col-xl-8">
                <div class="card">
                  <div class="rounded-top text-white d-flex flex-row" style="background-color: #000; height:200px;">
                    <div class="ms-4 mt-5 d-flex flex-column" style="width: 150px;">
                      <img src="${user.profilePicture || '../Images/pfp-icon.jpg'}"
                        alt="Generic placeholder image" class="img-fluid img-thumbnail mt-4 mb-2"
                        style="width: 150px; z-index: 1">
                      <button type="button" data-mdb-button-init data-mdb-ripple-init class="custom-btn btn btn-outline-dark text-body" id="updateProfile" data-mdb-ripple-color="dark" style="z-index: 1;">
                        Edit profile
                      </button>
                    </div>
                    <div class="ms-3" style="margin-top: 130px;">
                      <h5>${user.username || 'User'}</h5>
                      <p>${user.email}</p>
                    </div>
                  </div>
                  <div class="p-4 text-black bg-body-tertiary">
                    <div class="d-flex justify-content-end text-center py-1 text-body">
                      <div>
                        <p class="mb-1 h5">253</p>
                        <p class="small text-muted mb-0">Photos</p>
                      </div>
                      <div class="px-3">
                        <p class="mb-1 h5">1026</p>
                        <p class="small text-muted mb-0">Followers</p>
                      </div>
                      <div>
                        <p class="mb-1 h5">478</p>
                        <p class="small text-muted mb-0">Following</p>
                      </div>
                    </div>
                  </div>
                  <div class="card-body p-4 text-black">
                    <div class="mb-5 text-body">
                      <p class="lead fw-normal mb-1">About</p>
                      <div class="p-4 bg-body-tertiary">
                        ${user.aboutInfo || 'Write your about info here'}
                      </div>
                    </div>
                    <div class="btns">
                      <button type="button" class="custom-btn btn btn-outline-dark text-body" id="verifyEmail">Verify your email</button>
                      <button type="button" class="custom-btn btn btn-outline-dark text-body" id="signOut">Sign Out</button>
                    </div>
                    
                    <div class="">
                    <button type="button" class="w-100 mt-2 custom-btn btn btn-outline-dark text-body" id="posting">Make a post</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      `;

      document.getElementById("posting").addEventListener("click", function() {
        window.location.href = "posts.html";
      });  
  
      // Add event listener for email verification
      document.getElementById("verifyEmail").addEventListener("click", () => {
        if (user) {
          sendEmailVerification(user)
            .then(() => {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Verification email sent!",
                showConfirmButton: false,
                timer: 1500,
              });
            })
            .catch((error) => {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.message,
              });
            });
        } else {
          Swal.fire({
            icon: "warning",
            title: "No user signed in",
            text: "Please sign in to verify your email.",
          });
        }
      });
  
      // Update user profile
      document.getElementById("updateProfile").addEventListener("click", function () {
        // Swal.fire({
        //   title: "Edit Profile",
        //   text: "Profile Picture:"
        //   input: "file",
        //   text: "Username:"
        //   input: "text",
        //   text: "About:"
        //   input: "text",
        //   inputAttributes: {
        //     autocapitalize: "off",
        //   },
        //   showCancelButton: true,
        //   confirmButtonText: "Look up",
        //   showLoaderOnConfirm: true,
        //   preConfirm: async (login) => {
        //     try {
        //       const githubUrl = `https://api.github.com/users/${login}`;
        //       const response = await fetch(githubUrl);
        //       if (!response.ok) {
        //         return Swal.showValidationMessage(`${JSON.stringify(await response.json())}`);
        //       }
        //       return response.json();
        //     } catch (error) {
        //       Swal.showValidationMessage(`Request failed: ${error}`);
        //     }
        //   },
        //   allowOutsideClick: () => !Swal.isLoading(),
        // }).then((result) => {
        //   if (result.isConfirmed) {
        //     // Update the profile with the new display name and photo URL
        //     updateProfile(user, {
        //       displayName: result.value.login,
        //       photoURL: result.value.avatar_url,
        //     })
        //       .then(() => {
        //         Swal.fire({
        //           title: "Profile updated successfully!",
        //           imageUrl: result.value.avatar_url,
        //           imageAlt: `${result.value.login}'s avatar`,
        //         });
        //         console.log("Profile updated successfully");
        //       })
        //       .catch((error) => {
        //         console.error("Error updating profile:", error);
        //         Swal.fire({
        //           icon: "error",
        //           title: "Failed to update profile",
        //           text: error.message,
        //         });
        //       });
        //   }
        // });

        Swal.fire({
          title: "Submit your details",
          html: `
          <div class="text-start"> 
            <p class="fw-bold mb-0 file-input-label">Profile Picture</p>
            <input type="file" id="profilePicture" class="swal2-input file-input" id="fileInput" accept="image/*">
            <p class="fw-bold mb-0">Username</p>
            <input type="text" id="username" class="swal2-input">
            <p class="fw-bold mb-0">About</p>
            <textarea id="aboutInfo" class="swal2-textarea"></textarea>
            </div>
          `,
          showCancelButton: true,
          confirmButtonText: "Submit",
          showLoaderOnConfirm: true,
          preConfirm: async () => {
            const profilePicture = Swal.getPopup().querySelector("#profilePicture").files[0];
            const username = Swal.getPopup().querySelector("#username").value;
            const aboutInfo = Swal.getPopup().querySelector("#aboutInfo").value;
        
            if (!username || !aboutInfo || !profilePicture) {
              Swal.showValidationMessage("Please fill out all fields, including a profile picture.");
              return;
            }
        
            // Validate the file type and size
            if (!["image/jpeg", "image/png", "image/gif"].includes(profilePicture.type)) {
              Swal.showValidationMessage("Please upload a valid image file (JPEG, PNG, or GIF).");
              return;
            }
            if (profilePicture.size > 2 * 1024 * 1024) { // 2MB size limit
              Swal.showValidationMessage("Profile picture must be less than 2MB.");
              return;
            }
        
            return { username, aboutInfo, profilePicture };
          },
          allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
          if (result.isConfirmed) {
            const reader = new FileReader();

            reader.onload = (e) => {
              // Update the profile with new details
              const updatedUserData = {
                userName: result.value.username,
                aboutInfo: result.value.aboutInfo,
                profilePictureUrl: e.target.result, // Base64 image URL
              };
              
              // Update the elements on your page with new data
              document.getElementById("profilePicture").src = updatedUserData.profilePictureUrl;
              document.getElementById("username").textContent = updatedUserData.userName;
              document.getElementById("aboutInfo").textContent = updatedUserData.aboutInfo;
            };
        
            reader.readAsDataURL(result.value.profilePicture);
          }
        });
        
      });
    }
  })
      // Sign out
  //     document.getElementById("signOut").addEventListener("click", () => {
  //       console.log("hi")
  //       signOut(auth).then(() => (location.href = "Pages.signin"));
  //     });
  //   } else {
  //     // No user is signed in, redirect to login
  //     location.href = "Pages.signin";
  //   }
  // });


  // Swal.fire({
  //   title: "Submit your details",
  //   html: `
  //     <div class="text-start"> 
  //       <p class="fw-bold mb-0 file-input-label">Profile Picture</p>
  //       <input type="file" id="profilePicture" class="swal2-input file-input" accept="image/*">
  //       <p class="fw-bold mb-0">Username</p>
  //       <input type="text" id="username" class="swal2-input">
  //       <p class="fw-bold mb-0">About</p>
  //       <textarea id="aboutInfo" class="swal2-textarea"></textarea>
  //     </div>
  //   `,
  //   showCancelButton: true,
  //   confirmButtonText: "Submit",
  //   showLoaderOnConfirm: true,
  //   preConfirm: async () => {
  //     const profilePicture = Swal.getPopup().querySelector("#profilePicture").files[0];
  //     const username = Swal.getPopup().querySelector("#username").value;
  //     const aboutInfo = Swal.getPopup().querySelector("#aboutInfo").value;
  
  //     if (!username || !aboutInfo || !profilePicture) {
  //       Swal.showValidationMessage("Please fill out all fields, including a profile picture.");
  //       return;
  //     }
  
  //     // Validate the file type and size
  //     if (!["image/jpeg", "image/png", "image/gif"].includes(profilePicture.type)) {
  //       Swal.showValidationMessage("Please upload a valid image file (JPEG, PNG, or GIF).");
  //       return;
  //     }
  //     if (profilePicture.size > 2 * 1024 * 1024) { // 2MB size limit
  //       Swal.showValidationMessage("Profile picture must be less than 2MB.");
  //       return;
  //     }
  
  //     return { username, aboutInfo, profilePicture };
  //   },
  //   allowOutsideClick: () => !Swal.isLoading()
  // }).then((result) => {
  //   if (result.isConfirmed) {
  //     const reader = new FileReader();
  
  //     reader.onload = (e) => {
  //       // Update the profile with new details
  //       const updatedUserData = {
  //         userName: result.value.username,
  //         aboutInfo: result.value.aboutInfo,
  //         profilePictureUrl: e.target.result, // Base64 image URL
  //       };
        
  //       // Update the elements on your page with new data
  //       document.getElementById("profilePictureDisplay").src = updatedUserData.profilePictureUrl;
  //       document.getElementById("usernameDisplay").textContent = updatedUserData.userName;
  //       document.getElementById("aboutInfoDisplay").textContent = updatedUserData.aboutInfo;
  //     };
  
  //     reader.readAsDataURL(result.value.profilePicture);
  //   }
  // });

 
 
  



  // STYLING ON THE FILE INPUT BUTTON 

  // const fileInput = document.getElementById('fileInput');
  // const fileNameDisplay = document.querySelector('.file-name');

  // // Update file name display on file selection
  // fileInput.addEventListener('change', (event) => {
  //     const fileName = event.target.files[0] ? event.target.files[0].name : 'No file chosen';
  //     fileNameDisplay.textContent = fileName;
  // });

  // // Trigger file input when clicking the custom button
  // document.querySelector('.custom-file-label').addEventListener('click', () => {
  //     fileInput.click();
  // });