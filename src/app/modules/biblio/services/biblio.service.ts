import {Injectable} from '@angular/core';
import {Livre} from '../models/livre';
import {Observable, of, Subject} from 'rxjs';

// import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BiblioService {

  livresSubject = new Subject();

  livres: Livre[] = [
    {
      id: '10:0373441819', name: 'Stick Shift', author: 'Leo, Mary', publish_date: '12-10-2001', status: 'Epuisé',
      image: 'https://d3525k1ryd2155.cloudfront.net/f/815/441/9780373441815.HQ.0.m.jpg'
    },
    {
      id: '10:0373225121', name: 'His Secret Son', author: 'Diamond, Jacqueline', publish_date: '08-25-2015', status: 'Disponible',
      image: 'https://d3525k1ryd2155.cloudfront.net/f/125/225/9780373225125.OL.0.m.jpg'
    },
    {
      id: '10:0965746836', name: 'Supper Time', author: 'Leon Hale', publish_date: '08-25-2015', status: 'Disponible',
      image: 'https://d3525k1ryd2155.cloudfront.net/f/830/746/9780965746830.OL.0.m.jpg'
    }
  ];

  constructor() {
  }

  getBooks(): Observable<Livre[]> {
    return of([...this.livres]); /* other method: this.livres.slice()*/
  }

  getOneBook(isbn): Livre {
    const livre = this.livres.filter(b => b.id === isbn)[0];
    return livre;
  }

  addNewBook(book: Livre) {
    this.livres.push(book);
    // return of(true);
    this.livresSubject.next(this.livres);
  }

  updateBook(book: Livre) {
    const i = this.livres.findIndex((liv => liv.id === book.id));
    this.livres[i] = book;
    this.livresSubject.next(this.livres);
  }

  deleteBook(isbn) {
    this.livres = this.livres.filter(b => b.id !== isbn);
    this.livresSubject.next(this.livres);
  }
}
