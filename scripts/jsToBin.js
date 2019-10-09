const fs = require('fs')
const path = require('path')

const oldPath = path.join(process.cwd(), 'bin/index.js')
const newPath = path.join(process.cwd(), 'bin/index')

fs.renameSync(oldPath, newPath)