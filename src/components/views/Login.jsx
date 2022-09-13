import { useState } from "react";
import { Link } from "react-router-dom";
import Form from '../../utilities/Forms'

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [validate, setValidate] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [limitatt, setLimitatt] = useState(0);
    const [userinfo, setUserinfo] = useState({});
    const validateLogin = () => {
        let isValid = true;

        let validator = Form.validator({
            username: {
                value: username,
                isRequired: true,
                isUserName: true, 
                minLength: 6
            },
            password: {
                value: password,
                isRequired: true,
                /* minLength: 8, */
               /*  pattern: "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})" */
                
            }
        });

        if (validator !== null) {
            setValidate({
                validate: validator.errors
            })

            isValid = false
        }
        return isValid;
    }

    const authenticate = (e) => {
        e.preventDefault();

        const validate = validateLogin();

        if (validate) {
            setValidate({});
            setUsername('');
            setPassword('');
            fetch('https://i-jet.scienceart.co.il/api/get_token',{method:'post', headers:{'Content-Type': 'application/json'},body:JSON.stringify({username:username,password:password,subDomain:"seva"})})
            .then(res=>{
                // if (res.status===401 )alert(`error`);
                return res.json() })
            .then( data => {setUserinfo(data)
                if( 'msg' in data )
             /*    alert(data.msg); */
                console.log(data)}  )
            /* alert('Successfully Login') */;  /* fetch to server */
        }
        else if (limitatt < 5){
            setLimitatt(limitatt+1)}
         else {
            setValidate({});
            setUsername('');
            setPassword('');
            alert('maximum number of attempts exceeded(5)');

         } 
    }

    const togglePassword = (e) => {
        if (showPassword) {
            setShowPassword(false);
        } else {
            setShowPassword(true)
        }
    }
   /*  function validate_password(password) {
        let check = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
        if (password.match(check)) {
           console.log("Your password is strong.");
        } else {
          console.log("Meh, not so much.");
        }
      }
      
      validate_password("Password123"); // strong password
      validate_password("OtherPassword"); // no numbers
      validate_password("password123"); // no uppercase
      validate_password("TooShort"); // too short  */
      

    return (
        <div className="row g-0 auth-wrapper">
            {/* <div className="col-12 col-md-5 col-lg-6 h-100 auth-background-col">
                <div className="auth-background-holder"></div>
                <div className="auth-background-mask"></div>
            </div> */}

            <div className="col-12 col-md-7 col-lg-6 auth-main-col text-center">
                <div className="d-flex flex-column align-content-end">
                    <div className="auth-body mx-auto">
                        <p>Login to your account</p>
                        <div className="auth-form-container text-start">
                            <form className="auth-form" method="POST" onSubmit={authenticate} autoComplete={'off'}>
                                <div className="username mb-3">
                                    <input type="username"
                                        className={`form-control ${validate.validate && validate.validate.username ? 'is-invalid ' : ''}`}
                                        id="username"
                                        name="username"
                                        value={username}required
                                        placeholder="username"
                                        onChange={(e) => setUsername(e.target.value)}
                                    />

                                    <div className={`invalid-feedback text-start ${(validate.validate && validate.validate.username) ? 'd-block' : 'd-none'}`} >
                                        {(validate.validate && validate.validate.username) ? validate.validate.username[0] : ''}
                                    </div>
                                </div>

                                <div className="password mb-3">
                                    <div className="input-group">
                                        <input type={showPassword ? 'text' : 'password'}
                                            className={`form-control ${validate.validate && validate.validate.password ? 'is-invalid ' : ''}`}
                                            name="password"
                                            id="password"
                                            value={password} required="" 

                                            placeholder="Password"
                                            title="wrong password"
                                               pattern="(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%_-^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"   
                                            onChange={(e) => setPassword(e.target.value)}
                                        />

                                        <button type="button" className="btn btn-outline-primary btn-sm" onClick={(e) => togglePassword(e)} ><i className={showPassword ? 'far fa-eye' : 'far fa-eye-slash'} ></i> </button>

                                        <div className={`invalid-feedback text-start ${(validate.validate && validate.validate.password) ? 'd-block' : 'd-none'}`} >
                                            {(validate.validate && validate.validate.password) ? validate.validate.password[0] : ''}
                                        </div>
                                    </div>
                                        <div className="extra mt-3 row justify-content-between">
                                        <div className={`col-12 text-danger ${userinfo.msg ? 'd-block' : 'd-none'}`}>שם משתמש או סיסמה שגויים</div>

                                        </div>

                                    <div className="extra mt-3 row justify-content-between">
                                        <div className="col-6">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" id="remember" checked={remember} onChange={(e) => setRemember(e.currentTarget.checked)} />
                                                <label className="form-check-label" htmlFor="remember">
                                                    Remember me
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="forgot-password text-end">
                                                <Link to="/forgot-password">Forgot password?</Link><br />
                                                <Link to="/reset-old-password">Reset old password</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <button type="submit" className="btn btn-primary w-100 theme-btn mx-auto">Log In</button>
                                </div>
                            </form>

                            {/* <hr />
                            <div className="auth-option text-center pt-2">No Account? <Link className="text-link" to="/register" >Sign up </Link></div> */}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Login;