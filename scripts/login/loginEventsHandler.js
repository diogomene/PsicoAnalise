function getCredentials(){
    const username = document.getElementById("username").value;
    if(username.length<5){
        return false
    }
    const password = document.getElementById("password").value || "";
    if(password<5){
        return false
    }
    return {username, password}
}
window.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById("login-form")
    if(loginForm){
        loginForm.addEventListener('submit', e=>{
            e.preventDefault()
            const credentials = getCredentials()
            if(credentials)
                window.loginOperations.tryLogin(credentials)
        })
    }
        else{

            const registerForm=document.getElementById("register-form")
            if(registerForm)
            registerForm.addEventListener('submit', e=>{
                e.preventDefault()
                const credentials = getCredentials()
                console.log(credentials)
                if(credentials){
                    window.loginOperations.requestRegistration(credentials)
                }else{
                    alert("Credenciais irregulares!")
                }
            })
        }
})

