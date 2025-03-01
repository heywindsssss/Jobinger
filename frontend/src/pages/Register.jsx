import { Form, redirect, useNavigation, Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { FormRow, Logo } from '../components';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';


export const action = async (request)=>{
    console.log(request);
    
    const formData=await request.request.formData();
    // console.log(formData);
    const data=Object.fromEntries(formData)
    try {
        await customFetch.post('/auth/register',data)
        toast.success('User registered successfully')
        return redirect('/login');
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message)
        return error;
    }
    
}

const Register =()=>{
    const navigation=useNavigation()
    console.log(navigation);
    const isSubmitting=navigation.state==='submitting'
    return (
        <Wrapper>
            <Form method='post'  className="form">
                <Logo/>
                <h4>Register</h4>
                <FormRow type='text' name='firstName' labelText='First name' />
                <FormRow type='text' name='lastName'  labelText='last name'/>
                <FormRow type='text' name='location' labelText='location'/>
                <FormRow type='email' name='email'  />
                <FormRow type='password' name='password' />
                <button type="submit" className="btn btn-block" disabled={isSubmitting}>{isSubmitting ? 'submitting...':'submit'}</button>
                <p>
                    Already a member ?
                    <Link to='/login' className="member-btn">Login</Link>

                </p>

            </Form>
        </Wrapper>
        
    )
}
export default Register;