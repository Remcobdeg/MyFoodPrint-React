import { useState, useCallback} from 'react';
import axios from 'axios';

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const sendRequest = useCallback(
    async (url, method = 'get', data = null, headers = {"Content-type": "application/json"}) => {
      setIsLoading(true);
      try {
        const response = await axios({
          method: method,
          url: process.env.REACT_APP_BACKEND_URL + url, //http://192.168.100.1:5000/api
          data: data,
          headers: headers
        });        
        setIsLoading(false); //needs to come before login, otherwise it sets a state in the wrong screen!
        return response;
      } catch(error) {
        setIsLoading(false);
        if (error.response) {
          // Request made and server responded
          console.log(error.response.data);
          setError(error.response.data.message);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
          setError(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
          setError(error.message);
        }
      };
    },
    []
  );

  return { isLoading, error, sendRequest};
};
