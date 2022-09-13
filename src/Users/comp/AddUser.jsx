/*************************************
 ***  Made By Yohay Hackam         ***
 ***  mail: Yoman_321@hotmail.com  ***
 ***  054-2616626                  ***
 *************************************/

import { MyContext } from '../../services/MyProvider';
import { useState, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressCard, faCancel } from '@fortawesome/free-solid-svg-icons'
import { uploadImage } from '../../services/firebase'
import MyNotification from '../../services/MyNotification'
import avatar from '../../assets/logos/avatar.jpg'



function AddUser({ HandleAddData }) {

  const { profiles } = useContext(MyContext)

  const navigate = useNavigate(); //redirect on add /cancel

  const [username, setUsername] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [customerUserId, setCustomerUserId] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [profileId, setProfileId] = useState("")
  const [pictureUrl, setPictureUrl] = useState("")


  const HandleAddUserSubmit = (e) => {
    e.preventDefault()
    // Callback function from User module to update data on server 
    if (password !== confirmPassword)
      MyNotification('red', 'אימות נתונים', 'אימות סיסמה אינו זהה')
    else {
      HandleAddData({
        username: username,
        first_name: firstName,
        last_name: lastName,
        customer_user_id: customerUserId,
        password: password,
        phone: phone,
        email: email,
        profile_id: profileId,
        picture_url: pictureUrl,
      })
      //after update redirect back to Users screen
      navigate("/users")
    }
  }


  return (
    <div className="window" >

      <header>
        <h3 className='title'>יצירת משתמש</h3>
      </header>
      <form className="editForm" onSubmit={e => HandleAddUserSubmit(e)} >

        <fieldset>
          <label
            htmlFor='userType'>פרופיל משתמש: </label>
          <select id='userType' name='userType'
            style={{ justifySelf: "center" }}
            required
            value={profileId}
            onChange={(e) => setProfileId(e.target.value)} >
            <option value="" disabled>בחר פרופיל</option>
            {profiles ? profiles.map((profile, idx) => {
              return <option key={idx} value={profile.profile_id}>{profile.name}</option>
            }) : <></>}
          </select>
        </fieldset>

        <fieldset>
          <label htmlFor='pictureUrl'>תמונת משתמש:</label>
          <label htmlFor='pictureUrl'
            style={{ justifySelf: "center" }}
            title='לחץ להעלאת תמונת משתמש'>
            <div className='userLogoWraper'>
              <div className='userLogoMask'  style={(pictureUrl)? {border:"2px solid transparent"} :{border:"2px dashed var(--gray)"} }/>
                <img className='userLogo' src={(pictureUrl)? pictureUrl :avatar} alt={`תמונת משתמש`} />
            </div>
          </label>
          <input type="file" id='pictureUrl' name='pictureUrl' accept="image/*"
            onChange={(e) => uploadImage(e.target.files[0], "users", setPictureUrl)} >
          </input>
        </fieldset>

        <fieldset>
          <label htmlFor='firstName'>שם פרטי:</label>
          <input type="text" id='firstName' name='firstName' required placeholder='הזן שם פרטי'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)} />
        </fieldset>

        <fieldset>
          <label htmlFor='lastName'>שם משפחה:</label>
          <input type="text" id='lastName' name='lastName' required placeholder='הזן שם משפחה'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)} />
        </fieldset>


        <fieldset>
          <label htmlFor='customerUserId'>משתמש חיצוני:</label>
          <input type="text" id='customerUserId' name='customerUserId' required placeholder='משתמש בתוך הארגון'
            value={customerUserId}
            onChange={(e) => setCustomerUserId(e.target.value)} />
        </fieldset>


        <fieldset>
          <label htmlFor='phone'>טלפון:</label>
          <input type="tel" id='phone' name='phone'
            required
            placeholder='הזן טלפון'
            value={phone}
            pattern="^[0-9]*[\-]?[0-9]*$"
            onChange={(e) => setPhone(e.target.value)} />
        </fieldset>

        <fieldset>
          <label htmlFor='email'>מייל:</label>
          <input type="email" id='email' name='email' required placeholder='הזן אימייל'
            value={email}
            onChange={(e) => setEmail(e.target.value)} />
        </fieldset>

        <fieldset>
          <label htmlFor='username'>שם המשתמש:</label>
          <input type="text" id='username' name='username' required placeholder='הזן שם משתמש'
            value={username}
            onChange={(e) => setUsername(e.target.value)} />
        </fieldset>

        <fieldset>
          <label htmlFor='password'>סיסמה:</label>
          <input type="password" id='password' name='password' required
            placeholder='הזן סיסמה'
            value={password}
            onChange={(e) => setPassword(e.target.value)} />
        </fieldset>
        <fieldset>
          <label htmlFor='confirmPassword'>אימות סיסמה:</label>
          <input type="password" id='confirmPassword' name='confirmPassword' required
            placeholder='חזור על הסיסמה'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)} />
        </fieldset>



        <div className='btnContainer'>
          <button className="btn" type="cancel"
            onClick={(e) => { e.preventDefault(); navigate("/Users") }}>בטל&nbsp;
            <FontAwesomeIcon icon={faCancel} />
          </button>
          <button className="btn" type="submit">שמור&nbsp;
            <FontAwesomeIcon icon={faAddressCard} />
          </button>
        </div>


      </form>
    </div>
  )
}

export default AddUser;