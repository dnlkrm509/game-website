/*
 Use local storage data to fill in list of modal ranking table
*/

// Get data from local storage and store it in variables
let isLoggedin = localStorage.getItem("isLoggedin");

let users = JSON.parse(localStorage.getItem("users")) || [];
let loggedinUser = JSON.parse(localStorage.getItem("loggedinUser"));

let length = users.length;

const userName = document.getElementsByClassName("username");

const fallbackIndex = document.getElementById("fallback-index");

const registerBtn = document.getElementsByClassName("btn gap active")[0];
const loginBtn = document.getElementsByClassName("btn gap")[0];

const card = document.getElementsByClassName("card")[0];
const registerDiv = document.getElementById("register");
const loginDiv = document.getElementById("login");

const registerNameInput = document.getElementById("register-name");
const registerEmailInput = document.getElementById("register-email");
const registerPhoneInput = document.getElementById("register-phone");
const registerAddressInput = document.getElementById("register-address");
const registerPasswordInput = document.getElementById("register-password");

const registerNameError = document.getElementById("register-name-error");
const registerEmailError = document.getElementById("register-email-error");
const registerPhoneError = document.getElementById("register-phone-error");
const registerPasswordError = document.getElementById("register-password-error");
const registerError = document.getElementById("register-error");

const loginEmailError = document.getElementById("login-email-error");
const loginPasswordError = document.getElementById("login-password-error");
const loginError = document.getElementById("login-error");

const loginEmailInput = document.getElementById("login-email");
const loginPasswordInput = document.getElementById("login-password");

if ((window.location.href.match('index.html') != null)) {
    if(isLoggedin == "true") {
        fallbackIndex.style.display = "none";
        window.open("game.html", "_self");
    } else {
        fallbackIndex.style.display = "block";
    }
    registerNameInput.addEventListener('keydown', name_verify);
    registerPhoneInput.addEventListener('keydown', phone_verify);

    registerEmailInput.addEventListener('keydown', email_verify);
    loginEmailInput.addEventListener('keydown', email_verify);

    registerPasswordInput.addEventListener('keydown', password_verify);
    loginPasswordInput.addEventListener('keydown', password_verify);
}

var userState = document.getElementsByClassName("user-state")[0];


if ((window.location.href.match('users.html') != null)) {
    if(length > 0) {
        var table = document.getElementsByTagName("table")[0];
        
        for(let i = 0; i < length; i++) {
            var tr = document.createElement("tr");
            table.appendChild(tr);
            
            var tdName = document.createElement("td");
            var nodeName = document.createTextNode(users[i].name);
            tdName.appendChild(nodeName);
            tr.appendChild(tdName);

            var tdEmail = document.createElement("td");
            var nodeEmail = document.createTextNode(users[i].email);
            tdEmail.appendChild(nodeEmail);
            tr.appendChild(tdEmail);

            var tdScore = document.createElement("td");
            var nodeScore = document.createTextNode(users[i].highestScore);
            tdScore.appendChild(nodeScore);
            tr.appendChild(tdScore);

            var tdCoin = document.createElement("td");
            var nodeCoin = document.createTextNode(users[i].coin);
            tdCoin.appendChild(nodeCoin);
            tr.appendChild(tdCoin);
        }
    }
}

if ((window.location.href.match('users.html') != null)) {
    window.onload = function() {
        if(isLoggedin == "false") {
            userState.innerHTML = "Login";
        } else {
            userName[0].innerHTML = "Welcome " + loggedinUser.name;
            userState.innerHTML = "Logout";
        }
    }
}

function logout() {
    // set local storage isLoggedin variable to false if it is true
    // and loggedin user details to an empty string
    
    localStorage.setItem("isLoggedin", "false");
    localStorage.setItem("loggedinUser", "{}");
    window.open("index.html", "_self");
}

if ((window.location.href.match('users.html') != null)) {
    document.addEventListener('keydown', (event)=> {
        if(event.key === " ") {
            window.open("game.html", "_self");
        }
    });
}

/*
 Regular expressions must start with /^ and ends with $/. ^ evinces start of string and $ evinces end of string.
 [^\s@] indicates email must not have any character between the brackets. \s means whitespace character.
*/

function isValidEmail(email) {
    const toBeTested = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return toBeTested.test(email);
}

/*
 . means a single character except newline and terminator.
 (?=.*[0-9]) means the password must contain any single digit in a range from 1 to 9
 (?=.*[a-z]) means the password must contain at least 1 lowercase letter
 (?=.*[A-Z]) means the password must contain at least 1 uppercase letter
 (?=.*\W) means the password must contain at least 1 special character
 (?!.* )  means the password must not contain space character
 {8,16} specifies the password length as 8-16 characters long
*/

function checkPassword(password) {
    const re = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;
    return re.test(password);
}

