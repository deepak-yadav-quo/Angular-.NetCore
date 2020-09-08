import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { BooksService } from './../books.service';
import { DatePipe, formatCurrency } from '@angular/common';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { Book } from '../book.model';


@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {

  id:number;
  book: Book;
  bookForm: FormGroup;
  model: NgbDateStruct;
  editMode = false;
  faCalendar = faCalendar;

  constructor(private booksService: BooksService,
              private route: ActivatedRoute,
              private router: Router,
              private ngbDateParserFormatter: NgbDateParserFormatter) {}

  ngOnInit(): void {

    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        }
      );
  }

  private initForm() {

    let bookName = '';
    let authorName = '';
    let publishDate;
    let genre = '';

    if(this.editMode) {
      this.book = this.booksService.getBook(this.id);
      bookName = this.book.name;
      authorName = this.book.authorName;
      
      let dp = new DatePipe(navigator.language);
      let p = 'y-MM-dd'; // YYYY-MM-DD
      publishDate = dp.transform(this.book.publishDate, p);
      genre = this.book.genre;
    }
    
    this.bookForm = new FormGroup({
      'name': new FormControl(bookName, [Validators.required]),
      'authorName': new FormControl(authorName, [Validators.required]),
      'publishDate': new FormControl(publishDate, [Validators.required]),
      'genre': new FormControl(genre, [Validators.required])
    });
  }

  onAddBook() {
    const myDate = this.ngbDateParserFormatter.format(this.model);
    this.bookForm.value['publishDate'] = myDate;
    
    if(this.editMode) {
      this.booksService.updateBook(this.book.id, this.bookForm.value);
    } else {
      this.booksService.addBook(this.bookForm.value);
    }
  }

  onResetForm() {
    this.bookForm.reset();
  }

  onCancel() {
    this.router.navigateByUrl('books');
  }

}
