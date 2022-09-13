import  {useContext, useEffect} from 'react'
import {useLocation} from 'react-router-dom';
import {MyContext} from './MyProvider';

function usePageTitle(title) {
    const {userInfo} = useContext(MyContext);
    const location = useLocation();

    useEffect(() => {
      if(userInfo) {
        document.title = `I-Jet | ${userInfo.customer_name} - ${title}`;
      }
    }, [location, userInfo]); 

}

export default usePageTitle