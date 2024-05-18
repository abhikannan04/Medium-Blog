import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export interface Blogstype{
    content : string ,
    title : string ,
    id: number,
    author: {
        name: string
    }
}
export default function useBlogs() {
    const [loading , setLoading ] = useState(true);
    const [blogs , setblogs] = useState<Blogstype[]>([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
            headers: {
                Authorization: localStorage.getItem('token')
            },
        }).then((response) => {
            setblogs(response.data.blogs);
            setLoading(false) ;
        })
    },[])

    return {
        loading,
        blogs,
    }
};

export function useBlog({id} :{id:number}){
    const [loading,setLoading] = useState(true);
    const [blog,setBlog] = useState<Blogstype >();
    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{
            headers: {
                Authorization: localStorage.getItem('token'),
            },
        }).then((response) => {
            setBlog(response.data.blogwithId);
            setLoading(false) ;
        })
    },[id])

    return {
        loading,
        blog,
    }
}