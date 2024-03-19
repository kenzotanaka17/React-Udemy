import { useState, useEffect } from "react"


export default function App() {

  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState<string[]>([]);
  const [editTask, setEditTask] = useState({
    enabled : false,
    task: ''
  })

  useEffect( () => {
    const tasksSalvas = localStorage.getItem('@cursoReact')
    if(tasksSalvas) {
      setTasks(JSON.parse(tasksSalvas))
    }
  }, [])

  function handleRegister() {
    if(!input) {
      alert("Digite alguma tarefa!")
      return;
    }

    if(editTask.enabled) {
      handleSaveEdit();
      return;
    }

    setTasks(tarefas => [...tarefas, input]);
    setInput("");
    localStorage.setItem("@cursoReact", JSON.stringify([...tasks, input]))
  }

  function handleSaveEdit() {
    const findIndexTask = tasks.findIndex( task => task === editTask.task);
    const allTasks = [...tasks];

    allTasks[findIndexTask] = input;
    setTasks(allTasks);

    setEditTask({
      enabled: false,
      task: ''
    })

    setInput('')
    localStorage.setItem("@cursoReact", JSON.stringify(allTasks))
  }

  function handleDelete(item : string) {
    const removeTask = tasks.filter( task => task !== item)
    setTasks(removeTask)
    localStorage.setItem("@cursoReact", JSON.stringify(removeTask))
  }

  function handleEdit(item : string) {
    setInput(item)
    setEditTask({
      enabled : true, 
      task : item
    })
  }

  return (
    <>
      <h1>Lista de tarefas</h1>
      <input 
        placeholder="Digite a tarefa.."
        value={input}
        onChange={ (e) => setInput(e.target.value) }
      />
      <button onClick={handleRegister}>
        {editTask.enabled ? "Atualizar tarefa" : "Adicionar Tarefa"}
      </button>

      <hr/>

      {tasks.map((item, index) => (
          <section key={item}>
            <span>{item}</span>
            <button onClick={ () => handleEdit(item) }>Editar tarefa</button>
            <button onClick={ () => handleDelete(item) }>Excluir tarefa</button>
          </section>
        )
      )}
    </>
  )
}


