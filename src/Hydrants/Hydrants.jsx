import React, { useState, useContext, useEffect } from 'react'
// import PropTypes from 'prop-types'
import { MyContext } from '../services/MyProvider'
import FatchDataApi from '../services/FatchDataApi';
import MyNotification from '../services/MyNotification'
import AddHydrant from './AddHydrant';
import HydrantsTable from './HydrantsTable';
import usePageTitle from '../services/usePageTitle';
import './hydrants.css'

function Hydrants() {

  const { accessToken, hydrantArr, setHydrantArr, setIsLoading } = useContext(MyContext);
  usePageTitle("ברזי כיבוי אש");

  const [openAdd, setOpenAdd] = useState(false);


  useEffect(() => {
    //Show Loading component on data undifiend
    if (!hydrantArr)
      setIsLoading(true)

    const HandleReject = (error) => {
      setIsLoading(false)
    }
    //callback to update data from server
    const handleLoadHydrants = (hydrants) => {
      setIsLoading(false) //Hide Loading component
      setHydrantArr(hydrants) //update data 
    }

    if (accessToken && !hydrantArr) {
      FatchDataApi('hydrants', 'GET', accessToken, handleLoadHydrants, { onReject: HandleReject });
    }
  }, [hydrantArr, accessToken]);


  const handleAddHydrant = (hydrant) => {
    function addHydrant(responseHydrant) {
      setHydrantArr([responseHydrant.newHydrant, ...hydrantArr]);
      MyNotification('light', `ברז כיבוי אש ${responseHydrant.newHydrant.hydrant_id} נוסף בהצלחה`);
      // navigate('/hydrants');
    }
    FatchDataApi('hydrants/add', 'POST', accessToken, addHydrant, { payload: hydrant, errorMsgTitle: "שגיאה ביצירת ברז כיבוי אש" ,onReject: ()=>{setHydrantArr([...hydrantArr])}});
  }



  return (
    <>
      <div className="screen-header">
        <h1 className="header-title">ניהול&nbsp;ברזי&nbsp;כיבוי&nbsp;אש</h1>
        <div className='header-button-wraper'>
          <button className="btn" title="הוספת ברז כיבוי אש" onClick={() => setOpenAdd(true)}>ברז&nbsp;כיבוי&nbsp;אש&nbsp;חדש</button>
          {openAdd && <AddHydrant handleAddHydrant={handleAddHydrant} setOpenAdd={setOpenAdd} />}
        </div>
      </div>
      {hydrantArr && <HydrantsTable handleAddHydrant={handleAddHydrant} />}
      <div className='cover'></div>

    </>
  )
}

// Hydrants.propTypes = {}

export default Hydrants
