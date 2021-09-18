import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

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
  numbers: Number[];

  ngOnInit() {
    this.apiService.getNumbers().subscribe( data => { this.numbers = data; });
  }

  /**
   * delete number click handler
   * @param number number to delete
   */
  deleteNumber(number: Number): void {
    this.apiService.deleteNumber(number.id).subscribe( data => {
      this.apiService.getNumbers().subscribe( numbers => { this.numbers = numbers; });
    });
  }

}
