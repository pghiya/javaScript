import { Component, OnInit } from '@angular/core';
import { AddContactComponent } from 'src/app/shared/add-contact/add-contact.component';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { ContactData, ContactsServiceService } from 'src/app/shared/services/contacts-service.service';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  contacts: ContactData[];
  sequence: number;

  constructor(
    public popUp : MatDialog,
    private contactsService: ContactsServiceService,
    ) { }

  ngOnInit() {
    this.contacts = this.contactsService.getContacts();
    this.sequence = 2;
  }

  open(){
    const win = this.popUp.open(AddContactComponent);
    win.componentInstance.title = 'Add Contact Details';

    win.afterClosed().subscribe((contactDeatils: ContactData) => {
      if (contactDeatils) {
        var i, length=this.contacts.length;

        for(i = 0; i < length; i++){
          var currentContact = this.contacts[i]
          if(currentContact.phoneNumber == contactDeatils.phoneNumber){
            alert('Entry for the entered number already exists in Contact Book for user: ' + currentContact.firstName + ' ' + currentContact.lastName);
            return false;
          }
        }
        this.sequence = this.sequence + 1;
        contactDeatils.id = this.sequence;
        this.contacts.push(contactDeatils);
      }
    });
  }

  edit(data : any){
    const win = this.popUp.open(AddContactComponent);
    win.componentInstance.title = 'Edit Contact Details';

    win.componentInstance.contactForm.setValue({
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNumber : data.phoneNumber,
      email : data.email,
      status : data.status
    });

    win.afterClosed().subscribe((contactDeatils: ContactData) => {
      if (contactDeatils) {

        let currentContact = this.contacts.find(function(item) {
          return item.id == contactDeatils.id;
        });

        var i, length=this.contacts.length;

        for(i = 0; i < length; i++){
          var oldContact = this.contacts[i]
          if(oldContact.phoneNumber == contactDeatils.phoneNumber && oldContact.id != contactDeatils.id){
            alert('Entry for the entered number already exists in Contact Book for : ' + oldContact.firstName + ' ' + oldContact.lastName);
            return false
          }
        }
        
        currentContact.firstName = contactDeatils.firstName;
        currentContact.lastName = contactDeatils.lastName;
        currentContact.phoneNumber = contactDeatils.phoneNumber;
        currentContact.email = contactDeatils.email;
        currentContact.status = contactDeatils.status; 
               
      }
    });
  }

  confirm(data : any){
    const win = this.popUp.open(ConfirmDialogComponent);

    win.afterClosed().subscribe((result) => {
      if(result){
        this.contacts.splice(this.contacts.indexOf(data),1)
      }
    })
  }
  
}
