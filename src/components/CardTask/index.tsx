import styles from './styles.module.css';
import trash from '../../assets/trash.svg';
import checked from '../../assets/checked.svg';
import React, { useState } from 'react';

interface CardTaskProps {
  textTask: string;
  tasks: string[];
  setTasks: (task: string[]) => void;
  setHasTask: (value: boolean) => void;
  setCreatedTasks: (task: React.SetStateAction<number>) => void;
  setStatusTask: (status: React.SetStateAction<number>) => void;
}

export function CardTask({textTask, tasks, setTasks, setHasTask, setCreatedTasks, setStatusTask}: CardTaskProps) {
  const [isCheck, setIsCheck] = useState(false);

  function handleDelete(task: string) {
    const newListDeletedTask = tasks.filter(delTask => delTask !== task);
    setTasks(newListDeletedTask);
    setCreatedTasks(newTask =>  newTask - 1);
    isCheck && setStatusTask(status => status - 1);
    tasks.length === 1 && setHasTask(true);
  }

  function handleStatusTasks() {
    setIsCheck(!isCheck);
    if(isCheck) {
      setStatusTask(status => status - 1);
    } else {
      setStatusTask(status => status + 1);
    }
  }

  return (
    <div className={styles.cardTask}>
      <div onClick={handleStatusTasks} className={styles.box}>
        {
          !isCheck 
          ? <div className={styles.checkbox}></div>
          : <img src={checked} alt="Icone checado" />
        }
      </div>
      <span className={`${styles.textTask} ${isCheck && styles.lineThrough}`}>{textTask}</span>
      <div onClick={() => handleDelete(textTask)} className={styles.box}>
        <img src={trash} alt="Icone de lixeira" />
      </div>
    </div>
  );
}