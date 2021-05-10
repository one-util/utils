/**
 * deep clone
 */
export function clone<T>(orgin: T): T {
  const orginMap = new Map()
  function _clone<T>(obj: T): T {
    if (obj === null || typeof obj !== 'object') {
      return obj
    }
    if (orginMap.has(obj)) {
      return orginMap.get(obj)
    }
    orginMap.set(obj, obj)
    if (Array.isArray(obj)) {
      return (obj.map((e) => _clone(e)) as unknown) as T
    }
    return Object.keys(obj)
      .filter((key) => Object.prototype.hasOwnProperty.call(obj, key))
      .reduce((acc, key) => {
        acc[key] = _clone((obj as any)[key])
        return acc
      }, Object.create(null))
  }
  return _clone(orgin)
}
