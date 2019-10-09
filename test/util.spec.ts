import { isImage, isJpeg, newFileName } from '../src/util'

describe('util lib test', () => {
  test('isImage', () => {
    let b = isImage('a.txt')
    expect(b).toBe(false)

    b = isImage('a.doc')
    expect(b).toBe(false)

    b = isImage('a.jpg')
    expect(b).toBe(true)

    b = isImage('a.jpeg')
    expect(b).toBe(true)

    b = isImage('a.png')
    expect(b).toBe(true)
  })

  test('isJpeg', () => {
    let b = isJpeg('a.txt')
    expect(b).toBe(false)

    b = isJpeg('a.doc')
    expect(b).toBe(false)

    b = isJpeg('a.jpg')
    expect(b).toBe(true)

    b = isJpeg('a.jpeg')
    expect(b).toBe(true)

    b = isJpeg('a.png')
    expect(b).toBe(false)
  })

  test('newFileName', () => {
    let b = newFileName('a')
    expect(b).toBe('a')

    b = newFileName('.a.doc')
    expect(b).toBe('a')

    b = newFileName('./a.jpg')
    expect(b).toBe('a')

    b = newFileName('a.png')
    expect(b).toBe('a')

    b = newFileName('./a/b.png')
    expect(b).toBe('a.b')
  })
})
