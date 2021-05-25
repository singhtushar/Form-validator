const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const btn = document.getElementsByTagName('button');

// show error message

function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = `${message}`;
}

// show success

function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

// check valid email

function checkEmail(input) {
    // Regex to check valid email
    const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // return re.test(String(email).toLowerCase());
    if(re.test(input.value.trim()))
        showSuccess(input);
    else
        showError(input, 'Enter a valid email'); 
}

function getFieldName(input){
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function checkRequired(input){
    input.forEach(function(element) {
        if(element.value.trim() === ''){
            showError(element, `${getFieldName(element)} is required`);
        }
    });
}

function checkLength(input, min, max){
    if(input.value.length < min)
        showError(input, `${input.id} must contain atleast ${min} characters`);
    else if (input.value.length > max)
        showError(input, `${input.id} should not exceed ${max} characters`); 
    else
        showSuccess(input);       
}

function checkPassword(input1, input2){
    if(input1.value === input2.value)
        showSuccess(input1);
    else
        showError(input1, 'Password does not match');    
}

// adding event listener

form.addEventListener('submit', (e) => {
    e.preventDefault();

    checkRequired([username, email, password, password2]);
    checkLength(username, 3, 15);
    checkEmail(email);
    checkLength(password, 6, 20);
    if(password2.value.length > 0)
        checkPassword(password2, password);    
})