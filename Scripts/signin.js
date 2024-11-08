import { signInWithEmailAndPassword ,getAuth} from "./firebase.js";


const auth = getAuth();

const Pages = {
    signin: "Pages/signin.html",
    profile: "Pages/profile.html",
    posts: "Pages/posts.html"
  };

let signInPassword = document.getElementById("signInPassword")
let  signInEmail = document.getElementById("signInEmail")

let loginBtn = document.getElementById("loginBtn")

loginBtn.addEventListener("click", () => {
  if (signInEmail.value.trim() && signInPassword.value.trim()) {
      signInWithEmailAndPassword(auth, signInEmail.value, signInPassword.value)
      .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          window.location.href = "Pages.profile";
      })
      .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage);
      });
  } else {
      console.log("insert your data");
  }
});

document.getElementById("signinForm").addEventListener("submit", function (event) {
  location.href = "Pages.profile";
});