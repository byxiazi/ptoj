import { JPEGStream } from 'canvas'
import transform from '../src/core/transform'

describe('transform module test', () => {
  test('image data transform', () => {
    const path = require('path')
    const imgPath = path.join(process.cwd(), 'test/material/demo.png')
    const data = transform(imgPath)
    expect(data).toBeInstanceOf(JPEGStream)
  })
})
