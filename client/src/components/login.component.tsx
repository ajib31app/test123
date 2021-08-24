import { Component, ChangeEvent } from "react";
import { RouteComponentProps } from 'react-router-dom';

// import Form from "react-validation/build/form";
// import Input from "react-validation/build/input";
// import CheckButton from "react-validation/build/button";

import AuthService from "../services/auth.service";
import IUserData from '../types/user.type';

interface RouterProps { // type for `match.params`
  id: string; // must be type `string` since value comes from the URL
}

type Props = RouteComponentProps<RouterProps>;

type State = IUserData & {
  loading: boolean
};


export default class Login extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.login = this.login.bind(this);
    
    

    this.state = {
      id: null,
      username: "",
      email: "",
      password: "",
      accessToken: "",
      loading: false
    };
  }

  onChangeUsername(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      password: e.target.value
    });
  }



  login() { 
    this.setState({ loading: true});
    AuthService.login(this.state.username, this.state.password)
      .then(response => {
        this.props.history.push("/tutorials");  
        this.setState({ 
          loading: false
        });
        console.log("response "+response);
      })
      .catch(error => {
          console.log("error bos"+error)
      });

    
  }


  render() {
    const { username, password, loading } = this.state;
      return (
        <div className="col-md-4 offset-4">
          <div className="card card-container">
            <img
              src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
              alt="profile-img"
              className="profile-img-card"
            />
    
            <form >
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input 
                id='username'
                type='text' 
                name='username' 
                className='form-control' 
                value={username}
                onChange= {this.onChangeUsername}/>
              </div>
    
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input 
                id='password'
                type='password' 
                name='password'
                className='form-control' 
                value={password}
                onChange= {this.onChangePassword}/>
              </div>
    
              <div className="form-group">
                <button className="btn btn-primary btn-block" disabled={loading} onClick={this.login}>
                  {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span>Login</span>
                </button>
              </div>
            </form>
          </div>
      </div>  
      );
  }
}




// const required = (value) => {
//   if (!value) {
//     return (
//       <div className="alert alert-danger" role="alert">
//         This field is required!
//       </div>
//     );
//   }
// };

// const Login = (props) => {
//   const form = useRef();
//   const checkBtn = useRef();

//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   const onChangeUsername = (e) => {
//     const username = e.target.value;
//     setUsername(username);
//   };

//   const onChangePassword = (e) => {
//     const password = e.target.value;
//     setPassword(password);
//   };

//   const handleLogin = (e) => {
//     e.preventDefault();

//     setMessage("");
//     setLoading(true);

//     form.current.validateAll();

//     if (checkBtn.current.context._errors.length === 0) {
//       AuthService.login(username, password).then(
//         () => {
//           props.history.push("/profile");
//           window.location.reload();
//         },
//         (error) => {
//           const resMessage =
//             (error.response &&
//               error.response.data &&
//               error.response.data.message) ||
//             error.message ||
//             error.toString();

//           setLoading(false);
//           setMessage(resMessage);
//         }
//       );
//     } else {
//       setLoading(false);
//     }
//   };


//   return (
//     <div className="col-md-12">
//       <div className="card card-container">
//         <img
//           src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
//           alt="profile-img"
//           className="profile-img-card"
//         />

//         <Form onSubmit={handleLogin} ref={form}>
//           <div className="form-group">
//             <label htmlFor="username">Username</label>
//             <Input
//               type="text"
//               className="form-control"
//               name="username"
//               value={username}
//               onChange={onChangeUsername}
//               validations={[required]}
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="password">Password</label>
//             <Input
//               type="password"
//               className="form-control"
//               name="password"
//               value={password}
//               onChange={onChangePassword}
//               validations={[required]}
//             />
//           </div>

//           <div className="form-group">
//             <button className="btn btn-primary btn-block" disabled={loading}>
//               {loading && (
//                 <span className="spinner-border spinner-border-sm"></span>
//               )}
//               <span>Login</span>
//             </button>
//           </div>

//           {message && (
//             <div className="form-group">
//               <div className="alert alert-danger" role="alert">
//                 {message}
//               </div>
//             </div>
//           )}
//           <CheckButton style={{ display: "none" }} ref={checkBtn} />
//         </Form>
//       </div>
//     </div>
//   );
// };

// export default Login;