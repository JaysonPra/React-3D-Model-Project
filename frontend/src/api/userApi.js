const API = `http://localhost:5000`

export const register = (user) => {
    return fetch(`${API}/register`,{
        method: "POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response=>response.json())
    .catch(error=>console.log(error))
}

export const verifyAccount = token => {
    return fetch(`${API}/verify/${token}`)
    .then(response => response.json())
    .catch(error => console.log(error))
}

export const forgetpassword = (email) => {
    return fetch(`${API}/forgetpassword`, {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({ email })
    })
    .then(response => response.json())
    .catch(error => console.log(error))
}

export const resetPassword = (token, password) => {
    return fetch(`${API}/resetpassword/${token}`, {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({ password })
    })
    .then(response => response.json())
    .catch(error => console.log(error))
}

export const login = (user) => {
    return fetch(`${API}/login`, {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(user)
    })
    .then(response => response.json())
    .catch(error => console.log(error))
}

export const authenticate = (data) => {
    localStorage.setItem("jwt", JSON.stringify(data))
}

// check if logged in
export const isAuthenticated = () => {
    return localStorage.getItem('jwt') ? JSON.parse(localStorage.getItem('jwt')) : false
}

// logout function
export const logout = () => {
    localStorage.removeItem('jwt')
}