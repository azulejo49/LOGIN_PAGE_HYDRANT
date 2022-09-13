/*************************************
 ***  Made By Yohay Hackam         ***
 ***  mail: Yoman_321@hotmail.com  ***
 ***  054-2616626                  ***
 *************************************/

// import PropTypes from 'prop-types';
import { useState, useContext, useEffect } from 'react';
import { MyContext } from '../../services/MyProvider';

export default function Event({ currentEvent, eventGroupId }) {

    const { hydrantArr } = useContext(MyContext);//all Hydrants
    const { focusedEvent, setFocusedEvent } = useContext(MyContext); //callback function to focus on Event    
    let hydrantFromArr = hydrantArr?.filter(hydrant => hydrant.hydrant_id === currentEvent.hydrant_id); //event Hydrant details
    let address = (hydrantFromArr && hydrantFromArr[0]) ? hydrantFromArr[0].street + '\xa0' + hydrantFromArr[0].number : "לא נמצאה כתובת ההידרנט";  //\xa0 == &nbsp; (non-breaking space)
    const [eventStatus, setEventStatus] = useState(`event`);

    useEffect(() => { setEventStatus((currentEvent?.event_id === focusedEvent?.event_id) ? "focusedEvent" : "") }, [focusedEvent]
    )

    return (
        <div className={`event ${eventStatus}`} id={currentEvent.hydrant_id} onClick={() => setFocusedEvent(currentEvent)}>
            <div>
                <p className="eventHydantId" id={eventGroupId}>{currentEvent.hydrant_id}</p>
            </div>
            <p className="eventInfoLine">
                {(currentEvent.datetime_updated) ? currentEvent.datetime_updated : currentEvent.datetime_created}
                <br />
                {address}
            </p>

            {currentEvent.value > 0 &&
                <p className='eventValue'>
                    {currentEvent.value}
                    <br />
                    {currentEvent.value_type}
                </p>
            }


        </div>
    )
}

// Event.propType={
//     HydrantId:PropTypes.number,
//     address:PropTypes.string,
//     trigger:PropTypes.number,
//     dateTime:PropTypes.string
// }