const fields = document.querySelectorAll("[required]");

console.log(fields);

function customValidation(event) {
    
    
    const field = event.target

    //  logica para verificar se existem erros
    function verifyErrors() {
        let foundError = false;

        for(const error in field.validity) {
            // se não for customError
            // então verifica se tem erro
            if (error !== "customError" && field.validity[error]) {
                foundError = error;
            }
        }
        return foundError;
    }
    
    const error = verifyErrors();
    console.log("Error Exists:", error)

    if (error) {
        // trocar mensagem de required
        field.setCustomValidity("Esse campo é obrigatório!");
    } else {
        field.setCustomValidity("");
    }

    
}

for (field of fields) {
    field.addEventListener("invalid", customValidation)
}

























document.querySelector("form")
.addEventListener("submit", event => {
    console.log("enviar o formulário")

    // O preventDefault faz com que o formulário não seja enviado
    event.preventDefault()
})