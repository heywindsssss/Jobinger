import styled from 'styled-components'
import Wrapper from '../assets/wrappers/LandingPage';
import main from '../assets/images/main.svg'
import logo from '../assets/images/logo.svg'
import { Link } from 'react-router-dom';
import { Logo } from '../components';



const Landing =()=>{
    return(
        <Wrapper>
            <nav>
                <Logo/>
            </nav>
            <div className="container page">
                <div className="info">
                    <h1>
                        Job <span>Tracking</span> App
                    </h1>
                    <p>Reduce the stress of job hunting. Our app simplifies the process by providing a clear overview of your progress. Gain peace of mind knowing you're in control of your career search.</p>
                    <Link to='/register' className='btn register-link'>Register </Link>
                    <Link to='/login' className='btn register-link'>Login / Demo user</Link>
                </div>
                <img src={main} alt='job hunt' className='img main-img' />
            </div>
        </Wrapper>
        
    )
   
}
export default Landing;