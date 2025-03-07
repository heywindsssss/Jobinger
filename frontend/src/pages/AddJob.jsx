import { FormRow,FormRowSelect } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { useOutletContext } from 'react-router-dom';
import { JOB_STATUS, JOB_TYPE } from '../../../utils/constants';
import { Form, useNavigation, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';
// import { request } from 'express';

export const action =async({request})=>{
    console.log(request);
    const formData=await request.formData()
    const data=Object.fromEntries(formData)
    try {
        await customFetch.post('/jobs',data)
        toast.success('Job added successfully')
        return redirect('all-jobs')
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.data?.message)
        return error;
    }
    
}

const AddJob =()=>{
    const {user}=useOutletContext();
    const navigation=useNavigation()
    const isSubmitting=navigation.state==='submitting'
    return (
    <Wrapper>
        <Form method='post' className='form'>
            <h4 className='form-title'>add job</h4>
            <div className="form-center">
                <FormRow type='text' name='position'/>
                <FormRow type='text' name='company'/>
                <FormRow type='text' labelText='job location' name='jobLocation' defaultValue={user.location}/>
                <FormRowSelect labelText='job staus' name='jobStatus' defaultValue={JOB_STATUS.PENDING} list={Object.values(JOB_STATUS)}/>
                <FormRowSelect labelText='job type' name='jobType' defaultValue={JOB_TYPE.FULL_TIME} list={Object.values(JOB_TYPE)}/>
                <button type='submit' 
                className='btn btn-block form-btn' 
                disabled={isSubmitting}>{isSubmitting?'submitting':'submit'}
                </button>
            </div>
        </Form>
    </Wrapper> 
    )
}
export default AddJob;