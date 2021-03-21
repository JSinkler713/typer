const handleEmptyLine = (origLine)=> {
    // while line is empty []
    let count = 0
    for (let i = 0; i< origLine.length; i++) {
        if (origLine[i] === '') {
            count++
        }
    }
    if (count === origLine.length) {
        return true
    } else {
        return false
    }
}

  
export default handleEmptyLine