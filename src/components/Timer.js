import {useState, useRef, useEffect} from 'react'

const Timer = ({done, updateTime, startTime})=> {
  const [time, setTime] = useState(0)
  // timeRef.current starts at 0
  const [intervalId, setIntervalId] = useState()
  let timeRef = useRef(0)

  useEffect(()=> {
    if (startTime) {
      const startTimer = setInterval(()=> {
        console.log('updating time')
        timeRef.current++
        // pass it back up to App
        updateTime(timeRef.current)
        setTime(timeRef.current)
      }, 1000)
      setIntervalId(startTimer)
      return ()=> { clearInterval(startTimer) }
    }
  }, [startTime])

  useEffect(()=> {
    // if done typing
    // stop interval
    // get time
    //
    if (done == true) {
      console.log('It took' + time + 'seconds')
      clearInterval(intervalId)

    }
  }, [done])

  return(
    <div className='Timer'>
      <span>{Math.floor(time / 60)}:{Math.floor((time % 60)/10)}{time % 10}</span>
    </div>
  )
}

export default Timer

