import {Injectable} from '@angular/core';
import {Livre} from '../models/livre';
import {Observable, of, Subject} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireStorage} from '@angular/fire/storage';
import * as firebase from 'firebase';
import {UploadFile} from 'ng-zorro-antd';

@Injectable({
  providedIn: 'root'
})
export class BiblioService {

  livresSubject = new Subject();

  livres: Livre[] = [
    {
      id: '10:0373441819', name: 'My Lovely Wife', author: 'Samantha Downing', publish_date: '03-26-2019', status: 'Epuisé',
      image: 'assets/images/books/10-0373441819.jpg'
    },
    {
      id: '10:0373225121',
      name: 'You Know You Want This: Cat Person and Other Stories',
      author: 'Kristen Roupenian',
      publish_date: '01-25-2019',
      status: 'Disponible',
      image: 'assets/images/books/10-0373225121.jpg'
    },
    {
      id: '10:0965746836', name: 'The Huntress: A Novel', author: 'Kate Quinn', publish_date: '02-18-2019', status: 'Disponible',
      image: 'assets/images/books/10-0965746836.jpg'
    }
  ];

  constructor(private db: AngularFirestore,
              private storage: AngularFireStorage) {
  }

  getBooks(): Observable<Livre[]> {
    // return of([...this.livres]); /* other method: this.livres.slice()*/
    return (this.db.collection('books').valueChanges() as Observable<Livre[]>);
  }

  getOneBook(isbn): Livre {
    const livre = this.livres.filter(b => b.id === isbn)[0];
    return livre;
  }

  addNewBook(book: Livre) {
    // this.livres.push(book);
    // this.livresSubject.next(this.livres);
    this.db.collection('books').add(book);
    console.log('link', this.db.collection('books').ref.firestore.app.storage('images/books').ref);
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

  uploadImage(file: UploadFile) {
    console.log('File arrived : ', file.filename);
    const task: firebase.storage.UploadTask = undefined;
    const booksRef = firebase.storage().ref().child('images/books');
    const uploadTask = booksRef.put(file.thumbUrl);
    // uploadTask.snapshotChanges().subscribe(
    //   (data) => console.log('loading...', data),
    //   (data) => console.log('Erreur', data),
    //   () => console.log('Complited!')
    // );
  }
}
