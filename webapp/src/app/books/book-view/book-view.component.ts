import { Component, OnInit } from '@angular/core';

import { Book } from './../book.model';
import { BooksService } from '../books.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.css']
})
export class BookViewComponent implements OnInit {

  id: number;
  book: Book;
  constructor(private booksService: BooksService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.book = this.booksService.getBook(this.id);
        }
      )
    
  }

  toDashboard() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

}
