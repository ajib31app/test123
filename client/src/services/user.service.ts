import http from "../http-common";
import authHeader from "./auth-header";

const endpoint = "/test/";

class UserDataService {
    getPublicContent() {
        return http.get(endpoint + "all");
      };
      
    getUserBoard() {
        return http.get(endpoint + "user", { headers: authHeader() });
      };
      
    getModeratorBoard() {
        return http.get(endpoint + "mod", { headers: authHeader() });
      };
      
    getAdminBoard(){
        return http.get(endpoint + "admin", { headers: authHeader() });
      };
      
}


export default new UserDataService();
