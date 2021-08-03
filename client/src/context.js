import { createContext } from "react"
function none() {}

const Context = createContext({
    token: null,
    userId: null,
    login: none,
    logout: none,
    isAuth: false
})
export default Context;
