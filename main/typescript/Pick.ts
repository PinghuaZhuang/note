interface Todo {
  title: string
  description?: Todo
  completed: boolean
}

type MyPick<T, K extends keyof T> = {
  [P in K]?: T[P];
}

type TodoPreview = MyPick<Todo, 'title' | 'completed'>

const todo: Todo = {
    title: 'Clean room',
    completed: false,
}
todo.description!.title
