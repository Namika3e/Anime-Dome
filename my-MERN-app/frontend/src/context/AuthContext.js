import { createContext, useReducer, useEffect } from "react"

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch(action.type) {
        case 'LOGIN':
            return {user: action.payload}

        case "LOGOUT":
            return {user:null}

        default:
            return state;
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    });

    // get the login info of the user from localstorage and save it to our context
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))//we parse because when it is stored in local storage, it is a json string and we want an object we can use in javascript

        if (user) {
            dispatch({type:"LOGIN", payload:user})
        }
    }, [])

    console.log("AuthContext state :" , state)

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )


}