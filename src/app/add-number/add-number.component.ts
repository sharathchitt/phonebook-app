import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-add-number',
  templateUrl: './add-number.component.html',
  styleUrls: ['./add-number.component.css']
})
export class AddNumberComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService) { }

  addForm: FormGroup;

  //This gets the form array
  get tags() {
    return this.addForm.get('tags') as FormArray;
  }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: '',
      number: ['', Validators.required],
      tags: this.formBuilder.array([ this.createTag() ])
    });
  }

  /**
   * create tag input field
   */
   createTag(): FormGroup {
    return this.formBuilder.group({
      tag: ''
    });
  }
  

  /**
   * push input field into form array
   */
   addTag(): void {
    this.tags.push(this.createTag());
  }

  /**
   * remove input field from form array
   * @param index index of input field
   */
  removeTag(index: number) {
    this.tags.removeAt(index);
  }

  /**
   * handle form submit
   */
  onSubmit() {

    // reformat tags array
    this.addForm.value.tags = this.addForm.value.tags.map(function(item) {
      if (!item['tag']) { return null; }
      return item['tag'];
    }).filter(function(el) { return el; });

    // console.log(this.addForm.value);

    // post new number and redirect to home
    this.apiService.createNumber(this.addForm.value)
      .subscribe( data => {
        // console.log(data);
        this.router.navigate(['/']);
      });

  }




}
