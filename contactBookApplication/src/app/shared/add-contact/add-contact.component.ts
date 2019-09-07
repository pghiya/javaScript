import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroup, Validator, Validators } from '@angular/forms';
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

  firstNameValidator = new FormControl('', [
    Validators.required,
    Validators.pattern(/^[a-zA-Z]+$/)
  ]);

  lastNameValidator = new FormControl('',[
    Validators.required,
    Validators.pattern(/^[a-zA-Z]+$/)
  ])

  phoneNumberValidator = new FormControl('',[
    Validators.required,
    Validators.pattern(/(\(?[0-9]{3}\)?-?\s?[0-9]{3}-?[0-9]{4})/)
  ])

  emailValidator = new FormControl('',[
    Validators.required,
    Validators.email
  ]);

  statusControl = new FormControl();

  idControl = new FormControl();

  contactForm: FormGroup = new FormGroup({
    id:this.idControl,
    firstName: this.firstNameValidator,
    lastName : this.lastNameValidator,
    phoneNumber : this.phoneNumberValidator,
    email: this.emailValidator,
    status:this.statusControl
  });

  getRequiredErrorMessage(field) {
    return this.contactForm.get(field).hasError('required') ? 'You must enter a value' : 
    this.contactForm.get(field).hasError('pattern') ? 'Name must be in alphabets only' : '';
  }
  getPhoneErrorMessage() {
    return this.phoneNumberValidator.hasError('required') ? 'You must enter a value' :
      this.phoneNumberValidator.hasError('pattern') ? 'Format must be (xxx) xxx-xxxx' : '';
  }

  getEmailErrorMessage() {
    return this.emailValidator.hasError('required') ? 'You must enter a value' :
      this.emailValidator.hasError('email') ? 'Not a valid email' : '';
  }

}
