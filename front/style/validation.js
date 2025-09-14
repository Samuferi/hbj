// 🔹 Változók a form elemeihez
const form = document.getElementById("signupForm") || document.getElementById("form"); // signup vagy login form
const firstname = document.getElementById("firstname");         // csak signup
const lastname = document.getElementById("lastname");           // csak signup
const email = document.getElementById("email");                 // mindkettő
const password = document.getElementById("password");           // mindkettő
const repeatPassword = document.getElementById("repeat-password"); // csak signup
const errorMessage = document.getElementById("error-message");

// 🔹 Hibakereső függvények
function getSignupFormErrors(firstnameVal, lastnameVal, emailVal, passwordVal, repeatPasswordVal){
    let errors = [];

    if(!firstnameVal) { errors.push("Szükséges a keresztnév megadása!"); firstname.parentElement.classList.add("incorrect"); }
    if(!lastnameVal)  { errors.push("Szükséges a vezetéknév megadása!"); lastname.parentElement.classList.add("incorrect"); }
    if(!emailVal)     { errors.push("Szükséges az email-cím megadása!"); email.parentElement.classList.add("incorrect"); }
    if(!passwordVal)  { errors.push("Szükséges a jelszó megadása!"); password.parentElement.classList.add("incorrect"); }
    if(passwordVal && passwordVal.length < 8) { errors.push("A jelszónak legalább 8 karakter hosszúnak kell lennie!"); password.parentElement.classList.add("incorrect"); }
    if(passwordVal !== repeatPasswordVal) { errors.push("A jelszavak nem egyeznek!"); password.parentElement.classList.add("incorrect"); repeatPassword.parentElement.classList.add("incorrect"); }

    return errors;
}

function getLoginFormErrors(emailVal, passwordVal){
    let errors = [];

    if(!emailVal)    { errors.push("Szükséges az email-cím megadása!"); email.parentElement.classList.add("incorrect"); }
    if(!passwordVal) { errors.push("Szükséges a jelszó megadása!"); password.parentElement.classList.add("incorrect"); }
    if(passwordVal && passwordVal.length < 8) { errors.push("A jelszónak legalább 8 karakter hosszúnak kell lennie!"); password.parentElement.classList.add("incorrect"); }

    return errors;
}

// 🔹 Submit listener
if(form){
    form.addEventListener('submit', e => {
        let errors = [];

        if(firstname && lastname && repeatPassword){ 
            // signup form
            errors = getSignupFormErrors(firstname.value, lastname.value, email.value, password.value, repeatPassword.value);
        } else { 
            // login form
            errors = getLoginFormErrors(email.value, password.value);
        }

        if(errors.length > 0){
            e.preventDefault();
            errorMessage.innerText = errors.join(" ");
        }
    });
}

// 🔹 Inputok figyelése hibajelzés eltávolítására
const allInputs = [firstname, lastname, email, password, repeatPassword].filter(input => input != null);
allInputs.forEach(input => {
    input.addEventListener("input", () => {
        if(input.parentElement.classList.contains("incorrect")){
            input.parentElement.classList.remove("incorrect");
            errorMessage.innerText = "";
        }
    });
});
