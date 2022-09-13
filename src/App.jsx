/*************************************
 ***  Made By Yohay Hackam         ***
 ***  mail: Yoman_321@hotmail.com  ***
 ***  054-2616626                  ***
 *************************************/

import { useContext } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { MyContext,EVENTS_TITLES } from "./services/MyProvider"
import Header from "./components/Header/Header"
// import Login from './auth/Login'
import Login from './views/Login'
import Forgot from './views/Forgot';
import ResetPassword from './views/Reset';
import ResetOldPassword from './views/Resetold';
import MainScreen from './MainScreen/MainScreen'
import Customers from './Customers/Customers'
import Profiles from './Profiles/Profiles'
import Users from "./Users/Users"
import ViewParameters from "./Parameters/ViewParameters"
import RefreshJwtToken from "./services/RefreshJwtToken"
import Hydrants from './Hydrants/Hydrants'
import Events from './Events/Events'
import { Notifications } from 'react-push-notification';
import EventHandling from "./EventHandling/EventHandling";
import { Wrapper } from "@googlemaps/react-wrapper";
import Loading from "./components/Loading/Loading";
import NotFound from "./components/NotFound/NotFound";
import FilteredTablePage from "./Events/FilteredTablePage"
import GetUpdated from "./services/GetUpdated"

export default function App() {

    const { REACT_APP_MAP_TOKEN } = process.env
    const { userInfo, isLoading } = useContext(MyContext);
    

    return (

        <BrowserRouter>
            <Notifications />
            <div className="App" dir="rtl">
                {isLoading && <Loading />}
                <Header />
                <Wrapper apiKey={REACT_APP_MAP_TOKEN} language={"iw"} >
                
                <Routes>
                    <Route path="/" element={userInfo?.ui_access_list.main ?
                            <MainScreen />
                            :
                            userInfo?.ui_access_list.handling ? <EventHandling />
                            :
                            <></>} />
                    <Route path="/handling" element={<EventHandling />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/forgot" element={<Forgot />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/reset-old-password" element={<ResetOldPassword />} />
                    <Route path="/Customers/*" element={<Customers />} />
                    <Route path="/profiles/*" element={<Profiles />} />
                    <Route path="/users/*" element={<Users />} />
                    <Route path="/parameters/*" element={<ViewParameters />} />
                    <Route path="/hydrants" element={<Hydrants />} />
                    <Route path="/events" element={<Events />} />
                    <Route path="/flow" element={<FilteredTablePage title={EVENTS_TITLES.trig1} trigger={1} />} />
                    <Route path="/reverse" element={<FilteredTablePage title={EVENTS_TITLES.trig2} trigger={2} />} />
                    <Route path="/vandalisem" element={<FilteredTablePage title={EVENTS_TITLES.trig3} trigger={3} />} />
                    <Route path="/battery" element={<FilteredTablePage title={EVENTS_TITLES.trig5} trigger={5} />} />
                    <Route path="/lifeSignal" element={<FilteredTablePage title={EVENTS_TITLES.trig6} trigger={6} />} />
                    <Route path="/pressure" element={<FilteredTablePage title={EVENTS_TITLES.trig7} trigger={7} />} />
                    
                    <Route path="*" element={<NotFound />} />
                </Routes>
                </Wrapper>
            </div>
            {userInfo && <GetUpdated/>}
            <RefreshJwtToken />
        </BrowserRouter>
    )
}
