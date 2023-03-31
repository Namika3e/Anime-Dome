import React from 'react';
import { useState, useEffect } from 'react';
import axios from "axios"
import { useLogout } from './components/hooks/useLogout';

const MainPage = () => {
  const [character, setCharacter] = useState([]);

  const fetchCharacters = async ()=> {
    const response = await axios.get("http://localhost:4000/api/characters");
    const data = response.data;

    setCharacter(data)
    console.log(data)
    
  }

  useEffect(()=> {
    // if(response.ok) {
      //   setCharacter(data);
      // }
      
  fetchCharacters()
  }, []);

  return (
    <div>
      {character.map(char => (
        <h1>{char.name}</h1>
        //logout button here
      ))}
      mainpage
    </div>
  )
}

export default MainPage