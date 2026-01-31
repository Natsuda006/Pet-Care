import api from "./api";
import TokenService from "./token.service";

const register = async (username, password, roles) => {
    return api.post("/user/register", {
        username,
        password,
        roles: roles ? roles : ["user"] // Optional roles
    });
};

const login = async (username, password) => {
    const response = await api.post("/user/login", {
        username,
        password,
    });
    if (response.data.accessToken) {
        TokenService.setUser(response.data);
    }
    return response;
};

const logout = () => {
    TokenService.removeUser();
};

const AuthService = {
    register,
    login,
    logout,
};

export default AuthService;
