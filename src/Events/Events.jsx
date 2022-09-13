import React, { useContext, useEffect} from 'react'
import { MyContext } from '../services/MyProvider'
import FatchDataApi from '../services/FatchDataApi';
import usePageTitle from '../services/usePageTitle';
import EventsTable from './EventsTable';

function Events() {

    const {  accessToken, eventsArr, setEventsArr, setIsLoading} = useContext(MyContext);
    usePageTitle("ארועים");
    
    useEffect(() =>{
        const HandleLoadEventsArr = (events)=>{
            setEventsArr(events);
            setIsLoading(false);
        }

        if (!eventsArr)
            setIsLoading(true)
        //callback to handle response error
        const HandleReject=(error)=> {
            setIsLoading(false)
        }            
        if (accessToken && !eventsArr){
            FatchDataApi('events', 'GET', accessToken, HandleLoadEventsArr, { onReject: HandleReject });
        } 
    }, [eventsArr, accessToken]);
    
  return (
    <>
        <div className="screen-header">
            <h1 className="header-title">אירועים</h1>
        </div>
            {(eventsArr)&& <EventsTable eventsArr={eventsArr} /> }
    </>
  )
}

// Events.propTypes = {}

export default Events