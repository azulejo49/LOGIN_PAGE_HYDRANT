/*************************************
 ***  Made By Yohay Hackam         ***
 ***  mail: Yoman_321@hotmail.com  ***
 ***  054-2616626                  ***
 *************************************/
// import PropTypes from 'prop-types';
import { useRef, useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { MyContext,EVENTS_TITLES } from '../../services/MyProvider';
import EventDetails from './EventDetails';
import TrigIcon from '../../components/TrigIcon/TrigIcon'


function EventDetailsWraper({isReversFlow}) {
  const { focusedEvent,setFocusedEvent } = useContext(MyContext); //Callback for Focus on diffrent Event
  const { setMapClasses } = useContext(MyContext);  //callback for Focus on diffrent Hydrant
  const { eventsArr } = useContext(MyContext); //Callback for Focus on diffrent Event
  const [eventDetailsClass, setEventDetailsClass] = useState('collapse'); //Show/hide EventDetails Screen
  const currentEvent = useRef({}); //temp varible to enable nice closing this Component 
  

  useEffect(() => //Toggle EventDetails & Map size when we have hydrant id & Event Trigger to focus on
  {
    if (focusedEvent?.trigger_id)   //if we have trigger event show the component
    {
      setMapClasses('mapEventDistailsDisplayPort') //smaller size Map
      setEventDetailsClass('') //Display Event Details Screen
    }
    else {
      setMapClasses('') //Hide event Details Screen
      setEventDetailsClass('collapse');//Fullsize Map

    }
  }, [focusedEvent]) //make sure component Visible evry Hydrant OR Trigger Change

  if (focusedEvent?.event_id) //if Event has event_id we focuse on 
  {
    currentEvent.current = eventsArr.filter(event => event.event_id === focusedEvent.event_id)[0];
    // console.log("current evet:",currentEvent.current)
  }

  // T.B.D - Show Hydrant information when no event
  return (
    <div className={`EventDetailsWraper ${eventDetailsClass}`} style={isReversFlow?{zIndex:51}:{}} >
      <header className={`HeaderTrig${focusedEvent?.trigger_id}`}>
        <div className={`HeaderWrapper`} >          
          {focusedEvent && <TrigIcon trigger={currentEvent.current.trigger_id} white={currentEvent.current.trigger_id===2}/>}
          <h2 >&nbsp;אירוע&nbsp;-&nbsp;</h2>
          <h4>{EVENTS_TITLES['trig' + currentEvent.current.trigger_id]}</h4>
        </div>
        <div className={`HeaderWrapper`}>
          <h5>{currentEvent.current.hydrant_id}&nbsp;#</h5>
          {!isReversFlow && <label className="dropUpMark" onClick={() => setFocusedEvent()} >
            <FontAwesomeIcon icon={faChevronUp} />
          </label>}
        </div>
      </header>
      <EventDetails event={currentEvent.current} disabledFocus={(isReversFlow)?true:false} />      
    </div>
  )

}

export default EventDetailsWraper

