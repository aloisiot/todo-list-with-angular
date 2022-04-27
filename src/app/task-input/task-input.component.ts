import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-task-input',
  templateUrl: './task-input.component.html',
  styleUrls: ['./task-input.component.scss']
})
export class TaskInputComponent {
  description: string = ""

  @Output()
  onSaved: EventEmitter<string> = new EventEmitter()

  emitSaved() {
    this.onSaved.emit(this.description)
    this.description = ""
  }
}
