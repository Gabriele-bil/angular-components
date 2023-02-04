import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[gbDynamicTabAnchor]'
})
export class DynamicTabAnchorDirective {
  constructor(public viewContainer: ViewContainerRef) { }
}
