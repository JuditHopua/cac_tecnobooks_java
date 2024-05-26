document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("loginForm").addEventListener("submit", (event) => {
        event.preventDefault();
        validarCampos();
    });

    document.querySelectorAll(".formControl").forEach((input) => {
        input.addEventListener("keydown", (event) => {
            if (event.key === "Tab" || event.key === "Enter") {
                event.preventDefault();
                validarCampos();
            }
        });
    });
});

const validarCampos = () => {
    resetErrorMessages();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    let isValid = true;

    if (!isValidEmail(email)) {
        displayErrorMessage("emailError", "Por favor ingrese un correo electrónico válido.");
        document.getElementById("email").classList.add('isInvalid');
        isValid = false;
    } else {
        document.getElementById("email").classList.remove('isInvalid');
        document.getElementById("email").classList.add('isValid');
    }

    if (password.length < 8) {
        displayErrorMessage("passwordError", "La contraseña debe tener al menos 8 caracteres.");
        document.getElementById("password").classList.add("isInvalid");
        isValid = false;
    } else {
        document.getElementById("password").classList.remove("isInvalid");
        document.getElementById("password").classList.add("isValid");
    }

    if (isValid) {
        alert("¡Formulario enviado correctamente!");
        document.getElementById('loginForm').reset();
        document.getElementById("email").classList.remove('isValid');
        document.getElementById("password").classList.remove('isValid');
    }
};

const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
};

const displayErrorMessage = (elementId, message) => {
    const errorElement = document.getElementById(elementId);
    errorElement.innerText = message;
};

const resetErrorMessages = () => {
    const errorElements = document.querySelectorAll(".errorMessage");
    errorElements.forEach((element) => {
        element.innerText = "";
    });
};