import {Component, OnDestroy, OnInit} from '@angular/core';
import {NzMessageService, UploadFile} from 'ng-zorro-antd';
import {Livre} from '../../models/livre';
import {BiblioService} from '../../services/biblio.service';
import {BiblioStoreService} from '../../services/biblio-store.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as BiblioValidators from '../../validators/biblio.validators';
import {Observable, Observer} from 'rxjs';

@Component({
  selector: 'app-livres',
  templateUrl: './livres.component.html',
  styleUrls: ['./livres.component.css']
})
export class LivresComponent implements OnInit, OnDestroy {

  loading = false;
  avatarUrl: string;
  urlAction = '';
  isDrawerVisible = false;
  isLoadingOne = false;
  newLivre: Livre = {id: '', name: '', author: '', publish_date: '', image: '', status: ''};
  livres: Livre[] = [];
  livres$: Observable<Livre[]>;
  addLivreForm: FormGroup;
  isGrid = false;

  constructor(private msg: NzMessageService,
              private biblioServices: BiblioService,
              private formBuilder: FormBuilder,
              private biblioStoreServices: BiblioStoreService) {
  }

  ngOnInit() {
    this.livres$ = this.biblioStoreServices.getLivres();
    /* to  view results */
    this.biblioServices.livresSubject.subscribe(data => console.log('BOOKS', data));

    this.initAddLivreForm();
    this.urlAction = this.biblioServices.booksRef
  }

  ngOnDestroy(): void {
  }

  onSubmit() {
    console.log('FORM', this.addLivreForm.value);
    this.addNewBook();
  }

  /*Add a new book*/
  addNewBook() {
    this.isLoadingOne = true;
    if (this.addLivreForm.invalid) {
      this.msg.create('error', 'This form is invalid, there are some required data!');
      this.isLoadingOne = false;
      return;
    }

    // this.biblioStoreServices.addLivre(this.addLivreForm.value);

    this.msg.create('success', 'A new book was added successfully');
    setTimeout(() => {
      this.isLoadingOne = false;
      this.closeNewBookDrawer();
    }, 1000);
  }

  /*Delete a book*/
  deleteBook(id) {
    this.biblioStoreServices.deleteLivre(id);
    this.msg.create('success', 'The book was deleted successfully');
  }

  /*Open and close the drawer*/
  openNewBookDrawer() {
    this.isDrawerVisible = true;
  }

  closeNewBookDrawer() {
    this.isDrawerVisible = false;
    this.addLivreForm.reset({name: '', image: '', password: {coPw: ''}});
  }

  onChangeDate(result: Date): void {
    console.log('Date: ', result);
  }

  /* form with FormBuilder */
  initAddLivreForm() {
    this.addLivreForm = this.formBuilder.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(3), BiblioValidators.titleReg(/hhh/)]],
      author: [''],
      image: [''],
      publish_date: [''],
      status: [''],
      // password: this.formBuilder.group({
      //   pw: [''],
      //   coPw: ['']
      // }, {validators: BiblioValidators.password})
    });

    /* Conditional validation */
    this.addLivreForm.get('name').valueChanges.subscribe((data) => {
      const author = this.addLivreForm.get('author');
      data.length > 0 ? author.setValidators(Validators.required) : author.clearValidators();
      author.updateValueAndValidity();
    });

    /* form with FormGroup */
    // addLivreForm = new FormGroup({
    //   id: new FormControl(),
    //   title: new FormControl(),
    //   author: new FormControl(),
    //   image: new FormControl(),
    //   publishDate: new FormControl(),
    //   status: new FormControl()
    // });
  }


  /* Upload image */

  onBeforeUpload = (file: File) => {
    console.log('FILE, before upload...', file);
    console.log('FILE, URL...', this.biblioServices.booksRef);

    return true;
  };

  onChange(info: { file: UploadFile }): void {
    if (info.file.status === 'uploading') {
      this.loading = true;
      return;
    }
    if (info.file.status === 'done') {
      console.log('FILE:', info.file);
      this.loading = false;
      this.avatarUrl = info.file.thumbUrl;
    }

    // this.biblioServices.uploadImage(info.file);
  }

}
