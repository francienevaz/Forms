const fields = document.querySelectorAll("[required]");

function ValidateField (field) {
    //  logica para verificar se existem erros
    function verifyErrors() {
        let foundError = false;

        for(const error in field.validity) {
            // se não for customError
            // então verifica se tem erro
            if (field.validity[error] && !field.validity.valid) {
                foundError = error;
            }
        }
        return foundError;
    }

    function customMessage(typeError) {
        const messages = {
            text: {
                valueMissing: "Por favor, preencha este campo"
            },
            email: {
                valueMissing: "Email é Obrigatório",
                typeMismatch: "Por favor, insira um email válido!"
            }
        }

        return messages[field.type][typeError]
    }

    function setCustomMessage(message) {
        const spanError = field.parentNode.querySelector("span.error");

        if (message) {
            spanError.classList.add("active");
            spanError.innerHTML = message
        } else {
            spanError.classList.remove("active");
            spanError.innerHTML = ""
        }

        
    }
    return function() {

        const error = verifyErrors();

        if(error) {

            const message = customMessage(error);

            field.style.borderColor = "red";
            setCustomMessage(message);
        } else {
            field.style.borderColor = "green";
            setCustomMessage();
        }
    }
}

function customValidation(event) {
    
    const field = event.target

    const validation = ValidateField(field);

    validation();
    
    // Como vamos estilizar a mensagem de error, esse if else não faz mais sentido. ele pode ser ativado se tirarmos o event.preventDefault() da função customValidation()
    // if (error) {
    //     // trocar mensagem de required
    //     field.setCustomValidity("Esse campo é obrigatório!");
    // } else {
    //     field.setCustomValidity("");
    // }    
}

for (field of fields) {
    field.addEventListener("invalid", event => {
        // eliminar o bubble
        event.preventDefault();

        customValidation(event);
    });
    field.addEventListener("blur", customValidation);
}

document.querySelector("form")
.addEventListener("submit", event => {
    console.log("enviar o formulário")

    // O preventDefault faz com que o formulário não seja enviado
    event.preventDefault()
})