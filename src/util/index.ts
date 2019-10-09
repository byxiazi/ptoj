import * as path from 'path'

const imgExtReg = /^.(jpg|jpeg|png)$/i
const jpegReg = /^.(jpg|jpeg)$/i

const isImage = (filename: string): boolean => {
  return imgExtReg.test(path.extname(filename))
}

const isJpeg = (filename: string): boolean => {
  return jpegReg.test(path.extname(filename))
}

const newFileName = (filename: string): string => {
  const ext = path.extname(filename)
  if (!ext) return filename

  const _filename = filename
    .split(ext)
    .join('')
    .replace(/\/|\\/g, '.')
    .replace(/^\.*/, '')

  return _filename
}

export { isImage, isJpeg, newFileName }
