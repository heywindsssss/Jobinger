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
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aut dolor, esse perspiciatis laudantium reprehenderit voluptatibus incidunt atque assumenda, 
                        officiis modi dolorum necessitatibus velit quis rerum. Mollitia repellendus cupiditate sint temporibus.</p>
                    <Link to='/register' className='btn register-link'>Register </Link>
                    <Link to='/login' className='btn register-link'>Login / Demo user</Link>
                </div>
                <img src={main} alt='job hunt' className='img main-img' />
            </div>
        </Wrapper>
        
    )
   
}
export default Landing;