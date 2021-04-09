
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Inject } from "@angular/core";

import { Router } from "@angular/router";
import { MyService } from '../firebase.service';

@Component({
  selector: 'app-print-dialog',
  templateUrl: './print-dialog.component.html',
  styleUrls: ['./print-dialog.component.css']
})
export class PrintDialogComponent implements OnInit {
  billDetails: {totalCost: number, itemDetails: {name: String, category: String, price: number}[]};
  secondTimePrint: boolean = false;
  currentTime: String ;
  currentDate: String; 
  printFlag: boolean = false;
  billNumber: number = 0;
  
  constructor(
    private firebaseService: MyService,
    private route: Router,
    public thisDialogRef: MatDialogRef<PrintDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:{totalCost:number, itemDetails: {name: String, category: String, price: number}[]}) {
       this.billDetails = data;
 }

  ngOnInit() {
    this.firebaseService.getBillNumber().on('value', data => {
      if(data.val() === null) {
          this.billNumber = 1;
      } else {
        this.billNumber = data.val().billNo + 1 ;
      }
    })
    var date = new Date();
    this.currentDate = date.getDate() + "/"
    + (date.getMonth()+1)  + "/" 
    + date.getFullYear();

    this.currentTime = date.getHours() + ":" + date.getMinutes();
  }

  print(name) {
    const date = new Date();
    this.secondTimePrint = true;
    var divToPrint=document.getElementById(name);
    var newWin= window.open("");
    newWin.document.write("<body  style='width: 220px;font-size: 40px;height: 100px'>");
    newWin.document.write(divToPrint.outerHTML);
    newWin.document.write("</body>");
    newWin.print();
    newWin.close();
    
    this.printFlag = true;
    const currentDate = date.getDate() + '-' + date.getMonth()+1 + '-' + date.getFullYear();
    const currentTime = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() ;
    this.firebaseService.stats(this.billDetails.itemDetails, currentDate, currentTime);
    this.firebaseService.billNumber(this.billNumber);
    this.thisDialogRef.close('one print has taken');
    this.route.navigate(['/home']);
    
  }

  cancel(){
    if(this.printFlag) {
      this.thisDialogRef.close('one print has taken');
    } else {
      this.thisDialogRef.close('no print has been taken');
    }
  }
}

