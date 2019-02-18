import {Component, OnInit, OnDestroy} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';
import {Livre} from '../../models/livre';
import {Observable, Subscription} from 'rxjs';
import {Router, ActivatedRoute} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../../../reducers';
import * as biblioModuleSelectors from '../../store/biblioModule.selectors';
import * as _ from 'lodash';
import {BiblioService} from '../../services/biblio.service';
import {AddLivre, DeleteLivre, LoadLivres, LoadLivresReq} from '../../store/biblio.actions';

@Component({
  selector: 'app-livres',
  templateUrl: './livres.component.html',
  styleUrls: ['./livres.component.css']
})
export class LivresComponent implements OnInit, OnDestroy {

  isDrawerVisible = false;

  // fields
  isbn: string;
  name: string;
  author: string;
  publishDate: string;
  status = true;

  livres: Livre[] = [];
  livres$;

  constructor(private msg: NzMessageService,
              private biblioServices: BiblioService,
              private router: Router,
              private store: Store<AppState>) {}

  ngOnInit() {
    this.getBooks();
  }

  ngOnDestroy(): void {
  }

  getBooks() {
    this.store.dispatch(new LoadLivresReq());
    this.livres$ = this.store.select(biblioModuleSelectors.selectLivres);
  }

  addNewBook() {
    const newLivre: Livre = {
      id: this.isbn, name: this.name, author: this.author, publish_date: this.publishDate, status: (this.status ? 'Disponible' : 'Epuisé')
    };
    this.biblioServices.addNewBook(newLivre);
    this.store.dispatch(new AddLivre({livre: newLivre}));

    this.msg.create('success', 'A new book was added successfully');
    setTimeout(() => {
      this.closeNewBookDrawer();
    }, 1000);
  }

  deleteBook(isbn) {
    this.biblioServices.deleteBook(isbn);
    let updatedLivres = [];
    this.livres$.subscribe( data => updatedLivres = data.slice() );

    _.remove(updatedLivres, (livre) => {
      return livre.id === isbn;
    });
    this.store.dispatch(new DeleteLivre({id: isbn}));

    this.msg.create('success', 'The book was deleted successfully');
  }

  openNewBookDrawer() {
    this.isDrawerVisible = true;
  }

  closeNewBookDrawer() {
    this.isDrawerVisible = false;
    this.isbn = undefined;
    this.name = undefined;
    this.author = undefined;
    this.publishDate = undefined;
    this.status = true;
  }

  onChangeDate(result: Date): void {
    console.log('Date: ', result);
  }

}
