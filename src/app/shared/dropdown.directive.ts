import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  // bing the 'open' class property onto the element which the directive is placed
  @HostBinding('class.open') isOpen: false;

  // add or remove the open css class on the element it sits on
  @HostListener('click') toggleOpen() {
    // @ts-ignore
    this.isOpen = !this.isOpen;
  }
}
