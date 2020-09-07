import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthGuard } from './../auth/auth.guard';
import { BooksResolverService } from './books-resolver.service';
import { BooksComponent } from './books.component';
import { DashboardComponent } from "./dashboard/dashboard.component";
import { BookEditComponent } from "./book-edit/book-edit.component";
import { BookViewComponent } from './book-view/book-view.component';

const routes: Routes = [
    {
        path: '',
        component: BooksComponent,
        resolve: [BooksResolverService],
        canActivate: [AuthGuard],
        children: [
            { path: '', component: DashboardComponent},
            { path: 'new', component: BookEditComponent},
            { path: ':id', component: BookViewComponent},
            { path: ':id/edit', component: BookEditComponent}
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class BooksRoutingModule {}