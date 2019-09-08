import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { from } from 'rxjs';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {

  public title : String;
  constructor(
    public popUp : MatDialogRef<AddContactComponent>,
    @Inject (MAT_DIALOG_DATA) public data : any
  ) { popUp.disableClose = true}

  ngOnInit() {
  }

  firstNameControl = new FormControl('', [
    Validators.required,
    Validators.pattern("^[a-zA-Z]+$")
  ]);

  lastNameControl = new FormControl('',[
    Validators.required,
    Validators.pattern("^[a-zA-Z]+$")
  ])

  phoneNumberControl = new FormControl('',[
    Validators.required,
    Validators.pattern("^[0-9]{10,10}$")
  ])

  emailControl = new FormControl('',[
    Validators.required,
    Validators.email
  ]);

  statusControl = new FormControl();

  idControl = new FormControl();

  contactForm: FormGroup = new FormGroup({
    id:this.idControl,
    firstName: this.firstNameControl,
    lastName : this.lastNameControl,
    phoneNumber : this.phoneNumberControl,
    email: this.emailControl,
    status:this.statusControl
  });

  getRequiredErrorMessage(field) {
    return this.contactForm.get(field).hasError('required') ? 'You must enter a value' : 
    this.contactForm.get(field).hasError('pattern') ? 'Name must be in alphabets only' : '';
  }
  getPhoneErrorMessage() {
    return this.phoneNumberControl.hasError('required') ? 'You must enter a value' :
      this.phoneNumberControl.hasError('pattern') ? 'Please enter a valid 10 digit Number' : '';
  }

  getEmailErrorMessage() {
    return this.emailControl.hasError('required') ? 'You must enter a value' :
      this.emailControl.hasError('email') ? 'Not a valid email' : '';
  }

}
