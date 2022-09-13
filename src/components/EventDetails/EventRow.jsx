/*************************************
 ***  Made By Yohay Hackam         ***
 ***  mail: Yoman_321@hotmail.com  ***
 ***  054-2616626                  ***
 *************************************/

import { useContext, useState, useEffect } from 'react'
import { MyContext, EVENTS_TITLES } from '../../services/MyProvider';

export default function EventRow({ currentEventRaw, focusedEvent, disabledCheckBox, disabledFocus, setEventsToHandle }) {
  let focusedRaw = (currentEventRaw.event_id === focusedEvent.event_id);  //chack if current row is focused
  const { setFocusedEvent } = useContext(MyContext); //callback function to focus on Event
  const [value, setValue] = useState(currentEventRaw.event_id === focusedEvent.event_id)

  useEffect(() => {
    if (disabledCheckBox) setValue(false)
  }, [disabledCheckBox])

  useEffect(() => {

    setEventsToHandle(old =>
      (value) ?
        [...old.filter(eventId => eventId !== currentEventRaw.event_id), currentEventRaw.event_id]
        :
        [...old.filter(eventId => eventId !== currentEventRaw.event_id)]

    )
  }, [value])

  const handleRowClick = () => {
    if (!disabledFocus) {
      setValue(true);
      setFocusedEvent(currentEventRaw);
    }
  }

  return (

    <div className={`eventRow ${(focusedRaw) ? `focusedRaw focusedRawTrig${focusedEvent.trigger_id}` : (disabledFocus) ? "disabled" : ""}`}  >
      <p onClick={handleRowClick}> {EVENTS_TITLES['trig' + currentEventRaw.trigger_id]}</p>
      <p onClick={handleRowClick}> {(currentEventRaw.value)? currentEventRaw.value :""} {currentEventRaw.value_type}</p>
      <p onClick={handleRowClick}>{(Number(currentEventRaw.status) === 2) ? "סגור" : (currentEventRaw.status) ? "בטיפול" : "חדש"}</p>
      <label htmlFor={`update${currentEventRaw.event_id}`} className="detailsMiniLable" disabled={disabledCheckBox} >
        <input disabled={disabledCheckBox} type="checkbox" checked={value} onChange={() => setValue(state => !state)} id={`update${currentEventRaw.event_id}`} />צירוף&nbsp;טיפול</label>
    </div>

  )
}
