# 使用:

```ts
import { clone } from '@one-util/utils'

const a = {
  b: 1,
  c: 2,
  d: [1, 23],
  d() {
    return this.b
  },
  e: [{ a: 1 }, { b: 2 }],
}
a.a = a
const cloneA = clone(a)
console.log(cloneA.e[0] === a.e[0])
// false
```
