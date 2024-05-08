export function validateUserUpdate(user){
    const validationObj = {}
    const {email, nome, cognome, idRuolo} = user;

    if(email.match("[A-Za-z0-9\\.\\+_-]+@[A-Za-z0-9\\._-]+\\.[A-Za-z]{2,24}")) {
            validationObj.email = true
    } else{
        validationObj.email = false
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

    return validationObj
}