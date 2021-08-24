import http from "../http-common";
import IUserData from "../types/user.type"

class AuthDataService {

    register(username: string, email: string, password: string){
        return http.post("/auth/signup", {
            username: username, 
            email: email, 
            password: password
        });
    }

    login(username: string,  password: string){
        console.log("auth service login...");
        return http.post("/auth/signin", {
            username: username, 
            password: password
        })
        .then((response) => {
            console.log("auth service response...");
            if (response.data.accessToken) {
              localStorage.setItem("user", JSON.stringify(response.data));
            }
      
            return response.data;
          }).catch(error => {
            
        });
    }

    logout(){
        localStorage.removeItem("user");
    }
    
    getCurrentUser(){
        let user: IUserData = JSON.parse(JSON.stringify(localStorage.getItem("user")));
        console.log("AuthDataService "+JSON.stringify(user));
        return user;
    }

}
export default new AuthDataService();

