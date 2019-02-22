import {Directive, HostListener} from '@angular/core';

@Directive({
  selector: '[appDir1]'
})
export class Dir1Directive {

  constructor() { }

  @HostListener('click')
  onClick() {
    console.log('Element is clicked!');
  }

}
