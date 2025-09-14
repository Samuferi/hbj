const form = document.getElementById("signupForm");
const firstname_input = document.getElementById("firstname");
const email_input = document.getElementById("email");
const password_input = document.getElementById("password");
const repeat_password_input = document.getElementById("repeat-password");
const error_message = document.getElementById("error-message");

form.addEventListener('submit', e => {
    let errors = [];

    if(firstname_input){
        errors = getSignupFormErrors(
            firstname_input.value,
            email_input.value,
            password_input.value,
            repeat_password_input.value
        );
    }
    else{
        errors = getLoginFormErrors(email_input.value, password_input.value);
    }

    if(errors.length > 0){
        e.preventDefault();
        error_message.innerText = errors.join(" ");
    }
});

const allInputs = [firstname_input, email_input, password_input, repeat_password_input].filter(input => input != null);

allInputs.forEach(input => {
    input.addEventListener("input", () => {
        if(input.parentElement.classList.contains("incorrect")){
            input.parentElement.classList.remove("incorrect");
            error_message.innerText = "";
        }
    })
});
