export function insertAdjacentHTML(str, position = 'afterend', dom = window.document.body) {
  dom.insertAdjacentHTML(position, str)
}

export function parseDom(arg) {
  const objE = document.createElement('div')

  objE.innerHTML = arg

  return objE.childNodes
}
