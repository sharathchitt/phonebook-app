import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AddNumberComponent } from './add-number/add-number.component';
import { EditNumberComponent } from './edit-number/edit-number.component';
import { ListNumbersComponent } from './list-numbers/list-numbers.component';

const routes: Routes = [{ path: 'add-number', component: AddNumberComponent },
                        { path: 'edit-number/:id', component: EditNumberComponent },
                        { path: '', component: ListNumbersComponent }
                      ];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
