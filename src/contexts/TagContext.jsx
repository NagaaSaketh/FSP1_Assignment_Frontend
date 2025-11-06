import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
const TagContext = createContext();

const useTagContext = () => useContext(TagContext);

export const TagProvider = ({ children }) => {
  const [tags, setTags] = useState([]);
  const fetchTags = async () => {
    const token = localStorage.getItem("userToken");
    try {
      const response = await fetch("http://localhost:4000/tags", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error("Failed to fetch tags");
      }
      console.log("Tags", data);
      setTags(data);
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const createTags = async(name)=>{
    if(!name){
      toast.error("Please provide tag name");
    }
    const newTag = {
      name
    }
    try{
      const response = await fetch("http://localhost:4000/tags",{
        method:"POST",
        headers:{
          Authorization:`Bearer ${localStorage.getItem("userToken")}`,
          "Content-Type":"application/json",
        },
        body:JSON.stringify(newTag)
      })
      const data = await response.json();
      if(!response.ok){
        throw new Error("Failed to create tag")
      }
      setTags(data);
      toast.success("Tag created successfully")
      await fetchTags();
      
    }catch(err){
      console.log(err);
      throw err;
    }
  }


  return <TagContext.Provider value={{ tags,createTags }}>{children}</TagContext.Provider>;
};

export default useTagContext;
