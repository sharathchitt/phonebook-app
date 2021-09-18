import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { PhoneNumber } from '../models/phonenumber';

@Component({
  selector: 'app-list-numbers',
  templateUrl: './list-numbers.component.html',
  styleUrls: ['./list-numbers.component.css']
})
export class ListNumbersComponent implements OnInit {

  constructor(private router: Router, private apiService: ApiService) { }

  /**
   * all numbers from database
   */
  numbersArr: PhoneNumber[]=[];

  ngOnInit() {
    this.apiService.getNumbers().subscribe( data => { this.numbersArr = data; });
  }


  deleteNumber(number: PhoneNumber): void {
    this.apiService.deleteNumber(number.id).subscribe( data => {
      this.apiService.getNumbers().subscribe( numbers => { this.numbersArr = numbers; });
    });
  }

}
