

const calcTypingStats = (correctChars, allChars, time) => {
  let percentageCorrect = (correctChars / allChars).toFixed(2)
  percentageCorrect *= 100
  let percentageStat = `You have typed ${percentageCorrect}% of all chars correct`
  let wordsTyped = correctChars / 5
  let fractionOfMinute = time / 60
  let wordsPerMinute = (wordsTyped / fractionOfMinute).toFixed(0)
  let wpmStat = `You are typing at a rate of ${wordsPerMinute} WPM`
  return [percentageStat, wpmStat]

}

export default calcTypingStats

