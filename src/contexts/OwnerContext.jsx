import { createContext, useContext, useEffect, useState } from "react";

const OwnerContext = createContext();

const useOwnerContext = ()=>useContext(OwnerContext);

export const OwnerProvider = ({children})=>{
    const [owners,setOwners] = useState([]);
    const fetchOwners = async()=>{
        const token = localStorage.getItem("userToken")
        try{
            const response = await fetch("http://localhost:4000/users",{
                headers:{
                    Authorization : `Bearer ${token}`,
                    "Content-Type":"application/json",
                }
            })
            const data = await response.json();
            if(!response.ok){
                throw new Error("Failed to fetch owners");
            }
            console.log("Owners",data);
            setOwners(data);
        }catch(err){
            console.log(err);
            throw err;
        }
    }
    useEffect(()=>{
        fetchOwners();
    },[]);
    return(
        <OwnerContext.Provider value={{owners}}>{children}</OwnerContext.Provider>
    )
}

export default useOwnerContext;