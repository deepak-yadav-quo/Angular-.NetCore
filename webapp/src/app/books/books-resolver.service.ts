import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot ,Resolve } from '@angular/router';

import { BooksService } from './books.service';
import { Book } from './book.model';

@Injectable({ providedIn: 'root' })
export class BooksResolverService implements Resolve<Book[]>{
    constructor(private booksService: BooksService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.booksService.fetchBooks();
    }
}