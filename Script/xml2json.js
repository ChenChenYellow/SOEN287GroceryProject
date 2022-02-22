function xml2json(xml) {
  try {
    let obj = {}
    if (xml.children.length > 0) {
      for (let i = 0; i < xml.children.length; i++) {
        let item = xml.children.item(i)
        let nodeName = item.nodeName

        if (typeof obj[nodeName] == 'undefined') {
          obj[nodeName] = xml2json(item)
        } else {
          if (typeof obj[nodeName].push == 'undefined') {
            let old = obj[nodeName]

            obj[nodeName] = []
            obj[nodeName].push(old)
          }
          obj[nodeName].push(xml2json(item))
        }
      }
    } else {
      obj = xml.textContent
    }
    return obj
  } catch (e) {
    console.log(e.message)
  }
}
export { xml2json }
