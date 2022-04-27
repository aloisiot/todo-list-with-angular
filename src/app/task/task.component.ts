import { Component, EventEmitter, Input, Output } from '@angular/core';

export declare type Task = {
  checked: boolean
  description: string
  key: string
}

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {

  @Input()
  task: Task = {
    checked: false,
    description: "",
    key: ""
  }

  @Output()
  onToggleChecked: EventEmitter<Task> = new EventEmitter()

  @Output()
  onRemove: EventEmitter<Task> = new EventEmitter()

  emitRemove(): void {
    this.onRemove.emit(this.task)
  }

  emitToggleChecked(): void {
    this.onToggleChecked.emit({
      ...this.task,
      checked: !this.task.checked
    })
  }

}
