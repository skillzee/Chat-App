import { useState } from "react"
import toast from "react-hot-toast"

const useSignup = () => {
    const [loading ,setLoading] = useState(false)

    const signUp = async ({fullName, username, password, confirmPassword, gender})=>{
        const success = handleInputErrors(fullName, username, password, confirmPassword, gender)

        setLoading(true)
        if(!success){
            return
        }

        try {
            const res = await fetch("http://localhost:5000/api/auth/signup", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({fullName, username, password, confirmPassword, gender})
            })

            const data = await res.json();
            console.log(data);
            if(data.error){
                throw new Error(data.error)
            }


            //Set the user in local storage and update the context
            
            
        } catch (error) {
            toast.error(error.message)
        }finally{
            setLoading(false)
        }
    }
    return {loading, signUp}
}

export default useSignup

function handleInputErrors(fullName, username, password, confirmPassword, gender){
    if(!fullName || !username || !password || !confirmPassword || !gender){
        toast.error("Please fill all the fields")
        return false
    }

    if(password !== confirmPassword){
        toast.error("Passwords do not match")
        return false;
    }


    if(password.length<6){
        toast.error("Password should be greater than 6")
        return false;
    }

    return true
}