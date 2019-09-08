import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  constructor(
    public confirmBox : MatDialogRef<ConfirmDialogComponent>
  ) { confirmBox.disableClose = true }

  ngOnInit() {
  }

}
