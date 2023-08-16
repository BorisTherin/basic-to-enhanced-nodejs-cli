import Mustache from 'mustache'
import fs from 'fs'

export function interpolateOnTheFly(content: string, view: object) { 
  return(Mustache.render(content, view)) 
}

export function interpoleTemplateFile(file: string, view: object) {
  //const path = './templates/'+file
  console.log('interpolation of ', file)
  const buffer = fs.readFileSync(file)
  return(Mustache.render(buffer.toString(), view)) 
}