/*
 0[0-9]{10} matches a string with a leading 0 followed by exactly 10 digits
 the difference between (?=0[0-9]{10}) and 0[0-9]{10} is as follows:
 (?=[0-9]{10}) only checks if a string begin with 0 followed by exactly 10 digits but does not consume it
 but 0[0-9]{10} matches a string with a leading 0 followed by exacty 10 digits
 note the number being tested must be in string format
*/

function checkPhone(num) {
    const re = /^0[0-9]{10}$/;
    return re.test(num);
}

function login() {
    let user = {};
    
    // check which submit button is being pressed
    if(registerBtn.classList.contains("active")) {
        // collect user details
        let userToGetChecked = {
            email: registerEmailInput.value,
            password: registerPasswordInput.value
        }

        let existingUser = users.find((user) => user.email == userToGetChecked.email && user.password == userToGetChecked.password);
        let possibleExistingUser = users.find((user) => user.email == userToGetChecked.email);

        if (possibleExistingUser) {
            if(existingUser) {
                card.style.height = "600px";
                registerError.innerHTML = "User exists."
                registerError.style.display = "block";
            } else {
                card.style.height = "600px";
                registerError.innerHTML = "Email exists on our system."
                registerError.style.display = "block";
            }
            
        } else {
            if(!existingUser) {
                // set local storage isLoggedin value to true if user does not exist
                localStorage.setItem("isLoggedin", "true");
                user = {
                    id: users.length,
                    name: registerNameInput.value,
                    email: registerEmailInput.value,
                    phone: registerPhoneInput.value,
                    address: registerAddressInput.value,
                    password: registerPasswordInput.value,
                    score: 0,
                    highestScore: 0,
                    coin: 0
                }
    
                users.push(user);
                users = JSON.stringify(users);
                localStorage.setItem("users", users);
                localStorage.setItem("loggedinUser", JSON.stringify(user));

                window.open("game.html", "_self");
            }
        }


    } else if((loginBtn.classList.contains("active"))) {
        // check the entered details if it mathes stored detail
        let enteredUser = {
            email: loginEmailInput.value,
            password: loginPasswordInput.value
        }

        let existingUser = users.find((user) => user.email == enteredUser.email && user.password == enteredUser.password);
        let possibleExistingUser = users.find((user) => user.email == enteredUser.email || user.password == enteredUser.password);
        
        if (possibleExistingUser) {
            if(enteredUser.email != possibleExistingUser.email) {
                loginError.innerHTML = "Email does not match the ones we have on our system."
                loginError.style.display = "block";
                card.style.height = "340px";
            } else if(enteredUser.password != possibleExistingUser.password) {
                loginError.innerHTML = "Password is incorrect."
                loginError.style.display = "block";
                card.style.height = "340px";
            }
            
            if(existingUser) {
                localStorage.setItem("loggedinUser", JSON.stringify(existingUser));
                
                // set local storage isLoggedin value to true if user exists
                localStorage.setItem("isLoggedin", "true");
                window.open("game.html", "_self");
            }
        } else if(!existingUser) {
            card.style.height = "340px";
            loginError.innerHTML = "Email and password does not exist."
            loginError.style.display = "block";
        }
        

    }

}

function validated() {
    if(registerBtn.classList.contains("active")) {
        if(registerNameInput.value.length < 4) {
            registerNameInput.style.border = "1px solid red";
            card.style.height = "580px";
            registerNameError.style.display = "block";
            registerNameInput.focus();
            return false;
        }

        if(!isValidEmail(registerEmailInput.value)) {
            registerEmailInput.style.border = "1px solid red";
            card.style.height = "580px";
            registerEmailError.style.display = "block";
            registerEmailInput.focus();
            return false;
        }

        if(!checkPhone(registerPhoneInput.value)) {
            registerPhoneInput.style.border = "1px solid red";
            card.style.height = "580px";
            registerPhoneError.style.display = "block";
            registerPhoneInput.focus();
            return false;
        }

        if(!checkPassword(registerPasswordInput.value)) {
            registerPasswordInput.style.border = "1px solid red";
            card.style.height = "600px";
            registerPasswordError.style.display = "block";
            registerPasswordInput.focus();
            return false;
        }
    } else {
        if(!isValidEmail(loginEmailInput.value)) {
            loginEmailInput.style.border = "1px solid red";
            card.style.height = "340px";
            loginEmailError.style.display = "block";
            loginEmailInput.focus();
            return false;
        }
        
        if(!checkPassword(loginPasswordInput.value)) {
            loginPasswordInput.style.border = "1px solid red";
            card.style.height = "360px";
            loginPasswordError.style.display = "block";
            loginPasswordInput.focus();
            return false;
        }

    }

    login();
}

