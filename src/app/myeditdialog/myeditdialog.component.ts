import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

export interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-myeditdialog',
  templateUrl: './myeditdialog.component.html',
  styleUrls: ['./myeditdialog.component.css']
})


export class MyeditdialogComponent implements OnInit {
 newDetails: {name: String, category: String, price: number};
  details: {name: String, category: String, price: number};
  foods: Food[] = [
    {value: 'Chats', viewValue: 'Chats'},
    {value: 'Grill & Shawrma', viewValue: 'Grill & Shawarma'},
    {value: 'Juices', viewValue: 'Juice'}
  ];
  constructor(public thisDialogRef: MatDialogRef<MyeditdialogComponent>, @Inject(MAT_DIALOG_DATA) public data: {name: String, category: String, price: number}) {
      this.details = data;
      console.log(this.details);
   }
   
  ngOnInit() {
  }
  onCloseConfirm(name,category,price) {
    console.log(name);
    console.log(category);
    console.log(price);
     if(name === this.details.name && category === undefined && price === this.details.price) {
      alert("Please select Category");
    } else if(name === this.details.name && category === this.details.category && price === this.details.price) {
      alert("No changes made to the item");
      this.thisDialogRef.close(this.details);
    } else {
    this.newDetails = {
        name : name,
        category : category,
        price : price
      }
      this.thisDialogRef.close(this.newDetails);
    }

  }
  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }

  add(name,category,price) {
    
  }

}
