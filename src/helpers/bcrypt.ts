const bcrypt = require('bcrypt');
const saltRounds = 10;    

export async function generateEncryptPassord(password: string){
    const salt = await  bcrypt.genSalt(saltRounds);
    const encryptPassword = await bcrypt.hash(password, salt);
    return encryptPassword
}

export async function checkUserPasswordToDatabaseEncryptedPassword(userInputPassword: string, storedHashedPassword: string){
    const isTheSamePassword = await bcrypt.compare(userInputPassword, storedHashedPassword);
    return isTheSamePassword;
}
