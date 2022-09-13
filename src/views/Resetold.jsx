import { useState } from "react";
/* import { Link } from "react-router-dom";  */
// import Form from '../../utilities/Forms'
import Form from './Forms'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash,faEye } from '@fortawesome/free-solid-svg-icons';

const Reset = () => {

    const [password, setPassword] = useState('');
    const [newpassword, setnewPassword] = useState('');
   /*  const [remember, setRemember] = useState(false); */
    const [validate, setValidate] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [shownewPassword, setShownewPassword] = useState(false);
    const [oldpassword, setOldpassword] = useState('');
    const [username, setUsername] = useState('');

    const validateReset = () => {
        let isValid = true;

        let validator = Form.validator({
            username: {
                value: username,
                isRequired: true,
                isUserName: true, 
                /* minLength: 8 */
            },
            password: {
                value: password,
                isRequired: true,
                isPassword: true, 
                minLength: 8
            },
            newpassword: {
                value: newpassword,
                isRequired: true,
                 minLength: 8
                /*  pattern: "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})" */
                
            },
            oldpassword: {
                value: oldpassword,
                isRequired: true,
                isUserName: true, 
                minLength: 8
            },
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

        const validate = validateReset();

        if (validate &&(password == newpassword)&&(oldpassword !== newpassword)) {

            setValidate({});
            setPassword('');
            setnewPassword('');
            alert('Successfully Reset Password');
            
        } else  {
            alert('no match');
        }}

    const togglePassword = (e) => {
        if (showPassword) {
            setShowPassword(false);
        } else {
            setShowPassword(true)
        }
    }

    const toggleNewPassword = (e) => {
        if (shownewPassword) {
            setShownewPassword(false);
        } else {
            setShownewPassword(true)
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
        // <div className="row g-0 auth-wrapper">
        <div>
            {/* <div className="col-12 col-md-5 col-lg-6 h-100 auth-background-col">
                <div className="auth-background-holder"></div>
                <div className="auth-background-mask"></div>
            </div> */}

            {/* <div className="col-12 col-md-7 col-lg-6 auth-main-col text-center mb-5"> */}
            <div>
                {/* <div className="d-flex flex-column align-content-end mb-5"> */}
                <div>
                    {/* <div className="auth-body mx-auto"> */}
                    <div className="canvas">
                        {/* <p>Reset your password</p> */}
                        {/* <div className="auth-form-container text-start"> */}
                        <div className='window'>

                            <header>
                                <h3 className="title">איפוס סיסמה</h3>
                            </header>

                            <form className="auth-form" method="POST" onSubmit={authenticate} autoComplete={'off'}>
                            <div style={{"height":"30px"}}></div>
                            {/* <div className="username mb-3" > */}
                            <div>
                                    <input type="username"
                                        className={`form-control ${validate.validate && validate.validate.username ? 'is-invalid ' : ''}`}
                                        id="username"
                                        name="username"
                                        value={username}required
                                        placeholder="username"
                                        pattern="^.{6,8}$"  
                                        onChange={(e) => setUsername(e.target.value)}
                                    />

                                    <div className={`invalid-feedback text-start ${(validate.validate && validate.validate.username) ? 'd-block' : 'd-none'}`} >
                                        {(validate.validate && validate.validate.username) ? validate.validate.username[0] : ''}
                                    </div>
                                </div>
                            <div className="oldpassword mb-3">
                                    <input type="oldpassword"
                                        className={`form-control ${validate.validate && validate.validate.oldpassword ? 'is-invalid ' : ''}`}
                                        id="oldpassword"
                                        name="oldpassword"
                                        value={oldpassword}required
                                        placeholder="oldpassword"
                                        pattern="(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"  
                                        onChange={(e) => setOldpassword(e.target.value)}
                                    />

                                    <div className={`invalid-feedback text-start ${(validate.validate && validate.validate.oldpassword) ? 'd-block' : 'd-none'}`} >
                                        {(validate.validate && validate.validate.oldpassword) ? validate.validate.oldpassword[0] : ''}
                                    </div>
                                </div>
                                {/* <div className="password mb-3"> */}
                                <div>
                                 {/* <div className="input-group"> */}
                                 <div style={{
                                        // "border":"1px black solid",
                                        "position":"relative","right":"20px"}}>
                                 <input type={showPassword ? 'text' : 'password'}
                                        className={`form-control ${validate.validate && validate.validate.password ? 'is-invalid ' : ''}`}
                                        id="password"
                                        name="password"
                                        value={password}required
                                        placeholder="newpassword"
                                        title="wrong password"
                                         pattern="(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"   
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                     <button style={{"display":"inline","width":"40px","height":"35px","margin":"0","font-size":"1.1rem","text-align":"center","padding":"0"}}
                                      type="button" className="btn btn-outline-primary btn-sm" onClick={(e) => 
                                        togglePassword(e)} >
                                            {showPassword ?<FontAwesomeIcon icon={faEye} />
                                        :<FontAwesomeIcon icon={faEyeSlash} />}
                                            {/* <i className={showPassword ? 'far fa-eye' : 'far fa-eye-slash'} ></i>  */}
                                            </button>
                                    <div className={`invalid-feedback text-start ${(validate.validate && validate.validate.password) ? 'd-block' : 'd-none'}`} >
                                        {(validate.validate && validate.validate.password) ? validate.validate.password[0] : ''}
                                        </div>
                                    </div>
                                </div>

                                {/* <div className="newpassword mb-3"> */}
                                <div>
                                    {/* <div className="input-group"> */}
                                    <div style={{
                                        // "border":"1px black solid",
                                        "position":"relative","right":"110px"
                                        }}>
                                    <input type={shownewPassword ? 'text' : 'password'}
                                            className={`form-control ${validate.validate && validate.validate.newpassword ? 'is-invalid ' : ''}`}
                                            name="newpassword"
                                            id="newpassword"
                                            value={newpassword} required
                                            placeholder=" verify newpassword"
                                            title="wrong password"
                                              pattern="(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"  
                                            onChange={(e) => setnewPassword(e.target.value)}
                                        />

                                         <button style={{"display":"inline","width":"40px","height":"35px","margin":"0","font-size":"1.1rem","text-align":"center","padding":"0"}}
                                         type="button" className="btn btn-outline-primary btn-sm" onClick={(e) => 
                                            toggleNewPassword(e)} >
                                                {shownewPassword ?<FontAwesomeIcon icon={faEye} />
                                        :<FontAwesomeIcon icon={faEyeSlash} />}
                                                {/* <i className={shownewPassword ? 'far fa-eye' : 'far fa-eye-slash'} ></i>  */}
                                                </button> 

                                        <div className={`invalid-feedback text-start ${(validate.validate && validate.validate.newpassword) ? 'd-block' : 'd-none'}`} >
                                            {(validate.validate && validate.validate.newpassword) ? validate.validate.newpassword[0] : ''}
                                        </div>
                                    </div>


                                    <div className="extra mt-3 row justify-content-between">
                                        <div className="col-6">
                                            <div className="form-check">
                                              {/*   <input className="form-check-input" type="checkbox" id="remember" checked={remember} onChange={(e) => setRemember(e.currentTarget.checked)} />
                                                <label className="form-check-label" htmlFor="remember">
                                                    Remember me
                                                </label> */}
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            {/* <div className="forgot-password text-start text-secondary"> */}
                                            <div style={{"margin":"5px 20px"}}>
                                            <p>הסיסמה חייבת להיות מ- 8 עד 16 תווים ומכילה <br></br>אותיות גדולות וקטנות באנגלית וספרות בלבד.</p>
                                             {/* <p>Requested Format: 8-16 characters, including- uppercase,
                                                lowercase, number, special-key.  
                                                
                                                </p>    */}
                                           
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <button style={{"width":"100%",
                                    // "letter-spacing":"4px",
                                    "text-align":"center"}} type="submit" className="btn btn-primary w-100 theme-btn mx-auto">איפוס סיסמה</button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Reset;