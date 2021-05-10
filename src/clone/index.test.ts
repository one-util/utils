import { clone } from './index'

type Data = {
  a?: any
  b?: {
    c?: any
  }
  c?: {
    c?: any
  }
  toStrictEqualObj: {
    a: number
    b: string
    c: null
    d: undefined
    e: bigint
    f: symbol
    g: Function
    h: boolean
  }
  array: any[]
  arrayObj: { a: 1 }[]
}
describe('clone', () => {
  const a: Data = {
    toStrictEqualObj: {
      a: 1,
      b: '2',
      c: null,
      d: undefined,
      e: 100n,
      f: Symbol(2),
      g() {
        return this.a
      },
      h: false,
    },
    array: [
      1,
      2,
      3,
      false,
      'hello',
      100n,
      undefined,
      null,
      Symbol(2),
      function g(this: any) {
        return this
      },
      { a: 1 },
    ],
    arrayObj: [
      {
        a: 1,
      },
    ],
  }
  a.a = a
  a.c = {}
  a.b = {}
  a.b.c = a.c
  a.c.c = a.c
  const r = clone(a)
  it('clone equal', () => {
    expect.hasAssertions()
    // eslint-disable-next-line jest/prefer-strict-equal
    expect(r).toEqual(a)
    // eslint-disable-next-line jest/prefer-strict-equal
    expect(r.toStrictEqualObj).toEqual(a.toStrictEqualObj)
    // eslint-disable-next-line jest/prefer-strict-equal
    expect(r.array).toEqual(a.array)
    // eslint-disable-next-line jest/prefer-strict-equal
    expect(r.arrayObj).toEqual(a.arrayObj)
    // eslint-disable-next-line jest/prefer-strict-equal
    expect(r.arrayObj === a.arrayObj).toEqual(false)
  })
  it('clone strict equal', () => {
    expect.hasAssertions()
    expect(r.a).toStrictEqual(a)
    expect(r.c!.c).toStrictEqual(a.c)
    expect(r.b!.c).toStrictEqual(a.c)
    expect(r.array === a.array).toStrictEqual(false)
    ;(Object.keys(r.toStrictEqualObj) as (keyof Data['toStrictEqualObj'])[]).forEach((key) => {
      expect(a.toStrictEqualObj[key]).toStrictEqual(r.toStrictEqualObj[key])
    })
  })
})
