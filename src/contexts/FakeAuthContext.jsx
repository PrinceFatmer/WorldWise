import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const FAKE_USER = {
    name: "Jack",
    email: "jack@example.com",
    password: "ILOVERAJPOOT",
    avatar: "https://i.pravatar.cc/100?u=zz",
  };
const initialState = {
  user: null,
  isAuthenticated: false,
};
function reducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case "logout":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
  }
}

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );
  function login(email, password) {
    if(email!==FAKE_USER.email && password!==FAKE_USER.password)
        {alert("Both email and password are not correct")
            return
        }


    if(email!==FAKE_USER.email)
     {
        alert("Email is not correct")
         return
     }
    if(password!==FAKE_USER.password)
        alert("Password is not correct")
    
    if(email===FAKE_USER.email && password===FAKE_USER.password)
        dispatch({ type: "login", payload: FAKE_USER });
  }
  function logout() {
    dispatch({ type: "logout" });
  }
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("Context is used outside the AuthProvider");
    return context;
}
 export {AuthProvider, useAuth}