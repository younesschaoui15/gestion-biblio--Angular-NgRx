import {Component, OnDestroy, OnInit} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';
import {Livre} from '../../models/livre';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../reducers';
import * as biblioModuleSelectors from '../../store/biblioModule.selectors';
import {BiblioService} from '../../services/biblio.service';
import {AddLivre, DeleteLivre, LoadLivresFail, LoadLivresReq, LoadLivresSuccess} from '../../store/biblio.actions';

@Component({
  selector: 'app-livres',
  templateUrl: './livres.component.html',
  styleUrls: ['./livres.component.css']
})
export class LivresComponent implements OnInit, OnDestroy {

  isDrawerVisible = false;

  // fields
  id: string;
  name: string;
  author: string;
  publishDate: string;
  status = true;

  livres: Livre[] = [];
  livres$;

  constructor(private msg: NzMessageService,
              private biblioServices: BiblioService,
              private router: Router,
              private store: Store<AppState>) {
  }

  ngOnInit() {
    this.getBooks();
    /* to  view results */
    this.biblioServices.livresSubject.subscribe(data => console.log('BOOKS', data));
  }

  ngOnDestroy(): void {
  }

  getBooks() {
    this.store.dispatch(new LoadLivresReq());
    this.livres$ = this.store.select(biblioModuleSelectors.selectLivres);
    this.store.dispatch(new LoadLivresSuccess());
  }

  addNewBook() {
    const newLivre: Livre = {
      id: this.id, name: this.name, author: this.author, publish_date: this.publishDate, status: (this.status ? 'Disponible' : 'Epuisé')
    };

    this.store.dispatch(new AddLivre({livre: newLivre}));

    this.msg.create('success', 'A new book was added successfully');
    setTimeout(() => {
      this.closeNewBookDrawer();
    }, 1000);
  }

  deleteBook(isbn) {
    this.store.dispatch(new DeleteLivre({id: isbn}));
    this.msg.create('success', 'The book was deleted successfully');
  }

  openNewBookDrawer() {
    this.isDrawerVisible = true;
  }

  closeNewBookDrawer() {
    this.isDrawerVisible = false;
    this.id = undefined;
    this.name = undefined;
    this.author = undefined;
    this.publishDate = undefined;
    this.status = true;
  }

  onChangeDate(result: Date): void {
    console.log('Date: ', result);
  }

}
