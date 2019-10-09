import * as fs from 'fs'
import * as path from 'path'
import { isImage, isJpeg, newFileName } from '../util/index'

const _ = require('lodash')
const readdir = require('fs-readdir-recursive')

export interface CommandOpts {
  outFile: string
  outDir: string
  quality: number
}

export default function errorHandler(filenames: string[], opts: CommandOpts) {
  const errors: string[] = []
  if (!filenames.length) {
    errors.push('No images can be found')
  }

  _.forEach(filenames, (filename: string) => {
    if (!fs.existsSync(filename)) {
      errors.push(`${filename} doesn't exists`)
    }
  })

  if (opts.outFile && opts.outDir) {
    errors.push(`can't have --out-file and --out-dir`)
  }

  if (errors.length > 0) {
    console.error(errors.join('. '))
    process.exit(2)
  }
}

export const readdirFilter = (dir: string): Array<string> => {
  return readdir(dir).filter(isImage)
}

export const flattenFilenames = (filenames: string[]): string[] => {
  const _filenames: string[] = []
  _.each(filenames, (filename: string) => {
    const stat = fs.statSync(filename)
    if (stat.isDirectory()) {
      const dir = readdirFilter(filename)
      const dirname = filename
      _.each(dir, (filename: string) => {
        _filenames.push(path.join(dirname, filename))
      })
    } else {
      /* istanbul ignore next */
      if (isImage(filename)) {
        _filenames.push(filename)
      }
    }
  })
  return _filenames
}

export const filenameOfOutDir = (dirName: string, filename: string) => {
  filename = path.basename(filename.replace(/png$/, 'jpeg'))
  const dest = path.join(dirName, filename)
  return dest
}

export const filenameOfOutFile = (filename: string, index: number, ext = '.jpeg') => {
  /* istanbul ignore next */
  if (isJpeg(filename)) {
    ext = path.extname(filename)
  }

  filename = newFileName(filename)
  if (index === 0) {
    filename += `${ext}`
  } else {
    filename += `(${index})${ext}`
  }

  return filename
}

export const defaultOutFile = (filenames: string[], ext = '.jpeg') => {
  const defaultNames: { [propName: number]: string } = {}

  _.each(filenames, (filename: string, index: number) => {
    const _filename = newFileName(filename)
    defaultNames[index] = _filename + ext
  })

  return defaultNames
}
