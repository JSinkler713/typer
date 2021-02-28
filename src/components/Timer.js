import {useState, useRef, useEffect} from 'react'

const Timer = (props)=> {
  const [time, setTime] = useState(0)
  // timeRef.current starts at 0
  const [intervalId, setIntervalId] = useState()
  let timeRef = useRef(0)

  useEffect(()=> {
    const startTimer = setInterval(()=> {
      console.log('updating time')
      timeRef.current++
      setTime(timeRef.current)
    }, 1000)
    setIntervalId(startTimer)
    return ()=> { clearInterval(startTimer) }
  }, [])

  useEffect(()=> {
    // if done typing
    // stop interval
    // get time
    //
    if (props.done == true) {
      console.log('It took' + time + 'seconds')
      clearInterval(intervalId)
    }
  }, [props.done])

  return(
    <div className='Timer'>
      <p>{time}</p>
    </div>
  )
}

export default Timer

