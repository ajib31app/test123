import IUserData from "../types/user.type"
export default function authHeader() {
    // const user1 = localStorage.getItem("user"); // string | null

    let user: IUserData = JSON.parse(JSON.stringify(localStorage.getItem("user")));
  
    console.log(JSON.stringify(user));
    if (user && user.accessToken) {
    //   return { Authorization: 'Bearer ' + user.accessToken }; // for Spring Boot back-end
      return { 'x-access-token': user.accessToken };       // for Node.js Express back-end
    } else {
      return {};
    }
  }