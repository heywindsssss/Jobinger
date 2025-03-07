import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { redirect } from "react-router-dom";

export const action= async ({params,request}) => {
    // console.log(params);
    try {
        await customFetch.delete(`/jobs/${params.id}`)
        toast.success("Job deleted Successfully")
    } catch (error) {
        toast.error(error?.response?.data?.data?.message)
    }
    return redirect('/dashboard/all-jobs')
}

const DeleteJob =()=>{
    return (
        <h1>DeleteJob</h1>
    )
}
export default DeleteJob;