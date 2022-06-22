interface Todo2 {
  title: string
  description: string
}

// interface MyReadonly<T> {
//   [P: keyof T]: T[P];
// }

type MyReadonly<T> = {
  readonly [P in keyof T]: T[P];
}

const todo2: MyReadonly<Todo2> = {
  title: "Hey",
  description: "foobar"
}

todo2.title = "Hello" // Error: cannot reassign a readonly property

interface Todo2Readonly extends Todo2 {

}

let args: [number, number] = [1, 2];

Math.atan2(...args);
