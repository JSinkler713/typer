const calcTop = (numOfSnippetsDone) => {
  // if snippets over 5, start adding 26px negative to top, to scroll up
  if (numOfSnippetsDone > 5) {
    let top = (numOfSnippetsDone - 5)*26
    top = '-' + top + 'px'
    return top
  } else {
    return '0px'
  }
}

export default calcTop
