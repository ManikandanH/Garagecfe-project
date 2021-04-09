import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import * as firebase from 'firebase';

@Component({
  selector: 'app-password-dialog',
  templateUrl: './password-dialog.component.html',
  styleUrls: ['./password-dialog.component.css']
})
export class PasswordDialogComponent implements OnInit {

  constructor(
    public snackBar: MatSnackBar,
    public thisDialogRef: MatDialogRef<PasswordDialogComponent>, @Inject(MAT_DIALOG_DATA) 
    public data) {
 }

 openSnackBar(message: string, action: string) {
  this.snackBar.open(message, action, {
    duration: 2000,
  });
}
 
 submit(emailId) {
   const email: string =  emailId;
   firebase.auth().sendPasswordResetEmail(emailId.viewModel).then((data) => {
     console.log(data);
   }).then((data) => {
     this.thisDialogRef.close();
     this.openSnackBar('Check your mail for the password resetting','success');
    }).catch((error) => {
      if(error.message === 'The email address is badly formatted.') {
        this.openSnackBar('This email address is not registered','error');
        
      }
    })
   console.log(emailId.viewModel);
 }

 cancel() {
   this.thisDialogRef.close();
 }
  ngOnInit() {
  }

}
