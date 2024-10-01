import { Component, Inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-person',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.sass']
})
export class PersonComponent {
  @Input() personsList!: FormArray;
  @Inject(FormBuilder) private fb!: FormBuilder;

  addPerson() {
    const person = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(5)]],
      age: ['', [Validators.required, Validators.min(18)]],
      skills: this.fb.array([this.fb.control('', Validators.required)])
    });
    this.personsList.push(person);
  }

  removePerson(index: number) {
    this.personsList.removeAt(index);
  }

  addSkill(personIndex: number) {
    const skills = this.personsList.at(personIndex).get('skills') as FormArray;
    skills.push(this.fb.control('', Validators.required));
  }

  removeSkill(personIndex: number, skillIndex: number) {
    const skills = this.personsList.at(personIndex).get('skills') as FormArray;
    skills.removeAt(skillIndex);
  }

  getPersonFormGroup(index: number): FormGroup {
    return this.personsList.at(index) as FormGroup;
  }

  getSkillsFormArray(personIndex: number): FormArray {
    return this.getPersonFormGroup(personIndex).get('skills') as FormArray;
  }
}
