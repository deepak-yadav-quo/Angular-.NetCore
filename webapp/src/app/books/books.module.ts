import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { BooksComponent } from './books.component';
import { BookEditComponent } from './book-edit/book-edit.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BooksRoutingModule } from './books-routing.module';
import { BookViewComponent } from './book-view/book-view.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
    declarations: [
        BooksComponent,
        BookEditComponent,
        DashboardComponent,
        BookViewComponent
    ],
    imports: [
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        NgbModule,
        BooksRoutingModule,
        FontAwesomeModule
    ]
})

export class BooksModule {}