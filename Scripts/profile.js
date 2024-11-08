import {
    getAuth,
    onAuthStateChanged,
    sendEmailVerification,
    updateProfile,
    signOut,
  } from "./firebase.js";
  
  const auth = getAuth();
  
  const Pages = {
    signin: "Pages/signin.html",
    profile: "Pages/profile.html",
    posts: "Pages/posts.html",
  };
  
  let profilePage = document.getElementById("profile-page");
  let userName = document.getElementById("name");
  console.log(userName);
  
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
                      <img src="${user.photoURL || '../Images/pfp-icon.jpeg'}"
                        alt="Generic placeholder image" class="img-fluid img-thumbnail mt-4 mb-2"
                        style="width: 150px; z-index: 1">
                      <button type="button" data-mdb-button-init data-mdb-ripple-init class="custom-btn btn btn-outline-dark text-body" id="updateProfile" data-mdb-ripple-color="dark" style="z-index: 1;">
                        Edit profile
                      </button>
                    </div>
                    <div class="ms-3" style="margin-top: 130px;">
                      <h5>${user.displayName || 'User'}</h5>
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
                        <p class="font-italic mb-1">Lives in Pakistan</p>
                        <p class="font-italic mb-1">Web Developer</p>
                      </div>
                    </div>
                    <div class="btns">
                      <button type="button" class="custom-btn btn btn-outline-dark text-body" id="verifyEmail">Verify your email</button>
                      <button type="button" class="custom-btn btn btn-outline-dark text-body" id="signOut">Sign Out</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      `;
  
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
        Swal.fire({
          title: "Submit your Github username",
          input: "text",
          inputAttributes: {
            autocapitalize: "off",
          },
          showCancelButton: true,
          confirmButtonText: "Look up",
          showLoaderOnConfirm: true,
          preConfirm: async (login) => {
            try {
              const githubUrl = `https://api.github.com/users/${login}`;
              const response = await fetch(githubUrl);
              if (!response.ok) {
                return Swal.showValidationMessage(`${JSON.stringify(await response.json())}`);
              }
              return response.json();
            } catch (error) {
              Swal.showValidationMessage(`Request failed: ${error}`);
            }
          },
          allowOutsideClick: () => !Swal.isLoading(),
        }).then((result) => {
          if (result.isConfirmed) {
            // Update the profile with the new display name and photo URL
            updateProfile(user, {
              displayName: result.value.login,
              photoURL: result.value.avatar_url,
            })
              .then(() => {
                Swal.fire({
                  title: "Profile updated successfully!",
                  imageUrl: result.value.avatar_url,
                  imageAlt: `${result.value.login}'s avatar`,
                });
                console.log("Profile updated successfully");
              })
              .catch((error) => {
                console.error("Error updating profile:", error);
                Swal.fire({
                  icon: "error",
                  title: "Failed to update profile",
                  text: error.message,
                });
              });
          }
        });
      });
  
      // Sign out
      document.getElementById("signOut").addEventListener("click", () => {
        signOut(auth).then(() => (location.href = "../index.html"));
      });
    } else {
      // No user is signed in, redirect to login
      location.href = "../index.html";
    }
  });
  