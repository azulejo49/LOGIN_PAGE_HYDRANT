import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons'
import { faEyeSlash,faEye,faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { MyContext } from '../services/MyProvider'
import FatchDataApi from '../services/FatchDataApi';
import usePageTitle from '../services/usePageTitle';
import { Link } from "react-router-dom";
// import Forgot from './views/Forgot';
// import Form from '../../utilities/Forms'
import Form from './Forms';
// import './scss/_variables.scss';
// import './scss/auth.scss'; 
import './index.css'

const Login = () => {

    usePageTitle("התחברות");
    const { setUserInfo, setAccessToken, isLoading, setIsLoading } = useContext(MyContext) //Loged-in User Information Json recived on login    
    const [loginFields, setLogingFields] = useState({ username: localStorage.getItem('userName') ? localStorage.getItem('userName') : "", password: "", subDomain: "seva" })
    const [msg, setMsg] = useState("");
    // window.location.host.split(".")[0]


    useEffect(() => {
        setUserInfo();
        setIsLoading(false);
    }, [])

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [validate, setValidate] = useState({});
    const [passVld,setPassVld]=useState(true);
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

    const redirect = useNavigate();

    function HandleResponse(data) {
        if (data.access_token) {
            localStorage.setItem('refreshToken', data.refresh_token);
            localStorage.setItem('userName', data.user_name);
            localStorage.setItem('tokenLifeSpan', data.token_life_span);
            setAccessToken(data.access_token)
            setUserInfo(data)
            setMsg("")
            redirect('/');
        }
        else
            setMsg(data.msg)
        setIsLoading(false)
    }
    function HandleReject(error) {
        setMsg(error.msg ? error.msg : "חיבור לשרת נכשל")
        setIsLoading(false)
    }

    const authenticate = (e) => {
        e.preventDefault();
        // setIsLoading(true)
        // FatchDataApi('get_token', 'POST', "", HandleResponse, { payload: loginFields, onReject: HandleReject, errorMsgTitle: "שגיאה בחיבור לשרת", successCodes: [401, 500, 200, 201] })
        // setLogingFields({ ...loginFields, password: "" })

        const validate = validateLogin();
        setPassVld(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(loginFields.password));
        if (validate&&
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(loginFields.password)) {
            console.log("sent")
            setIsLoading(true)
        FatchDataApi('get_token', 'POST', "", HandleResponse, { payload: loginFields, onReject: HandleReject, errorMsgTitle: "שגיאה בחיבור לשרת", successCodes: [401, 500, 200, 201] })
        setLogingFields({ ...loginFields, password: "" })
        }
        
        if (validate&&
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(loginFields.password)) {
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
            // setValidate({});
            // setUsername('');
            // setPassword('');
            // alert('maximum number of attempts exceeded(5)');

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
        // <div className="row g-0 auth-wrapper">
        <div>

                {/* <div className="auth-background-holder"></div>
                <div className="auth-background-mask"></div> */}
            

            {/* <div className="col-12 col-md-7 col-lg-6 auth-main-col text-center"> */}
            <div>
                {/* <div className="d-flex flex-column align-content-end"> */}
                <div>
                    {/* <div className="auth-body mx-auto"> */}
                    <div className="canvas">
                        {/* <p>Login to your account</p> */}
                        
                        {/* <div className="auth-form-container text-start"> */}
                        <div className='window'>
                            {/* <form className="auth-form" method="POST" onSubmit={authenticate} autoComplete={'off'}> */}<header>
                            <h3 className="title">התחברות</h3>
                            </header>
                            {/* "margin-right":"300px",
                            "margin-left":"300px", */}
                            {/* 'border':"2px solid black", */}
                            <form style={{
                            "width":"400px"}} method="POST" onSubmit={authenticate} autoComplete={'off'}>

                                <div style={{"height":"30px"}}></div>

                                {/* <div className="username mb-3"> */}
                                <div>
                                    <input type="username"
                                        className={`form-control ${validate.validate && validate.validate.username ? 'is-invalid ' : ''}`}
                                        id="username"
                                        name="username"
                                        value={username}required
                                        placeholder="username"
                                        onChange={(e) =>{setUsername(e.target.value);
                                            setLogingFields({ ...loginFields, username: e.target.value })}}
                                    />

                                    <div className={`invalid-feedback text-start ${(validate.validate && validate.validate.username) ? 'd-block' : 'd-none'}`} >
                                        {/* {(validate.validate && validate.validate.username) ? validate.validate.username[0] : ''} */}
                                        
                                    </div>
                                </div>
                                {/* </div> */}

                                {/* <div className="password mb-3"> */}
                                    {/* <div className="input-group"> */}
                                    <div style={{
                                        // "border":"1px black solid",
                                        "position":"relative","right":"20px"}}>
                                        <input type={showPassword ? 'text' : 'password'}
                                            className={`form-control ${validate.validate && validate.validate.password ? 'is-invalid ' : ''}`}
                                            name="password"
                                            id="password"
                                            value={password} required

                                            placeholder="Password"
                                            title="wrong password"
                                               pattern="(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%_-^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"   
                                            onChange={(e) =>{ setPassword(e.target.value);
                                                setLogingFields({ ...loginFields, password: e.target.value })}}        
                                        />

                                        <button style={{"display":"inline","width":"40px","height":"35px","margin":"0","font-size":"1.1rem","text-align":"center","padding":"0"}} type="button" className="btn btn-outline-primary btn-sm" onClick={(e) => togglePassword(e)} >
                                        {showPassword ?<FontAwesomeIcon icon={faEye} />
                                        :<FontAwesomeIcon icon={faEyeSlash} />}
                                            {/* <i className={showPassword ? 'far fa-eye' : 'far fa-eye-slash'} ></i> */}
                                             </button>

                                        <div className={`invalid-feedback text-start ${(validate.validate && validate.validate.password) ? 'd-block' : 'd-none'}`} >              
                                            {/* {(validate.validate && validate.validate.password) ? validate.validate.password[0] : ''} */}
                                        </div>
                                    </div>
                                    {/* </div> */}
                                        <div className="extra mt-3 row justify-content-between" style={{"height":"40px"}}>
                                        <div  className={`col-12 text-danger ${userinfo.msg || (validate.validate && validate.validate.password) || (validate.validate && validate.validate.username) || !passVld? 'd-block' : 'd-none'}`} 
                                        style={{"color":"red"}}>שם משתמש או סיסמה שגויים
                                        {/* {(validate.validate && validate.validate.username) ? 
                                        "שם משתמש או סיסמה שגויים" : ''} */}
                                        </div>

                                        </div>

                                    {/* <div className="extra mt-3 row justify-content-between"> */}
                                    
                                        {/* <div className="col-6"> */}
                                        {/* <div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" id="remember" checked={remember} onChange={(e) => setRemember(e.currentTarget.checked)} />
                                                <label className="form-check-label" htmlFor="remember">
                                                    זכור אותי
                                                </label>
                                            </div>
                                        </div> */}
                                        {/* </div> */}
                                        {/* <div className="col-6"> */}
                                    {/* <div>
                                            <div className="forgot-password text-end">
                                                <Link to="/forgot-password">שכחתי את הסיסמה</Link><br />
                                                <Link to="/reset-old-password">איפוס סיסמה</Link>
                                            </div>
                                        
                                    </div> */}
                                    {/* </div> */}
                                {/* </div> */}
                                <div className="text-center">
                                    <button style={{"width":"100%"}} type="submit"
                                    //  className="btn btn-primary w-100 theme-btn mx-auto"
                                    className="btn"
                                    >כניסה&nbsp;
                                    <FontAwesomeIcon icon={faRightToBracket} /></button>
                                </div>

                                <div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" id="remember" checked={remember} onChange={(e) => setRemember(e.currentTarget.checked)} />
                                                <label className="form-check-label" htmlFor="remember">
                                                    זכור אותי
                                                </label>
                                            </div>
                                </div>

                                <div>
                                            {/* <div className="forgot-password text-end"> */}
                                            {/* ,"gap":"5px" */}
                                            <div style={{"width":"330px","margin-top":"10px","display":"flex","flex-direction":"column","align-items":"flex-start","gap":"5px"
                                            }}>
                                                <Link to="/forgot">שכחתי סיסמה</Link>
                                                {/* <br /> */}
                                                <Link to="/reset-old-password">איפוס סיסמה</Link>
                                            </div>
                                        {/* </div> */}
                                    </div>
                                    <div style={{"height":"30px"}}></div>
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