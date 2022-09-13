/*************************************
 ***  Made By Yohay Hackam         ***
 ***  mail: Yoman_321@hotmail.com  ***
 ***  054-2616626                  ***
 *************************************/
import './login.css'
import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons'
import { MyContext } from '../services/MyProvider'
import FatchDataApi from '../services/FatchDataApi';
import usePageTitle from '../services/usePageTitle';

export default function Login() {

    usePageTitle("התחברות");
    const { setUserInfo, setAccessToken, isLoading, setIsLoading } = useContext(MyContext) //Loged-in User Information Json recived on login    
    const [loginFields, setLogingFields] = useState({ username: localStorage.getItem('userName') ? localStorage.getItem('userName') : "", password: "", subDomain: "seva" })
    const [msg, setMsg] = useState("");
    // window.location.host.split(".")[0]


    useEffect(() => {
        setUserInfo();
        setIsLoading(false);
    }, [])


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

    function handleLogin(e) {
        e.preventDefault()
        setIsLoading(true)
        FatchDataApi('get_token', 'POST', "", HandleResponse, { payload: loginFields, onReject: HandleReject, errorMsgTitle: "שגיאה בחיבור לשרת", successCodes: [401, 500, 200, 201] })
        setLogingFields({ ...loginFields, password: "" })
    }
    return (
        <div className="canvas">
            <div className='window'>
                <header>
                    <h3 className="title">התחברות</h3>
                </header>
                <form onSubmit={handleLogin} >
                    <fieldset>
                        <label htmlFor="username">משתמש:</label>
                        <input type="text" name="username" id="username"
                            placeholder='שם משתמש'
                            value={loginFields.username}
                            disabled={isLoading}
                            required
                            onChange={(e) => setLogingFields({ ...loginFields, username: e.target.value })} />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="password">סיסמא:</label>
                        <input type="password" name="password" id="password"
                            placeholder='סיסמא'
                            value={loginFields.password}
                            disabled={isLoading}
                            required
                            onChange={(e) => setLogingFields({ ...loginFields, password: e.target.value })} />
                    </fieldset>
                    <span style={{ 'color': 'red' }}>
                        {(msg) ? `שגיאה :  ${msg}` : ""}
                    </span>
                    <div className='btnContainer'>
                        <button className='btn confirmBtn' type='submit' disabled={isLoading} >כניסה&nbsp;
                            <FontAwesomeIcon icon={faRightToBracket} />
                        </button>
                    </div>

                </form>
            </div>
        </div >
    )
}
