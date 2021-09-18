import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-edit-number',
  templateUrl: './edit-number.component.html',
  styleUrls: ['./edit-number.component.css']
})
export class EditNumberComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private apiService: ApiService,
    private route: ActivatedRoute) { }

   editForm: FormGroup;

   editModel: any;
 
   /**
    * form array getter
    */
   get tags() {
     return this.editForm.get('tags') as FormArray;
   }
 
   /**
    * number id passed by url
    */
   editNumberId: string;
 
   ngOnInit() {
     // get number id from url
     this.editNumberId = this.route.snapshot.params['id'];
 
     this.editForm = this.formBuilder.group({
       id: '',
       name: ['', Validators.required],
       email: '',
       number: ['', Validators.required],
       tags: this.formBuilder.array([])
     });
 
     this.apiService.getNumberById(this.editNumberId)
     .subscribe( data => {
       this.editModel = data[0];
       this.patchForm();
     });
 
   }
 
   /**
    * create tag input field
    * @param tag tag value
    */
   createTag(tag): FormGroup {
     return this.formBuilder.group({
       tag: [tag]
     });
   }
 
   /**
    * add tag to form array
    */
   addTag(): void {
     this.tags.push(this.createTag(''));
   }
 
   /**
    * remove input field from form array
    * @param index input field position
    */
   removeTag(index: number) {
     this.tags.removeAt(index);
   }
 
   /**
    * populate edit form with initial values
    */
   patchForm(): void {
     this.editForm.patchValue({['id']: this.editModel.id});
     this.editForm.patchValue({['name']: this.editModel.name});
     this.editForm.patchValue({['email']: this.editModel.email});
     this.editForm.patchValue({['number']: this.editModel.number});
 
     this.editModel.tags.forEach(tag => {
       this.tags.push(this.createTag(tag));
     });
   }
 
   /**
    * handle form submit
    */
   onSubmit() {
     // reformat tags array
     this.editForm.value.tags = this.editForm.value.tags.map(function(item) {
       if (!item['tag']) { return null; }
       return item['tag'];
     }).filter(function(el) { return el; });
 
     // console.log(this.editForm.value);
 
     // submit edit form and redirect to home
     this.apiService.editNumber(this.editForm.value)
       .subscribe( data => {
         // console.log(data);
         this.router.navigate(['/']);
       });
   }

}
