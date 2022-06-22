export namespace Test {
  export interface Person {
    name: string
  }
}
const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const

type result = TupleToObject<typeof tuple> // expected { tesla: 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}
// export interface Person {
//   name: string
// }

type TupleToObject<T extends readonly string[]> = {
  [P in T[number]]: P;
}
