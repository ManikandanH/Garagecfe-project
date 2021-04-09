import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
import {MatDialogRef} from '@angular/material';

export interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-my-dialog',
  templateUrl: './my-dialog.component.html',
  styleUrls: ['./my-dialog.component.css']
})
export class MyDialogComponent implements OnInit {
  foods: Food[] = [
    {value: 'Chats', viewValue: 'Chats'},
    {value: 'Grill ', viewValue: 'Grill'},
    {value: 'Juices', viewValue: 'Juice'},
    {value: 'Shawarma', viewValue: 'Shawarma'},
  ];
  details: {name: String, category: String, price: number};
  constructor(public snackBar: MatSnackBar,public thisDialogRef: MatDialogRef<MyDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: string) { }
  ngOnInit() {
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  onCloseConfirm(name,category,price) {
    if(name === '' || category === undefined || price === '') {
      this.openSnackBar('Please fill the details','error');
    }
    else {
      this.details = {
        name : name,
        category : category,
        price : price
      }
      this.openSnackBar('Successfully added this item','success');
      this.thisDialogRef.close(this.details);
    }

  }
  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }

}