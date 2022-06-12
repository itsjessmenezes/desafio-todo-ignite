import styles from './styles.module.css';
import './global.css';

import logo from './assets/logo.svg';
import clipboard from './assets/clipboard.svg';
import { ChangeEvent, useState } from 'react';
import { CardTask } from './components/CardTask';

function App() {
  const [task, setTask] = useState<string>('');
  const [tasks, setTasks] = useState<Array<string>>([]);
  const [hasTask, setHasTask] = useState(true);
  const [createdTasks, setCreatedTasks] = useState(0);
  const [statusTasks, setStatusTask] = useState(0);

  function handleAddTask() {
    setTasks([...tasks, task]);
    setTask('');
    setHasTask(false);
    setCreatedTasks(newTask => newTask + 1);
  }

  function handleTasks(e: ChangeEvent<HTMLInputElement>) {
    setTask(e.target.value);
  }

  return (
    <div className={styles.container}>
      <header>
        <img src={logo} alt="Logo ToDo" />
      </header>
      <main>
        <div className={styles.addTask}>
          <input
            type="text"
            placeholder="Adicione uma nova tarefa"
            name="tasks"
            value={task}
            onChange={handleTasks}
          />
          <button
            disabled={!task}
            onClick={handleAddTask}
            className={styles.createTask}
          >
            Criar
            <span>+</span>
          </button>
        </div>
        <div className={styles.statusTask}>
          <div className={styles.createdTasks}>
            <span>Tarefas criadas</span>
            <span>{createdTasks}</span>
          </div>
          <div className={styles.doneTasks}>
            <span>Concluidas</span>
            <span>
              {tasks.length !== 0
                ? `${statusTasks} de ${createdTasks}`
                : statusTasks}
            </span>
          </div>
        </div>
        {!hasTask ? (
          <>
            {tasks.map(textTask => (
              <CardTask
                key={textTask}
                tasks={tasks}
                setTasks={setTasks}
                textTask={textTask}
                setHasTask={setHasTask}
                setCreatedTasks={setCreatedTasks}
                setStatusTask={setStatusTask}
              />
            ))}
          </>
        ) : (
          <div className={styles.contentTasks}>
            <img src={clipboard} alt="Ilustração de bloco de tarefa" />
            <p>Você ainda não tem tarefas cadastradas</p>
            <span>Crie taregas e organize seus itens a fazer</span>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
