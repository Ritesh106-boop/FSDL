function validateForm() {

    let name = document.getElementById("name");
    let email = document.getElementById("email");
    let phone = document.getElementById("phone");
    let age = document.getElementById("age");
    let password = document.getElementById("password");
    let confirmPassword = document.getElementById("confirmPassword");

    let valid = true;

    clearErrors();

    if (name.value.trim() === "") {
        showError(name, "Name is required");
        valid = false;
    }

    if (!email.value.includes("@") || !email.value.includes(".")) {
        showError(email, "Enter a valid email");
        valid = false;
    }

    if (!/^[6-9]\d{9}$/.test(phone.value)) {
        showError(phone, "Enter valid Indian mobile number");
        valid = false;
    }

    if (age.value < 18 || age.value > 60) {
        showError(age, "Age must be between 18 and 60");
        valid = false;
    }

    if (password.value.length < 6) {
        showError(password, "Password must be at least 6 characters");
        valid = false;
    }

    if (password.value !== confirmPassword.value) {
        showError(confirmPassword, "Passwords do not match");
        valid = false;
    }

    if (valid) {
        alert("Form validated successfully!");
    }

    return valid;
}

function showError(input, message) {
    let small = input.parentElement.querySelector("small");
    small.innerText = message;
}

function clearErrors() {
    let errors = document.querySelectorAll("small");
    errors.forEach(e => e.innerText = "");
}
