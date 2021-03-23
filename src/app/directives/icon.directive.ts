import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appIcon]'
})
export class IconDirective {
  @Input() color:string='var(--icon-color)';
  constructor(private elementRef:ElementRef, private renderer:Renderer2) {
    console.log(this.color);
    renderer.setStyle(elementRef.nativeElement, 'color', this.color);
    renderer.setStyle(elementRef.nativeElement, 'fontSize', '2em');
    renderer.setStyle(elementRef.nativeElement, 'cursor', 'pointer');
   }

}
