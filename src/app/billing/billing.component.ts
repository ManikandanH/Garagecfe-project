import { Component, OnInit } from "@angular/core";
import { BillingService } from "src/app/billing.service";
import * as firebase from "firebase";
import { AuthService } from "src/app/auth.service";
import { Router } from "@angular/router";
import { PrintDialogComponent } from "src/app/print-dialog/print-dialog.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-billing",
  templateUrl: "./billing.component.html",
  styleUrls: ["./billing.component.css"]
})
export class BillingComponent implements OnInit {
  billingItems = [];
  billingFlag: boolean = false;
  total: number = 0;

  constructor(private dialog: MatDialog,private billingService: BillingService,private route:Router,private authService:AuthService) {}

  ngOnInit() {
    this.billingItems = this.billingService.billingItems;
    if (this.billingItems.length !== 0) {
      this.billingFlag = true;
    } else {
      this.billingFlag = false;
    }
    for (let i = 0; i < this.billingItems.length; i++) {
      this.total = this.total + Number(this.billingItems[i].price);
    }
    if(!this.authService.isAuthenticated){
      this.route.navigate(['/'])
    } else {
      this.route.navigate(['/billing'])
    }
    console.log(this.billingItems);
  }

  increase(item, index) {
    this.total = 0;
    this.billingItems[index].quantity++;
    this.billingItems[index].price =
      this.billingItems[index].newPrice * this.billingItems[index].quantity;
    for (let i = 0; i < this.billingItems.length; i++) {
      this.total = this.total + Number(this.billingItems[i].price);
    }
    console.log(item);
  }
  decrease(item, index) {
    this.total = 0;
    if (this.billingItems[index].quantity === 1) {
      alert("It cannot be below 1 please remove the item");
      for (let i = 0; i < this.billingItems.length; i++) {
        this.total = this.total + Number(this.billingItems[i].price);
      }
    } else {
      this.billingItems[index].quantity--;
      this.billingItems[index].price =
        this.billingItems[index].newPrice * this.billingItems[index].quantity;
      for (let i = 0; i < this.billingItems.length; i++) {
        this.total = this.total + Number(this.billingItems[i].price);
      }

      console.log(item);
    }
  }
  remove(item, index) {
    this.total = 0;
    this.billingItems.splice(index, 1);
    for (let i = 0; i < this.billingItems.length; i++) {
      this.total = this.total + Number(this.billingItems[i].price);
    }
  }

  checkout(){
    const details = {
      totalCost: this.total,
      itemDetails: this.billingItems
    }
    let dialogRef = this.dialog.open(PrintDialogComponent, {
      width: "500px",
      data: details
    });
    dialogRef.afterClosed().subscribe((data) => {
     console.log(data);
     if(data === 'one print has taken') {
       this.billingService.billingItems = [];
       this.billingItems = []; 
       this.total  = 0;
       this.billingFlag = false;
     } 
    })
  }
}
