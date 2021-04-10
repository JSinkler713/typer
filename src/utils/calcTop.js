const calcTop = (numOfSnippetsDone) => {
  // if snippets over 5, start adding 26px negative to top, to scroll up
  if (numOfSnippetsDone > 4) {
    let top = (numOfSnippetsDone - 4)*26
    top = '-' + top + 'px'
    return top
  } else {
    return '0px'
  }
}

export default calcTop
