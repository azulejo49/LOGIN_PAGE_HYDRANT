/*************************************
 ***  Made By Yohay Hackam         ***
 ***  mail: Yoman_321@hotmail.com  ***
 ***  054-2616626                  ***
 *************************************/

import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faCancel } from '@fortawesome/free-solid-svg-icons'

export default function ConfimDelete({ HandleRemoveData }) {

  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="window User-box">
      <header><h3>מחיקת משתמש</h3></header>
      <div className="User-box-content">
        <br />
        <h2>{location.state.data.user_name}</h2>
        <br />
        <h2 className="warning">האם אתה בטוח ?</h2>
        <br />
        <div className="btnContainer">          
            <button className='btn'
            onClick={()=> navigate(-1) }>לא&nbsp;
              <FontAwesomeIcon icon={faCancel} />
            </button>          
          <button className='btn' onClick={() =>{ HandleRemoveData(location.state.data.user_id);navigate("/users")}}>כן&nbsp;
            <FontAwesomeIcon icon={faCheck} />
          </button>
        </div>
      </div>

    </div>
  )
}
