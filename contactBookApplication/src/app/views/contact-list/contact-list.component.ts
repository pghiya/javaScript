import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material'
import { from } from 'rxjs';
import { AddContactComponent } from 'src/app/shared/add-contact/add-contact.component';
import { IContact, ContactsServiceService } from 'src/app/shared/services/contacts-service.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  contacts: IContact[];
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
    win.afterClosed().subscribe((contacts: IContact) => {
      if (contacts) {
        this.sequence = this.sequence + 1;
        contacts.id = this.sequence;
        this.contacts.push(contacts);
      }
      console.log('Success')
    });
  }

  edit(contacts){
    const win = this.popUp.open(AddContactComponent);
    win.componentInstance.title = 'Edit Contact Details';

    win.componentInstance.contactForm.setValue({
      id: contacts.id,
      firstName: contacts.firstName,
      lastName: contacts.lastName,
      phoneNumber : contacts.phoneNumber,
      email : contacts.email,
      status : contacts.status
    });

    win.afterClosed().subscribe((contactDeatils: IContact) => {
      if (contactDeatils) {

        let cuurentContact = this.contacts.find(function(item) {
          return item.id == +contactDeatils.id;
        });
        
        cuurentContact.firstName = contactDeatils.firstName;
        cuurentContact.lastName = contactDeatils.lastName;
        cuurentContact.phoneNumber = contactDeatils.phoneNumber;
        cuurentContact.email = contactDeatils.email;
        cuurentContact.status = contactDeatils.status; 
               
      }
    });
  }

  delete(contact) {
    this.contacts.splice(this.contacts.indexOf(contact), 1);
  }
}
