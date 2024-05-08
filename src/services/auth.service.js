import api from "./api";
import TokenService from "./token.service";

const register = (username, password) => {
    return api.post("/user/registration", {
        login: username,
        password: password
    });
};

const login = (username, password) => {
    // return api
    //     .post("/user/login", {
    //         login: username,
    //         password: password
    //     })
    //     .then((response) => {
    //         if (response.data.token) {
    //             TokenService.setUser(response.data);
    //         }
    //         return response.data;
    //     });
        return api
        .get("/course")
        .then((response) => {
            return TokenService.setUser({
                "id": 3,
                "testSessions": [],
                "login": "floral",
                "password": "12345678",
                "token": "pipa",
                "refreshToken": "pupa"
            });
        });

};
const logout = () => {
    TokenService.removeUser();
};
const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};
const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
};
export default AuthService;