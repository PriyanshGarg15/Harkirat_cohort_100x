import { useState } from "react";

function App() {
  const [todos, setTodos] = useState([
    {
      title: "go to gym",
      description: "go to gym from 7-9pm",
      completed: false,
    },
    {
      title: "go to school",
      description: "go to school from 10-9pm",
      completed: true,
    },
  ]);

  function addtodo()
  {
    setTodos([...todos,
      {
        title:"new todo",
        description:"hi"
      }
    ])
  }

  return (
    <div>
      <button onClick={addtodo}>Add A Random ToDo</button>
      {/* {JSON.stringify(todos)} */}
      {/* <Todo title="priyansh" description="hi" /> */}
      {/* <Todo
        title={todos[0].title}
        description={todos[0].description}
        completed={todos[0].completed.toString()}
      /> */}
      {todos.map(function(todo){
        return <Todo title={todo.title} description={todo.description} />
      })}
    </div>
  );
}

function Todo(props) {
  return (
    <div>
      <h1>{props.title}</h1>
      <h1>{props.description}</h1>
      <h1>{props.completed}</h1>
      
    </div>
  );
}

export default App;
