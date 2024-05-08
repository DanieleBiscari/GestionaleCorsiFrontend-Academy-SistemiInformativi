export function validateLoginField(user){
    const {email, password} = user;
    if(email.match("[A-Za-z0-9\\.\\+_-]+@[A-Za-z0-9\\._-]+\\.[A-Za-z]{2,24}") 
        && password.match("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,20}") ){
            return true
    }


    return false
} 