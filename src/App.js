import './App.css';
import { useState, useEffect } from 'react'
import useTypingCheck from './hooks/useTypingCheck';


function App() {
  const [keydown, endingNum, typed, notTyped, numCorrect] = useTypingCheck()

  return (
    <div className="App">
      <p>Please type the following command</p>
      <code type='javascript'>
      <p><code className='space' style={{color: 'green'}}>{typed}</code><code className='space' style={{color: 'red'}}>{notTyped}</code></p> 
      </code>
    </div>
  );
}

export default App;
