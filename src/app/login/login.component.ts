import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog, MatSnackBar} from '@angular/material'
import * as firebase from "firebase";
import { AuthService } from "src/app/auth.service";
import { PasswordDialogComponent } from '../password-dialog/password-dialog.component';
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  constructor(
    public snackBar: MatSnackBar,
    private dialog: MatDialog,private router: Router, private authService: AuthService) {}
  showPassword: boolean = false;
  passFlag: boolean = false;
  pass: String;
  progressFlag: boolean = false;
  email: String;

  
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  ngOnInit() {
    const uid = localStorage.getItem('uid');
    if(uid !== null){
      this.authService.isAuthenticated = true;
      this.router.navigate(['/home']);
    }
    if (this.showPassword) {
      this.passFlag = true;
    } else {
      this.passFlag = false;
    }
    console.log(this.showPassword);
  }

  onChanges() {
    if (this.showPassword) {
      this.passFlag = true;
    } else {
      this.passFlag = false;
    }
  }

  reset() {
    let dialogRef = this.dialog.open(PasswordDialogComponent, {
      width: "300px",
      data: 'nothing'
    });
  }



  submit(data) {
    this.progressFlag = true;
    if (data.value.password === undefined || data.value.email === "") {
      this.openSnackBar('Please fill the details', 'error');
      this.progressFlag =false;
    }
    firebase
      .auth()
      .signInWithEmailAndPassword(data.value.email, data.value.password)
      .then((data) => {
        this.progressFlag = false;
        this.authService.login();
        console.log(data.user);
        localStorage.setItem('uid', data.user.uid);
        this.router.navigate(['/home']);
      })
      .catch(error => {
        if (
          error.message ===
          "There is no user record corresponding to this identifier. The user may have been deleted."
        ) {
          this.openSnackBar('Email address is wrong','error');
        } else if (
          error.message ===
          "The password is invalid or the user does not have a password."
        ) {
          this.openSnackBar('Password not valid', 'error');
        }
        this.progressFlag = false;
      });
  }
}

