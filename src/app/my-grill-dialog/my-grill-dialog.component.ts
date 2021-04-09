import { Component, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Inject } from "@angular/core";
import { MatSnackBar } from '@angular/material';

export interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: "app-my-grill-dialog",
  templateUrl: "./my-grill-dialog.component.html",
  styleUrls: ["./my-grill-dialog.component.css"]
})
export class MyGrillDialogComponent implements OnInit {
  foods: Food[] = [
    { value: "full", viewValue: "Full" },
    { value: "half", viewValue: "Half" },
    { value: "quarter", viewValue: "Quarter" }
  ];
  constructor(
    public snackBar: MatSnackBar,
    public thisDialogRef: MatDialogRef<MyGrillDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      name: String;
      category: String;
      newPrice: number;
      price: number;
      subCategory: String;
    }
  ) {}

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }


  ngOnInit() {}
  onCloseConfirm(category) {
    const cat = "(" + category + ")";
    if (category === "half") {
      this.data.newPrice = this.data.price / 2;
      this.data.price = this.data.newPrice;
      this.data.subCategory = cat;
    } else if (category === "quarter") {
      this.data.newPrice = this.data.price / 4;
      this.data.price = this.data.newPrice;
      this.data.subCategory = cat;
    } else {
      this.data.newPrice = this.data.price;
      this.data.price = this.data.newPrice;
      this.data.subCategory = cat;
    }
    if (category === undefined) {
      this.openSnackBar('Please select something','error');
    } else {
      this.openSnackBar('Succesfully added to the billing section','success');
      this.thisDialogRef.close(this.data);
    }
  }

  onCloseCancel() {
    this.thisDialogRef.close("Cancel");
  }
}
