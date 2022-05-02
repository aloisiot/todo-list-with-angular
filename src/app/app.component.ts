import { Component, DoCheck, OnInit } from '@angular/core';
import { Task } from './task/task.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, DoCheck {

  tasks: Array<Task> = []

  ngOnInit(): void {
    this.loadStorage()
  }
  
  ngDoCheck(): void {
    this.updateStorage()
  }

  saveTask(description: string): void {
    const desc = description.trim()
    if(desc.length >= 5) {
      this.tasks.unshift({
        description: desc,
        checked: false,
        key: this.tasks.length + "-" + Date.now()
      })
    } else {
      alert("Minimum of 5 characters!")
    }
  }

  removeTask(task: Task): void {
    this.tasks = this.tasks.filter(currentTask => task.key !== currentTask.key)
  }

  cleanTasks() {
    if(confirm("Do you want to delete all tasks?")){
      this.tasks = []
    }
  }
  
  changeTask(task: Task): void {
    this.tasks = this.tasks.map(currentTask => {
      return task.key === currentTask.key ? task : currentTask
    })
  }

  updateStorage(): void {
    localStorage.setItem("tasks", JSON.stringify(this.tasks))
    this.loadStorage()
  }

  loadStorage(): void {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]")
    this.tasks = tasks.sort((t1: Task, t2: Task) => Number(t1.checked) - Number(t2.checked))
  }
}
