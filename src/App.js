import './App.css';
import { useState, useEffect } from 'react'
import useTypingCheck from './hooks/useTypingCheck';


function App() {
  const [keydown, endingNum, typed, notTyped, numCorrect, doneSnippets] = useTypingCheck()

  const doneSnippetParagraphs = doneSnippets.map(snippet => <p className='space green'>{snippet}</p>)
  return (
    <div className="App">
      <h1 className='nunito'>Welcome to typer</h1>
      <code type='javascript'>
        { doneSnippets.length ? doneSnippetParagraphs : ''}
        <p><code className='space green'>{typed}</code><code className='space red'>{notTyped}</code></p> 
      </code>
    </div>
  );
}

export default App;
