import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BookService} from '@services/book.service';
import {Title} from '@angular/platform-browser';
import {Observable} from 'rxjs';
import {Book} from '@models/book.model';
import {Router, RouterLink} from "@angular/router";


@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink],
})
export class BookListComponent implements OnInit {
  title: string | null = null;
  books: Observable<Book[]>;
  isAscending: boolean = true;

  constructor(private bookService: BookService, private titleService: Title, private router: Router) {
    this.books = this.bookService.getBooks();
  }

  ngOnInit(): void {
    this.title = this.titleService.getTitle();
  }

  sortBooksByTitle(): void {
    this.isAscending = !this.isAscending;
    this.books.subscribe((books) => {
      this.books = new Observable((observer) => {
        observer.next(
          books.sort((a, b) => {
            const comparison = a.title.localeCompare(b.title);
            return this.isAscending ? comparison : -comparison;
          })
        );
      });
    });
  }

  viewBookDetails(id: string):void{
    this.router.navigate(['/books', id, 'view']);
  }
}
