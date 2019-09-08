import { Injectable } from '@angular/core';

export interface ContactData {
  firstName: string;
  lastName: string;
  phoneNumber: number;
  email: string;
  status: boolean;
  id: number
}

@Injectable({
  providedIn: 'root'
})
export class ContactsServiceService {

  private readonly contacts: ContactData[] = [

    { id: 1, firstName: 'Pranay', lastName: 'Ghiya', phoneNumber: 8483975222, email: 'pranayghiya@gmail.com', status: true },
    { id: 2, firstName: 'Pranay', lastName: 'Ghiya', phoneNumber: 9876543210, email: 'pranayghiya@gmail.com', status: false },

  ];

  getContacts(): ContactData[] {
    return this.contacts;
  }
}
