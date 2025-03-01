import { Outlet, useNavigate,useLoaderData,redirect } from "react-router-dom";
import Wrapper from "../assets/wrappers/Dashboard";
import { BigSidebar, SmallSidebar ,Navbar} from "../components";
import { createContext, useContext, useState } from "react";
import { checkDefaultTheme } from "../App";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";


export const loader = async () => {
    try {
        const { data } = await customFetch.get("/users/current-user");
        // console.log("🛠️ Full API Response:", data);

        if (!data || !data.user) {
            // console.error("❌ API returned unexpected data:", data);
            toast.error(" ❌  User doesn't exists")
            return redirect("/");
        }

        return { user: data.user }; // Extract `user` correctly
    } catch (error) {
        console.error("❌ Error in loader:", error);
        // const errorMessage = error?.response?.data?.message || error.message || "An error occurred"; // Extract error message
        toast.error(error?.response?.data?.message)
        return { error};
    }
};


const DashboardContext=createContext();


const DashboardLayout =({isDarkThemeEnabled})=>{
    const { user } = useLoaderData();
// console.log("📌 User Data in DashboardLayout:", user);

    const navigate=useNavigate();
    const[showSidebar,setShowSidebar]=useState(true)
    const[isDarkTheme,setIsDarkTheme]=useState(checkDefaultTheme())
    const toggleDarkTheme=()=>{
        console.log('toggle dark theme ');
        const newDarkTheme = !isDarkTheme
        setIsDarkTheme(newDarkTheme)
        document.body.classList.toggle('dark-theme',newDarkTheme)
        localStorage.setItem('darkTheme',newDarkTheme)
    }
    const toggleSidebar=()=>{
        setShowSidebar(!showSidebar);
    };

    const logoutUser=async()=>{
        navigate('/')
        await customFetch.get('/auth/logout')
        toast.success('logged out successfully')
    };


    return (
        <DashboardContext.Provider
        value={{
            user,
            showSidebar,
            isDarkTheme,
            toggleDarkTheme,
            toggleSidebar,
            logoutUser}}>
        <Wrapper>
            <main className="dashboard">
                <SmallSidebar/>
                <BigSidebar/>
                <div>
                    <Navbar/>
                    <div className="dashboard-page">
                        <Outlet context={{user}}/>
                    </div>
                </div>
            </main>
            
        </Wrapper>
        </DashboardContext.Provider>
        
    )
}

export const useDashboardContext=()=>useContext(DashboardContext);
export default DashboardLayout;