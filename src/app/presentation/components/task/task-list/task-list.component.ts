import { CommonModule } from '@angular/common';
import { Component, computed, OnInit, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Filtertype, TaskModel } from '../../../models/task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.sass']
})
export class TaskListComponent implements OnInit  {

  todoList = signal<TaskModel[]>([])
  filter = signal<Filtertype>('all');


  newTask = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(3)]
  })

  editTask = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(3)]
  })

  ngOnInit(): void {
    const storage = localStorage.getItem('task_name');
    if (!storage) return;
    this.todoList.set(JSON.parse(storage));
  }

  todoListFiltered = computed(() => {
    const updatedFilter = this.filter();
    const updatedToDoList = this.todoList();

    switch (updatedFilter) {
      case 'active':
        return updatedToDoList.filter((todo) => !todo.isCompleted);
      case 'completed':
        return updatedToDoList.filter((todo) => todo.isCompleted);
      default:
        return updatedToDoList;
    }
  })

  onChangefilter(filterString: Filtertype) {
    this.filter.set(filterString);
  }

  onAddToDo() {
    if (this.newTask.invalid) {
      this.newTask.markAllAsTouched();
      this.newTask.reset();
      return
    }
    const newTodoTitle = this.newTask.value.trim();

    this.todoList.update((prep_todos) => {
      return [
        ...prep_todos,
        { id: Date.now(), title: newTodoTitle, isCompleted: false, isEditing: false, deadLine: new Date() }
      ]
    });
    this.newTask.reset();
  }

  toggleToDo(todoId: number) {
    this.todoList.update((prev_todos) => prev_todos.map((todo) => {
      return todo.id === todoId ? { ...todo, isCompleted: !todo.isCompleted } : todo;
    }))
  }

  enableEditToDo(todoId: number) {
    this.todoList.update((prev_todos) => prev_todos.map((todo) => {
      return todo.id === todoId
        ? { ...todo, isEditing: true }
        : { ...todo, isEditing: false };
    }))
  }

  onEditToDo(todoId: number, enterEvent: Event) {

    const newtitle = (enterEvent.target as HTMLInputElement).value;

    this.todoList.update((prev_todos) => prev_todos.map((todo) => {
      return todo.id === todoId ? { ...todo, title: newtitle, isEditing: false } : todo;
    }))
  }

  onDeleteToDo(todoId: number) {
    this.todoList.update((prev_todos) => prev_todos.filter((todo) => todo.id !== todoId));
  }

}
