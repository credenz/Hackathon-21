document.querySelector("#signout").addEventListener("click", () => {
    signOut();
  });
  
  const register = () => {
    const email = document.querySelector("#registrationEmail").value;
    const password = document.querySelector("#registrationPassword").value;
  
    if (email.trim() == "") {
      alert("Enter Email");
    } else if (password.trim().length < 7) {
      alert("Password must be at least 7 characters");
    } else if (email != reemail) {
      alert("emails do not match");
    } else {
      auth
        .createUserWithEmailAndPassword(email, password)
        .catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          alert(errorMessage);
          // ...
        });
    }
  };
  const name = document.querySelector("#institute").value;
  const number = document.querySelector("#registrationNumber").value;
  
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // Updates the user attributes:
  
      user
        .updateProfile({
          // <-- Update Method here
          instutue: name,
          phoneNumber: phone,
          // photoURL: "https://example.com/jane-q-user/profile.jpg",
        })
        .then(
          function () {
            // Profile updated successfully!
            //  "NEW USER NAME"
  
            var displayName = user.displayName;
            // "https://example.com/jane-q-user/profile.jpg"
            var photoURL = user.photoURL;
          },
          function (error) {
            // An error happened.
          }
        );
    }
  });
  
  document.querySelector("#register").addEventListener("click", () => {
    register();
  });
  
  //register when you hit the enter key
  document
    .querySelector("#registration-password")
    .addEventListener("keyup", (e) => {
      if (event.keyCode === 13) {
        e.preventDefault();
  
        register();
      }
    });
  
  const login = () => {
    const email = document.querySelector("#login-email").value;
    const password = document.querySelector("#login-password").value;
  
    if (email.trim() == "") {
      alert("Enter Email");
    } else if (password.trim() == "") {
      alert("Enter Password");
    } else {
      authenticate(email, password);
    }
  };
  
  document.querySelector("#login").addEventListener("click", () => {
    login();
  });
  
  //sign in when you hit enter
  document.querySelector("#login-password").addEventListener("keyup", (e) => {
    if (event.keyCode === 13) {
      e.preventDefault();
  
      login();
    }
  });
  
  const authenticate = (email, password) => {
    // const auth = firebase.auth();
    auth.signInWithEmailAndPassword(email, password);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
      });
  };
  
  const showHomepage = () => {
    document.querySelector("#registration-page").classList.add("hide");
    document.querySelector("#login-page").classList.add("hide");
    document.querySelector("#homepage").classList.remove("hide");
  };
  
  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(function () {
        location.reload();
      })
      .catch(function (error) {
        alert("error signing out, check network connection");
      });
  };
  
  auth.onAuthStateChanged((firebaseUser) => {
    if (firebaseUser) {
      showHomepage();
    }
  });
  
  document.querySelector("#forgot-password").addEventListener("click", () => {
    const email = document.querySelector("#login-email").value;
    if (email.trim() == "") {
      alert("Enter Email");
    } else {
      forgotPassword(email);
    }
  });
  
  const forgotPassword = (email) => {
    auth
      .sendPasswordResetEmail(email)
      .then(function () {
        alert("email sent");
      })
      .catch(function (error) {
        alert("invalid email or bad network connection");
      });
  };