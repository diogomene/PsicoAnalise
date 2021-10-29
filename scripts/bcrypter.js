const bcrypt = require('bcrypt')
async function encrypt(data){
    const hashedData = await bcrypt.hash(data,10)
    return hashedData
}
async function encryptCredentials(credentials){
    const username = await encrypt(credentials.username);
    const password = await encrypt(credentials.password)
    return {username, password}
}
async function compare(keyValue, cryptedData){
    return await bcrypt.compare(keyValue,cryptedData)
}
async function compareCredentials(credentials, hashedCredentials){
    const usernameCompare = await compare(credentials.username, hashedCredentials.username)
    const passwordCompare = await compare(credentials.password, hashedCredentials.password)
    if(usernameCompare && passwordCompare){
        return true
    }else{
        return false
    }
}

module.exports = {encrypt, compare, encryptCredentials, compareCredentials}