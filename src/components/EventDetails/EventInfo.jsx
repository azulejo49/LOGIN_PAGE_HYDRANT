/*************************************
 ***  Made By Yohay Hackam         ***
 ***  mail: Yoman_321@hotmail.com  ***
 ***  054-2616626                  ***
 *************************************/

import { useContext } from 'react'
import { MyContext } from '../../services/MyProvider';
import EventHistoryHandles from './EventHistoryHandles';

export default function EventInfo({ focusedEvent ,invoke }) {

  const { hydrantArr,alertsArr } = useContext(MyContext); //all Hydrants
  //we seek the relevent Hydrant to get is address details
  const hydrantFromArr = hydrantArr?.find(hydrant => hydrant.hydrant_id === focusedEvent.hydrant_id);
  const alertFromArr = alertsArr?.find(alert => alert.alert_id === focusedEvent.alert_id);


  return (
    <div className="eventInfo" >
      <h4>פרטי האירוע</h4>
      <div className="DetailsGrid">
      
        <label className="detailsMiniLable">כתובת&nbsp;:</label>
        {
          (hydrantFromArr) ?
            <p>{hydrantFromArr.street}&nbsp;{hydrantFromArr.number}</p> : <p>לא נמצאה כתובת</p>
        }
        

        <label className="detailsMiniLable">מועד&nbsp;פתיחה&nbsp;:</label>
        <p>{focusedEvent.datetime_created}</p>
        {/* {
          ([1,2,5,7].includes(focusedEvent?.trigger_id)) ?
            <>
              <label className="detailsMiniLable">ערך&nbsp;מדידה&nbsp;:</label>
              <p>{focusedEvent.value}&nbsp;{focusedEvent.value_type}</p>
            </> : <></>
        } */}
        
        <label className="detailsMiniLable">סטטוס&nbsp;אירוע&nbsp;:</label>
        <p> {(Number(focusedEvent.status) === 2) ? "סגור" : (focusedEvent.status) ? "בטיפול" : "חדש"} </p>
        
        <label className="detailsMiniLable">סטטוס התראה&nbsp;:</label>
        {
          (alertFromArr) ?
            <p>פתוחה</p> : <p>סגורה</p>
        }
      
      </div>
      {focusedEvent.handle_id && <EventHistoryHandles event_id={focusedEvent.event_id} invoke={invoke}/>}
    </div>

  )
}
