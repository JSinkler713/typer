import './App.css';
import { useState, useEffect } from 'react'
import useTypingCheck from './hooks/useTypingCheck';


function App() {
  const [keydown, endingNum, typed, notTyped, numCorrect, doneSnippets] = useTypingCheck()

  const doneSnippetParagraphs = doneSnippets.map(snippet => <p className='space green typed'>{snippet}</p>)
  return (
    <div className="App">
      <h1 className='nunito'>Welcome to typer</h1>
        { doneSnippets.length ? doneSnippetParagraphs : ''}
        <p><code className='space green typed'>{typed}</code><code className='space red not-typed'>{notTyped}</code></p> 
    </div>
  );
}

export default App;
