import Mustache from 'mustache'
import fs from 'fs'

var path = process.cwd()
var buffer = fs.readFileSync(path + '/testbed/interpolemoi.tsx.bidon')
console.log('buffer : ', buffer.toString())

const yellowMatrixView = {
  title: 'Biobob',
  width: () => 2400 + 45,
  height: () => 34 + 45,
}

const output2 = Mustache.render(
  '<YellowMatrix title={{title}} width={{width}} height={{height}} />',
  yellowMatrixView
)


const view = {
  martin: 'Henri',
  bernard: 'Raoul',
}
console.log(Mustache.render(buffer.toString(), view))
