import React, {useState, useEffect, useContext} from 'react'; 
import { useHistory } from 'react-router-dom'
import styled from 'styled-components';

const StyledButton = styled.button`
  border: 2px solid black;
  border-radius: 10px;
  font-size: 24px;
  padding: 5px;
  background-color: white;
  color: #4BB543;
  :hover {
    background-color: black;
  }
  `
 
const ResetButton = ()=> {
  let history = useHistory()

  console.log(history)
  function refresh() {
    history.go(0)
  }

  return ( 
    <>
     <StyledButton onClick={refresh}> 
       Reset 
     </StyledButton> 
    </>
  ) 
} 
export default ResetButton;
