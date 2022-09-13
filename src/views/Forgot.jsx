import { useState } from "react";
import { Link } from "react-router-dom";
// import Form from '../../utilities/Forms'
import Form from './Forms';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEyeSlash,faEye,faArrowRight } from '@fortawesome/free-solid-svg-icons'


const Forgot = () => {

    const [email, setEmail] = useState('');
    const [validate, setValidate] = useState(false);

    const validateforgotPassword = () => {
        let isValid = true;

        let validator = Form.validator({
            email: {
                value: email,
                isRequired: true,
                isEmail: true
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

    const forgotPassword = (e) => {
        e.preventDefault();

        const validate = validateforgotPassword();

        if (validate) {
            
            //alert('Reset password link is sent to '+email + ' Please check your Email ');
            //setValidate({});
            setEmail('');
        }
        else  alert('Wrong Email');
        setValidate({});
    }


    return (
        // <div className="row g-0 auth-wrapper">
        <div>
           {/*  <div className="col-12 col-md-5 col-lg-6 h-100 auth-background-col">
                <div className="auth-background-holder"></div>
                <div className="auth-background-mask"></div>
            </div> */}

            {/* <div className="col-12 col-md-7 col-lg-6 auth-main-col text-center"> */}
                <div>
                {/* <div className="d-flex flex-column align-content-end"> */}
                <div >
                    {/* <div className="auth-body mx-auto"> */}
                    <div className="canvas">
                        {/* <p>Forgot Password</p> */}
                        {/* <div className="auth-form-container text-start"> */}
                        <div className='window'>
                            <header>
                                <h3 className="title">שכחתי סיסמה</h3>
                            </header>
                            <form
                            style={{"width":"530px"}}
                             className="auth-form" method="POST" onSubmit={forgotPassword} autoComplete={'off'}>
                            <div style={{"height":"30px","margin-top":"30px"}}>
                                <p> הכנס את הדוא"ל של החשבון שלך:</p>
                            </div>
                                <div className="username mb-3">
                                    <input type="username"
                                        className={`form-control ${validate.validate && validate.validate.email ? 'is-invalid ' : ''}`}
                                        id="email"
                                        name="email"
                                        value={email} required
                                        pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$"
                                        placeholder="email"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />

                                    <div className={`invalid-feedback text-start ${(validate.validate && validate.validate.email) ? 'd-block' : 'd-none'}`} >
                                        {(validate.validate && validate.validate.email) ? validate.validate.email[0] : ''}
                                    </div>
                                </div>

                                <div style={{"height":"80px"}}>
                                    <div className={(validate)?'d-block':'d-none'} style={{"margin-top":"20px"}}>
                                <p> נשלח דבר דואר לדוא"ל שלך עם קישור לאיפוס סיסמה </p>
                                </div>
                                </div>
                                
                                
                                <div className="text-center">
                                    <button style={{"width":"95%"}} type="submit" className="btn btn-primary w-100 theme-btn mx-auto">שלח קישור לדוא"ל שלי</button>
                                </div>
                            </form>

                            <hr style={{"margin":"20px"}}/>
                            {/* <div className="auth-option text-center pt-2"> */}
                            <div style={{"margin-top":"20px","margin-right":"15px","font-size":"25px"}}><FontAwesomeIcon icon={faArrowRight} />
                        <Link className="text-link" to="/login" > חזרה למסך ההתחברות </Link>
                                
                                        
                                
                            </div>
                            <div className="auth-option text-center pt-2">
                                <Link className="text-link" to="/reset-password" >
                                    reset password</Link>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Forgot;