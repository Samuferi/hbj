window.addEventListener("DOMContentLoaded", () => {
// 🔹 Változók a form elemeihez
const form = document.getElementById("problemForm"); // signup vagy login form
const user=document.getElementById("user");
const location=document.getElementById("location");
const datetime=document.getElementById("datetime");
const images=document.getElementById("images");
const description=document.getElementById("details");
const errorMessage = document.getElementById("error-message");

// 🔹 Hibakereső függvények
function getProblemFormErrors(locationVal, dateTimeVal, descriptionVal){
    let errors = [];

    if(!locationVal) { errors.push("Szükséges a hely megadása!"); location.parentElement.classList.add("incorrect"); }
    if(!dateTimeVal)  { errors.push("Szükséges az időpont megadása!"); datetime.parentElement.classList.add("incorrect"); }
    if(!descriptionVal)   { errors.push("Szükséges leírást megadni!"); description.parentElement.classList.add("incorrect"); }
    return errors;
}

// 🔹 Submit listener
if(form){
    form.addEventListener('submit', e => {
        let errors = [];
        errors = getProblemFormErrors(location.value, datetime.value, description.value);

        if(errors.length > 0){
            e.preventDefault();
            errorMessage.innerText = errors.join(" ");
        }
    });
}

// 🔹 Inputok figyelése hibajelzés eltávolítására
const allInputs = [location, datetime, description].filter(input => input != null);
allInputs.forEach(input => {
    input.addEventListener("input", () => {
        if(input.parentElement.classList.contains("incorrect")){
            input.parentElement.classList.remove("incorrect");
            errorMessage.innerText = "";
        }
    });
})
});
