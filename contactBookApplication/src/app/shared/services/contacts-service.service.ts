import { Injectable } from '@angular/core';

export interface IContact {
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

  private readonly contacts: IContact[] = [

    { id: 1, firstName: 'John', lastName: 'Campo', phoneNumber: 9998883456, email: 'john@gmail.com', status: true },
    { id: 2, firstName: 'Mike', lastName: 'Pipes', phoneNumber: 7777777777, email: 'mike@gmail.com', status: true },

  ];

  getContacts(): IContact[] {
    return this.contacts;
  }
}
