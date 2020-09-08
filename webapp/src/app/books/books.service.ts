import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { concat, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Book } from './book.model';

@Injectable({providedIn: 'root'}) 
export class BooksService {
    books: Book[] = [];
    
    constructor(private http: HttpClient,
                private router: Router) {}

    addBook(book: Book) {
        const addBookRequest = this.http
            .post(
                'http://localhost:5000/book/post',
                book
            );
        
        this.updateBookDatabase(addBookRequest);
    }

    getBook(id: number) {
        return this.books[id];
    }

    fetchBooks() {
        return this.http.get<Book[]>(
            'http://localhost:5000/book/get'
        )
        .pipe(
            tap(
            books => {
                if(books !== null) {
                    this.books = books;
                }
            }
        ));
    }

    deleteBook(id: number) {
        this.books.splice(id, 1);
        const deleteBookRequest = this.http
            .delete(
                'http://localhost:5000/book/delete/'+id
            );
        this.updateBookDatabase(deleteBookRequest);
    }

    updateBook(id: number, updatedBook: Book) {
        updatedBook.id = id;
        const updateBookRequest = this.http
            .put(
                'http://localhost:5000/book/put',
                updatedBook
            );
        this.updateBookDatabase(updateBookRequest);
    }

    private updateBookDatabase(bookRequest: Observable<Object>) {
        const addBook = bookRequest;
        const getBook = this.http.get<Book[]>(
            'http://localhost:5000/book/get'
        );
        const goToDashboard = this.router.navigateByUrl('books');

        concat(addBook, getBook, goToDashboard).subscribe(
            response => {
                console.log(response);
            }
        );
    }
}