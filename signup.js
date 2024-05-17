let firstname = document.getElementById("fname");
let lastname = document.getElementById("lname");
let email = document.getElementById("email");
let password = document.getElementById("pass");
let conpassword = document.getElementById("confpass");
let phonenumber = document.getElementById("pnumber");


let responseDataSign;
let responseDataLogin;

const userEmail = getCookie('user_id');

if (userEmail) {
    const userEmailDisplay = document.getElementById("userEmailDisplay");
    if (userEmailDisplay) {
        userEmailDisplay.textContent = userEmail;
    }

    document.getElementById("logoutBtn").style.display = "block";
    document.getElementById("loginBtn").style.display = "none";
} else {
    document.getElementById("logoutBtn").style.display = "none";
    document.getElementById("loginBtn").style.display = "block";

}

function logout() {
    document.cookie = "user_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "user_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    document.getElementById("logoutBtn").style.display = "none";

    document.getElementById("loginBtn").style.display = "block";

    window.location = "sign-up.html"; 
}


document.getElementById("signup-form").style.display = "block";
document.getElementById("login-form").style.display = "none";

document.querySelector(".tablinks[data-form='signup-form']").classList.add("active");

function openForm(formName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }
    document.getElementById(formName).style.display = "block";
    event.currentTarget.classList.add("active");
}

function submitForm() {
    event.preventDefault();

    var Data = {
        FirstName: firstname.value,
        LastName: lastname.value,
        Email: email.value,
        Password: password.value,
        ConfirmPassword: conpassword.value,
        PhoneNumber: phonenumber.value,
     
    };

    fetch("http://localhost/webproject/form.php", {
        method: "POST",
        body: JSON.stringify({ Data: Data }),
    })
        .then((response) => {
            return response.text();
        })
        .then((data) => {
            responseDataSign = data;
            updateHTML();
        })
        .catch(function (error) {
            console.log(error);
        });
}

function updateHTML() {
    if (responseDataSign === "Registration successful") {
        document.getElementById("success-message").textContent = responseDataSign;
        document.getElementById("error-message").textContent = "";
    } else {
        document.getElementById("error-message").textContent = responseDataSign;
        document.getElementById("success-message").textContent = "";
    }
}

function submitLoginForm() {
    event.preventDefault();

    var Data = {
        Email: document.getElementById("login-email").value,
        Password: document.getElementById("login-password").value,
    };

    fetch("http://localhost/webproject/login.php", {
        method: "POST",
        credentials: 'include',
        body: JSON.stringify({ Data: Data }),
    })
        .then((response) => {
            return response.text();
        })
        .then((data) => {
            responseDataLogin = data;
            updateLoginHTML();
        })
        .catch(function (error) {
            console.log(error);
        });
}

function updateLoginHTML() {
    if (responseDataLogin === "Login successful") {
        document.getElementById("success-message-login").textContent = responseDataLogin;
        document.getElementById("error-message-login").textContent = "";
        window.location = "home.html";
    } else {
        document.getElementById("error-message-login").textContent = responseDataLogin;
        document.getElementById("success-message-login").textContent = "";
    }
}

function getCookie(cookieName) {
    var name = cookieName + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var cookieArray = decodedCookie.split(';');
    for (var i = 0; i < cookieArray.length; i++) {
      var cookie = cookieArray[i].trim();
      if (cookie.indexOf(name) === 0) {
        return decodeURIComponent(cookie.substring(name.length, cookie.length));
      }
    }
    return null;
  }