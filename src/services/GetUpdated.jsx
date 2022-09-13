import { useRef, useEffect, useContext } from 'react';
import { MyContext } from '../services/MyProvider';
import FatchDataApi from '../services/FatchDataApi';


export default function GetUpdated() {

    const { userInfo, accessToken, setEventsArr, setAlertsArr, setHydrantArr } = useContext(MyContext);

    //Pointer for Refresh Data Interval 
    const refreshDataInterval = useRef()

    // ****************************************************
    //        Initslize data from server   (Run Once) 
    // ****************************************************
    useEffect(() => {  //fetch Inital Data from server (Run Once)
        if (accessToken) //if no login info in local storage redirect to login screen
        {
            FatchDataApi('hydrants/active', 'GET', accessToken, setHydrantArr)
            FatchDataApi('events', 'GET', accessToken, setEventsArr)
            FatchDataApi('alerts', 'GET', accessToken, setAlertsArr)
            FatchDataApi('hydrants', 'GET', accessToken, setHydrantArr)
        }
        // else
        //     redirect('/login')
    }, [])// eslint-disable-line react-hooks/exhaustive-deps


    // ****************************************************
    //    INTERVAL UPDATES EVENTS ARRAY   &  Handle NEW Token                    
    // ****************************************************  
    useEffect(() => {
        let isMounted = true;
        // INTERVAL UPDATES EVENTS ARRAY                                
        const refreshEvents = (interval) => {
            return setInterval(() => {
                FatchDataApi('events', 'GET', accessToken, setEventsArr)
                FatchDataApi('alerts', 'GET', accessToken, handleNewAlerts)
            }, interval) //Interval between each Fatch
        }
        const handleNewAlerts = (response) => {
            if (isMounted)
                setAlertsArr(oldAlertsArr => {
                    //check for new alert id in response 
                    const newAlerts = response.filter(newAlert => !oldAlertsArr?.find(alert => alert.alert_id === newAlert.alert_id)).map(alert => alert.hydrant_id)
                    // check that all new alerts hydrant's are activated 
                    if (newAlerts.length)
                        setHydrantArr(oldHydrantsArr => oldHydrantsArr?.map(hydrant => (newAlerts.includes(hydrant.hydrant_id) && hydrant.status === 0) ? { ...hydrant, status: 1 } : hydrant))
                    return response
                })
        }

        //Handle NEW Token   
        if (accessToken && userInfo?.refresh_timeout) { //if can't find user data redicrect to login

            clearInterval(refreshDataInterval.current) //Clear old fatch data intervals 
            refreshDataInterval.current = refreshEvents(userInfo.refresh_timeout) //Interval fatch Updated data from server
        }
        else // redicrect to Login Screen if can't find user data
            clearInterval(refreshDataInterval.current) //Clear old fatch data intervals   

        return () => {
            isMounted = false;
            clearInterval(refreshDataInterval.current) //Clear old fatch data intervals   
        }
    }, [accessToken])




    return null
}
