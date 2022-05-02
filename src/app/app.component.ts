import { Component, OnInit } from '@angular/core';
import { Task } from './task/task.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  tasks: Array<Task> = []

  ngOnInit(): void {
    this.loadStorage()
  }

  saveTask(description: string): void {
    const desc = description.trim()
    if(desc.length >= 5) {
      this.tasks.unshift({
        description: desc,
        checked: false,
        key: this.tasks.length + "-" + Date.now()
      })
      this.updateStorage()
    } else {
      alert("Minimum of 5 characters!")
    }
  }

  removeTask(task: Task): void {
    this.tasks = this.tasks.filter(currentTask => task.key !== currentTask.key)
    this.updateStorage()
  }

  cleanTasks() {
    if(confirm("Do you want to delete all tasks?")){
      this.tasks = []
      this.updateStorage()
    }
  }
  
  changeTask(task: Task): void {
    this.tasks = this.tasks.map(currentTask => {
      return task.key === currentTask.key ? task : currentTask
    })
    this.updateStorage()
  }

  updateStorage(): void {
    localStorage.setItem("tasks", JSON.stringify(this.tasks))
    this.loadStorage()
  }

  loadStorage(): void {
      const tasks = localStorage.getItem("tasks")
      if(tasks) {
        this.tasks = JSON.parse(tasks)
          .sort((task1: Task, task2: Task) => (+task1.checked) - (+task2.checked))
      }
  }
}
