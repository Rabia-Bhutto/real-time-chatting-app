import { getAuth, createUserWithEmailAndPassword } from "./firebase.js";

const auth = getAuth();

const Pages = {
  signin: "Pages/signin.html",
  profile: "Pages/profile.html",
  posts: "Pages/posts.html"
};


let email = document.getElementById("signupEmail");
let password = document.getElementById("signupPassword");
let regbtn = document.getElementById("registerBtn");
regbtn.addEventListener("click",()=>{
    if(signupEmail.value.trim() && signupPassword.value.trim()){
        createUserWithEmailAndPassword(auth, signupEmail.value, signupPassword.value)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
         console.log(errorMessage);
         switch (errorMessage){
          case "Firebase: Error (auth/email-already-in-use).":
           console.log("use another email");
           break;
         }
        });
        window.location.href = Pages.signin;
    }
    else{
        console.log("insert your data");
        
    }
})
