import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {

  constructor(private route: Router,public thisDialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:{totalCost:number, itemDetails: {name: String, category: String, price: number}[]}) {
}

  ngOnInit() {
  }

  delete(){
    this.thisDialogRef.close('delete');
  }
  cancel(){
    this.thisDialogRef.close('cancel');
  }

}
