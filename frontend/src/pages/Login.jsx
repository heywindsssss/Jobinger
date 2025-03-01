import { Link, Form, redirect, useNavigation,useActionData, useNavigate } from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { FormRow, Logo } from '../components';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

export const action=async({request})=>{
    console.log(request);
    // console.log(request.request);
    
    const loginData=await request.formData();
    const data=Object.fromEntries(loginData);

    // const errors={message:""}
    // if(data.password.length<3){
    //     errors.message='password too short'
    //     return errors;
    // }
    
    try {
        await customFetch.post('/auth/login',data)
        toast.success('Login successful')
        return redirect('/dashboard');
    } catch (error) {
        toast.error(error?.response?.data?.message)
        return error;
    }
    // return null;
}

const Login =()=>{
    const navigation=useNavigation();
    const navigate=useNavigate();
    const isSubmitting=navigation.state==='submitting'
    const loginDemoUser=async()=>{
        const data={
            email: "speak2manager@notagain.com",
            password: "NoRefunds4U!",
        };
        try {
            await customFetch.post('/auth/login',data)
            toast.success('Your Demo is active now')
            navigate('/dashboard')
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }
    // const errors=useActionData();
    return (
        <Wrapper>
        <Form method='post' className="form">
            <Logo/>
            <h4>login</h4>
            {/* {errors?.message && <p style={{color:'red'}}>{errors.message}</p>} */}
            <FormRow type='email' name='email' labelText='email' />
            <FormRow type='password' name='password' labelText='password' />
            <button type="submit" className="btn btn-block" disabled={isSubmitting}>{isSubmitting?'submitting':'submit'}</button>
            <button type="button" className="btn btn-block" onClick={loginDemoUser}>Take demo</button>
            <p>Not a member yet ?<Link to="/register" className="member-btn">Register</Link></p>
            
        </Form>
        
        </Wrapper>
    );
};
export default Login;