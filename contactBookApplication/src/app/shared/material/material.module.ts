import { NgModule } from '@angular/core';

import {
    MatButtonModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatDialogModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
    MatTooltipModule
} from '@angular/material';

@NgModule({
    imports: [
        MatButtonModule,
        MatSlideToggleModule,
        MatFormFieldModule,
        MatDialogModule,
        MatIconModule,
        MatListModule,
        MatCardModule,
        MatInputModule,
        MatTooltipModule
    ],
    exports: [
        MatButtonModule,
        MatSlideToggleModule,
        MatFormFieldModule,
        MatDialogModule,
        MatIconModule,
        MatListModule,
        MatCardModule,
        MatInputModule,
        MatTooltipModule
    ]
})
export class MaterialModule{}