function name_verify() {
    if(registerError.style.display == "block") {
        registerError.style.display = "none";
        card.style.height = "510px";
        return true;
    }

    if(registerNameInput.value.length >= 3) {
        registerNameInput.style.border = "1px solid #ccc";
        registerNameError.style.display = "none";

        registerEmailInput.style.border = "1px solid #ccc";
        registerEmailError.style.display = "none";

        registerPhoneError.style.display = "none";
        registerPhoneInput.style.border = "1px solid #ccc";

        registerPasswordError.style.display = "none";
        registerPasswordInput.style.border = "1px solid #ccc";
        
        card.style.height = "510px";
        return true;
    }
}

function phone_verify() {
    if(registerError.style.display == "block") {
        registerError.style.display = "none";
        card.style.height = "510px";
        return true;
    }

    if(checkPhone(registerPhoneInput.value)) {
        registerNameInput.style.border = "1px solid #ccc";
        registerNameError.style.display = "none";

        registerEmailInput.style.border = "1px solid #ccc";
        registerEmailError.style.display = "none";

        registerPhoneError.style.display = "none";
        registerPhoneInput.style.border = "1px solid #ccc";

        registerPasswordError.style.display = "none";
        registerPasswordInput.style.border = "1px solid #ccc";

        card.style.height = "510px";
        return true;
    }
}

function email_verify() {
    if(registerBtn.classList.contains("active")) {
        if(registerError.style.display == "block") {
            registerError.style.display = "none";
            card.style.height = "510px";
            return true;
        }
        
        if(isValidEmail(registerEmailInput.value)) {
            registerNameInput.style.border = "1px solid #ccc";
            registerNameError.style.display = "none";
    
            registerEmailInput.style.border = "1px solid #ccc";
            registerEmailError.style.display = "none";
    
            registerPhoneError.style.display = "none";
            registerPhoneInput.style.border = "1px solid #ccc";
    
            registerPasswordError.style.display = "none";
            registerPasswordInput.style.border = "1px solid #ccc";
    
            card.style.height = "510px";
            return true;
        }


    }

    if(loginBtn.classList.contains("active")) {
        if(loginError.style.display == "block") {
            loginError.style.display = "none";
            card.style.height = "270px";
            return true;
        }
    
        if(isValidEmail(loginEmailInput.value)) {
            loginEmailInput.style.border = "1px solid #ccc";
            loginEmailError.style.display = "none";
    
            loginPasswordError.style.display = "none";
            loginPasswordInput.style.border = "1px solid #ccc";
            
            card.style.height = "270px";
            return true;
        }


    }
}

function password_verify() {
    if(registerBtn.classList.contains("active")) {
        if(registerError.style.display == "block") {
            registerError.style.display = "none";
            card.style.height = "510px";
            return true;
        }
        
        if(checkPassword(registerPasswordInput.value)) {
            registerNameInput.style.border = "1px solid #ccc";
            registerNameError.style.display = "none";
    
            registerEmailInput.style.border = "1px solid #ccc";
            registerEmailError.style.display = "none";
    
            registerPhoneError.style.display = "none";
            registerPhoneInput.style.border = "1px solid #ccc";
    
            registerPasswordError.style.display = "none";
            registerPasswordInput.style.border = "1px solid #ccc";
    
            card.style.height = "510px";
            return true;
        }


    }

    if(loginBtn.classList.contains("active")) {
        if(loginError.style.display == "block") {
            loginError.style.display = "none";
            card.style.height = "270px";
            return true;
        }
    
        if(checkPassword(loginPasswordInput.value)) {
            loginEmailInput.style.border = "1px solid #ccc";
            loginEmailError.style.display = "none";
    
            loginPasswordError.style.display = "none";
            loginPasswordInput.style.border = "1px solid #ccc";
    
            card.style.height = "270px";
            return true;
        }


    }
}

function loginForm() {
    registerDiv.style.transform = "rotateY(180deg)";
    loginDiv.style.transform = "rotateY(0)";
    
    if(loginEmailError.style.display == "block" || loginError.style.display == "block") {
        card.style.height = "340px";
    } else if(loginPasswordError.style.display == "block") {
        card.style.height = "360px";
    } else {
        card.style.height = "270px";
    }
    
    registerBtn.classList.remove("active");
    loginBtn.classList.add("active");
}

function registerForm() {
    registerDiv.style.transform = "rotateY(0)";
    loginDiv.style.transform = "rotateY(-180deg)";
    
    if(registerNameError.style.display == "block" || registerEmailError.style.display == "block" || registerPhoneError.style.display == "block" || registerError.style.display == "block") {
        card.style.height = "580px";
    } else if(registerPasswordError.style.display == "block") {
        card.style.height = "600px";
    } else {
        card.style.height = "510px";
    }
    
    registerBtn.classList.add("active");
    loginBtn.classList.remove("active");
}