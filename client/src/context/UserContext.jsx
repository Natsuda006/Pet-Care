import { createContext, useState, useEffect } from "react";
import TokenService from "../services/token.service";

export const UserContext = createContext(null);


export const UserProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState(() => TokenService.getUser());

    const logIn = (user) => {
        setUserInfo(user);
        TokenService.setUser(user);
    };

    const logOut = () => {
        setUserInfo(null);
        TokenService.removeUser();
        window.location.href = "/login";
    };

    return (
        <UserContext.Provider value={{ userInfo, logIn, logOut }}>
            {children}
        </UserContext.Provider>
    );
};