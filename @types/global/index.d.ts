declare global {
  type JSONValue = string | number | boolean | { [x: string]: JSONValue } | Array<JSONValue>

  interface JSONObject {
    [x: string]: JSONValue
  }

  type Nullable<T> = { [P in keyof T]: T[P] | null }

  type ValueType<D = null> = string | number | undefined | D
}

export {}
