import errorHandler, {
  CommandOpts,
  readdirFilter,
  flattenFilenames,
  filenameOfOutDir,
  filenameOfOutFile,
  defaultOutFile
} from '../src/core/core'

jest.mock('../src/core/transform')

describe('Command does not meet specifications', () => {
  let mockExit: jest.SpyInstance<never>
  beforeEach(() => {
    mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {
      throw new Error('Mock')
    })
  })

  afterEach(() => {
    mockExit.mockRestore()
  })

  const opts = {} as CommandOpts

  test('No images can be found', () => {
    try {
      errorHandler([], opts)
      expect(mockExit).toHaveBeenCalledWith(2)
    } catch (error) {}
  })

  test("File doesn't exist", () => {
    try {
      errorHandler(['err.png'], opts)
      expect(mockExit).toHaveBeenCalledWith(2)
    } catch (error) {}
  })

  test("Can't have --out-file and --out-dir", () => {
    try {
      errorHandler(['test/material/demo.png'], {
        outFile: 'err.jpeg',
        outDir: 'dir'
      } as CommandOpts)
      expect(mockExit).toHaveBeenCalledWith(2)
    } catch (error) {}
  })

  test('No errors', () => {
    try {
      const ret = errorHandler(['test/material/demo.png'], opts)
      expect(ret).toBe(undefined)
    } catch (error) {}
  })
})

describe('Specify the name of the output jpg/jpeg', () => {
  test('Recursive filter image files', () => {
    const ret = readdirFilter('test/material')
    expect(ret[0]).toBe('demo.png')
  })

  test('flatten image files', () => {
    let ret: string[]
    ret = flattenFilenames(['test/material'])
    expect(ret[0]).toBe('test/material/demo.png')

    ret = flattenFilenames(['test/material/demo.png'])
    expect(ret[0]).toBe('test/material/demo.png')
  })

  test('ptoj demo.png -o demo.jpg', () => {
    const ret = filenameOfOutFile('demo.jpg', 0)
    expect(ret).toBe('demo.jpg')
  })

  test('ptoj demo.png demo.png -o aa.jpeg', () => {
    const ret = filenameOfOutFile('demo.jpeg', 1)
    expect(ret).toBe('demo(1).jpeg')
  })
})

describe('Specify the dir of the output jpg/jpeg', () => {
  test('ptoj demo.png -d demo', () => {
    const ret = filenameOfOutDir('demo', 'demo.png')
    expect(ret).toBe('demo/demo.jpeg')
  })

  test('ptoj dir -d demo', () => {
    const ret = filenameOfOutDir('demo', 'img/test.png')
    expect(ret).toBe('demo/test.jpeg')
  })
})

describe('Neither specify -o nor specify -d', () => {
  test('ptoj demo.png', () => {
    const ret = defaultOutFile(['img/test.png'])
    expect(ret[0]).toBe('img.test.jpeg')
  })
})
