export function validateSigninField(user){
    const validationObj = {}
    const {email, password, nome, cognome, passwordRepeat} = user;

    if(email.match("[A-Za-z0-9\\.\\+_-]+@[A-Za-z0-9\\._-]+\\.[A-Za-z]{2,24}")) {
            validationObj.email = true
    } else{
        validationObj.email = false
    }

    if(password.match("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,20}")){
        validationObj.password = true
    } else{
        validationObj.password = false
    }

    if(nome.match("[a-zA-Z\\s']{5,50}")){
        validationObj.nome = true
    } else{
        validationObj.nome = false
    }

    if(cognome.match("[a-zA-Z\\s']{5,50}")){
        validationObj.cognome = true
    } else{
        validationObj.cognome = false
    }

    if(passwordRepeat === password){
        validationObj.passwordRepeat = true
    } else{
        validationObj.passwordRepeat = false
    }


    validationObj.emailValid = true

    return validationObj
}