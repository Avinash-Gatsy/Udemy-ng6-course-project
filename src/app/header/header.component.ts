import {Component, EventEmitter, Output} from '@angular/core';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
})
export class HeaderComponent {
  // @Output() decorator to make the event listenable from parent scope, in this case app.component.html
  @Output() featureSelected = new EventEmitter<string>();
  onSelect(feature: string) {
    this.featureSelected.emit(feature);
  }
}
