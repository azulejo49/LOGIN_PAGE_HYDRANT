import { useContext } from 'react'
import UserPreferences from './UserPreferences'
import SideBar from './SideBar'
import Logo from '../../assets/logos/i-jet.png'
import { MyContext } from '../../services/MyProvider'
import { useState, useEffect } from 'react'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import HeaderAlert from './HeaderAlert'
export default function Header() {

  const { userInfo } = useContext(MyContext)
 

  return (
    <header>      
      <div className='topLine' />
      {userInfo &&<HeaderAlert  />}
      {userInfo && <div className="currentDet">
        <img src={userInfo && userInfo.customer_logo} alt={`לוגו ${userInfo && userInfo.customer_name}`} className="clientLogo" />
        <div className="corps">
          <div className="corpName">
            <h1>{userInfo && userInfo.customer_name}</h1>
          </div>
          <UserPreferences />
        </div>
      </div>
      }
      <img src={Logo} className="compLogo" alt="I-JET logo" />
      <SideBar />
    </header>
  )
}