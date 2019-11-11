#!/usr/bin/env node
import * as path from 'path'
import * as fs from 'fs'
import errorHandler, {
  CommandOpts,
  flattenFilenames,
  filenameOfOutDir,
  filenameOfOutFile,
  defaultOutFile
} from './core/core'
import transform from './core/transform'

const _ = require('lodash')
const commander = require('commander')
const mkdirp = require('mkdirp')
const pkg = require('../package.json')

commander
  .version(pkg.version)
  .option('-o, --out-file <out>', 'Convert the input image to the name of output')
  .option('-d, --out-dir <out>', 'Convert an input directory of modules to an output directory')
  .option('-q, --quality <number>', 'specify the quality of image', parseFloat)
  .usage('[options] <files ...>')
  .parse(process.argv)

const opts: CommandOpts = {
  outFile: commander.outFile,
  outDir: commander.outDir,
  quality: commander.quality
}

errorHandler(commander.args, opts)

const _filenames: string[] = flattenFilenames(commander.args)
const defaultNames = defaultOutFile(_filenames)
const quality = isNaN(opts.quality) ? undefined : opts.quality

_.each(_filenames, (filename: string, index: number) => {
  const imgPath = path.isAbsolute(filename) ? filename : path.join(process.cwd(), filename)
  const imageData = transform(imgPath, quality)

  if (opts.outDir) {
    const write = function(filename: string, data: fs.ReadStream) {
      const dest = filenameOfOutDir(opts.outDir, filename)
      // const up = path.normalize(dest+'/..')
      mkdirp.sync(opts.outDir)
      const out = fs.createWriteStream(dest)
      data.pipe(out)
    }

    write(filename, imageData)
  } else {
    if (opts.outFile) {
      const _filename = filenameOfOutFile(opts.outFile, index)
      const out = fs.createWriteStream(_filename)
      imageData.pipe(out)
    } else {
      const out = fs.createWriteStream(defaultNames[index])
      imageData.pipe(out)
    }
  }
})
