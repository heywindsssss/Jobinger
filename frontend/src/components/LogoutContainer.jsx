import Wrapper from '../assets/wrappers/LogoutContainer'
import { useDashboardContext } from '../pages/DashboardLayout'
import { useState } from 'react'
import { FaCaretDown, FaUserCircle } from 'react-icons/fa'

const LogoutContainer = () => {
    const [showLogout,setShowLogout]=useState(false)
    const{user,logoutUser}=useDashboardContext();
    // console.log("User Data in LogoutContainer:", user);
    if (!user) {
      return <p>Loading user...</p>; // Prevents crashing
  }
  return (
    <Wrapper>
        <button type='button' 
        className='btn logout-btn' 
        onClick={()=>{setShowLogout(!showLogout)}}>
          {user.avatar ? (
          <img src={user.avatar} alt='avatar' className='img' />
        ) : (
          <FaUserCircle />
        )}
        {user?.firstName}
        <FaCaretDown />
        </button>
        <div className={showLogout?'dropdown show-dropdown':'dropdown'}>
            <button type='button' className='dropdown-btn' onClick={logoutUser}>Logout</button>
        </div>
    </Wrapper>
  )
}

export default LogoutContainer;