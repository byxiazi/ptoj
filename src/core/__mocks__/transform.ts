import * as fs from 'fs'

const transform = (src: string, quality?: number): fs.ReadStream => {
  const RS = {
    pipe: (data: fs.WriteStream) => {
      return 0
    }
  } as fs.ReadStream

  return RS
}

export default transform
