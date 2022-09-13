/*************************************
 ***  Made By Yohay Hackam         ***
 ***  mail: Yoman_321@hotmail.com  ***
 ***  054-2616626                  ***
 *************************************/

import DisplayMap from "../components/map/DisplayMap";
import RightBox from "../components/RightBox/RightBox";
import { useEffect, useContext } from 'react';
import EventDetailsWraper from '../components/EventDetails/EventDetailsWraper';
import { MyContext } from '../services/MyProvider';
import usePageTitle from '../services/usePageTitle';
import ReverseWarning from "../components/ReverseWarning/ReverseWarning";
import FatchDataApi from '../services/FatchDataApi';


function MainScreen() {

  usePageTitle("מסך ראשי");

  const {
    userInfo, accessToken, eventsArr,setIsLoading,
    isReversFlow, setIsReverseFlow,
    isMuted, setIsMuted } = useContext(MyContext);


  useEffect(() => {
    if (!userInfo) setIsLoading(true)

    if (userInfo && accessToken && eventsArr)
      setIsLoading(false)

  })

  // handle new reverse fow event
  useEffect(() => {
    const temp = eventsArr?.find(event => (event.trigger_id === 2 && event.status === 0))
    if (!temp) {
      setIsMuted(false)      
    }
      setIsReverseFlow(temp)
  }, [eventsArr])


  // ****************************************************
  //                     JSX Return                 
  // ****************************************************

  return (
    <>
      {isReversFlow && (!isMuted) && <ReverseWarning event={isReversFlow} />}
      <div className="canvas" >
        {/* <!---- Events/Alerts area  ----> */}
        {isReversFlow && (isMuted) && <div className="background-block-dark" />}
        <RightBox />
        <div id="mapContainer">
          {/* Event Handling Screen display when we have event to focuse on: */}
          <EventDetailsWraper isReversFlow={isReversFlow} />
          {/* --- Google Map API container --- */}
          <DisplayMap />
        </div>
      </div>
    </>
  );
}

export default MainScreen;
