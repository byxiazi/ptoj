import * as fs from 'fs'

const { createCanvas, Image } = require('canvas')

const canvas = createCanvas(400, 300)
const ctx = canvas.getContext('2d')

const transform = (src: string, quality?: number): fs.ReadStream => {
  const imgData = fs.readFileSync(src)
  const img = new Image()
  img.src = imgData
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
  const stream = canvas.createJPEGStream({
    quality: quality || 0.8,
    chromaSubsampling: false
  })

  return stream
}

export default transform
