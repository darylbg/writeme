import React, {createContext, useEffect, useState} from 'react';
import axios from 'axios';

const AiContext = createContext();

function AiContextProvider({ children }) {
    const [aiApiData, setAiApiData] = useState([]);
    const [isAiDataLoading, setIsAiDataLoading] = useState(false);

    const api_key = process.env.REACT_APP_API_KEY;
    const host_key = process.env.REACT_APP_HOST_KEY;

    const handleAiApiCall = async (query) => {
      setIsAiDataLoading(true);
      const options = {
        method: 'POST',
        url: 'https://chatgpt-ai-chat-bot.p.rapidapi.com/ask',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': api_key, 
          'X-RapidAPI-Host': host_key
        },
        data: query
      };
      
      try {
        const response = await axios.request(options);
        setAiApiData(response.data);
        console.log('response.data', response.data)
        // console.log('ai data', aiApiData);
        // console.log('clicked again')
        setIsAiDataLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    
  return (
    <AiContext.Provider value={{aiApiData, handleAiApiCall, isAiDataLoading}}>
        {children}
    </AiContext.Provider>
  )
}

export {AiContext, AiContextProvider};
