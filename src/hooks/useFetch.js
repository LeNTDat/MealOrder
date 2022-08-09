import axios from "axios";
import { useCallback, useState } from "react";

const useFetch = () =>{
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    const fetchMealApi = useCallback(async (bundleOfLink,getData) => {
        try {
            const res = await axios({
                method: bundleOfLink.method ? bundleOfLink.method : 'GET',
                url: bundleOfLink.url,
                params:bundleOfLink.params ? bundleOfLink.params : {},
                headers:bundleOfLink.headers ? bundleOfLink.headers : {}
            });
            console.log(res.data)
            const data = await res.data;
            if (res.status === 200) {
                getData(data);
                setIsLoading(false);
            } else {
                throw new Error('Something when wrong !!!');
            }
        } catch (error) {
            setIsLoading(false);
            setHttpError(error.message);
        }
    },[]);

    return{
        isLoading,
        httpError,
        fetchMealApi
    }
    
};

export default useFetch;