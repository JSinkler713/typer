import './App.css';
import { useState, useEffect, useRef } from 'react'
import useTypingCheck from './hooks/useTypingCheck';
import Space from './components/Space';
import Timer from './components/Timer';

const scroller = (ref)=> {
  console.log(ref.current)
  console.log(ref.current.offsetTop)
  window.scrollTo(0, ref.current.offsetTop)
}



function App() {
  const [keydown, endingNum, typed, notTyped, numCorrect, doneSnippets, spaces, done] = useTypingCheck()
  const newRef = useRef()

  useEffect(()=> {
    //change when doneSnippets
    scroller(newRef)
  }, [doneSnippets])

  useEffect(()=> {
    if (done) {
      // stop timer
      console.log('its really done')
    }
  },[done])


  const doneSnippetParagraphs = doneSnippets.map(snippet =>{
    let someSpaces = []
    for (let i=0; i< snippet.spaces; i++) {
      someSpaces.push(<Space />)
    }
    return(
    <p className='done'>
      {someSpaces}
      <span className='space green typed'>{snippet.littleSentence}</span>
    </p>
    )
  })

  // code block already has a space
  let leaders
  if (spaces > 0) {
    leaders = new Array(spaces - 1)
    console.log(leaders)
    leaders.fill(<Space/>)
    console.log(leaders)
  }


  return (
    <div className="App">
      <div>
        <h1 className='nunito'>Welcome to typer</h1>
        <Timer done={done}/>
        <main className='main-content'>
          { doneSnippets.length ? doneSnippetParagraphs : ''}
          <p className='done' ref={newRef} ><code className='space green typed'>{spaces ? leaders :''}{typed}</code><code className='space red not-typed'>{notTyped}</code></p> 
        </main>
      </div>
      <footer>
        JSinkler
      </footer>
    </div>
  );
}

export default App;
