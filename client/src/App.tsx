import React, { useEffect, useState } from 'react'
import TodoItem from './components/TodoItem'
import AddTodo from './components/AddTodo'
import { getTodoList, addTodo, updateTodo, deleteTodo } from './API'

const App: React.FC = () => {
  const [todoList, setTodoList] = useState<ITodo[]>([])

  useEffect(() => {
    fetchTodoList()
  }, [])

  const fetchTodoList = (): void => {
    getTodoList()
      .then((response) => {
        response.data.todoList = response.data.data.Items;
        return response;
      })
      .then(({ data: { todoList } }: ITodo[] | any) => setTodoList(todoList))
      .catch((err: Error) => console.log(err))
  }

  const handleSaveTodo = (e: React.FormEvent, formData: ITodo): void => {
    e.preventDefault()
    addTodo(formData)
      .then(({ status }) => {
        if (status !== 200) {
          console.log('Error saving TODO! Status was:', status);
        }
        fetchTodoList();
      })
      .catch((err) => console.log(err))
  }

  const handleUpdateTodo = (todo: ITodo): void => {
    updateTodo(todo)
      .then(({ status }) => {
        if (status !== 200) {
          throw new Error('Error! Todo not updated')
        }
        fetchTodoList();
      })
      .catch((err) => console.log(err))
  }

  const handleDeleteTodo = (id: string): void => {
    deleteTodo(id)
      .then(({ status }) => {
        if (status !== 200) {
          throw new Error('Error! Todo not deleted')
        }
        fetchTodoList();
      })
      .catch((err) => console.log(err))
  }

  return (
    <main className='App'>
      <h1>My Todo List</h1>
      <AddTodo saveTodo={handleSaveTodo} />
      {todoList.map((todo: ITodo) => (
        <TodoItem
          key={todo.id}
          updateTodo={handleUpdateTodo}
          deleteTodo={handleDeleteTodo}
          todo={todo}
        />
      ))}
    </main>
  )
}

export default App
