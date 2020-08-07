import { Directive, ElementRef, HostBinding, HostListener, Input } from '@angular/core';
import { DraggableDirective } from './draggable.directive';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

interface Position {
  x: number;
  y: number;
}

@Directive({
  selector: '[appMovable]'
})
export class MovableDirective extends DraggableDirective {
  @HostBinding('style.transform') get transform(): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(
      `translateX(${this.position.x}px) translateY(${this.position.y}px)`
    );
  }

  @HostBinding('class.movable') movable = true;

  position: Position = {x: 0, y: 0};

  private startPosition: Position;

  @Input('appMovableReset') reset = false;

  constructor(private sanitizer: DomSanitizer, public element: ElementRef) {
    super();
  }

  @HostListener('dragStart', ['$event'])
  onDragStart(event: PointerEvent) {
    this.startPosition = {
      x: event.clientX - this.position.x,
      y: event.clientY - this.position.y
    }
    console.log();
  }

  @HostListener('dragMove', ['$event'])
  onDragMove(event: PointerEvent) {
    // if(event.key == 'w' || event.key == 'W'){
    //   this.position.x=this.position.x+1;
    // }else if(event.key == 's' || event.key == 'S'){
    //   this.position.x=this.position.x-1;
    // }else if(event.key == 'a' || event.key == 'A'){
    //   this.position.y=this.position.y+1;
    // }else if(event.key == 'd' || event.key == 'D'){
    //   this.position.y=this.position.y-1;
    // }
    this.position.x = event.clientX - this.startPosition.x;
    this.position.y = event.clientY - this.startPosition.y;
  }

  @HostListener('dragEnd', ['$event'])
  onDragEnd(event: PointerEvent) {
    if (this.reset) {
      this.position = {x: 0, y: 0};
    }
  }

  @HostListener('moveUp', ['$event'])
  onUp(event: KeyboardEvent) {
    this.position = {
      x: this.position.x,
      y: (this.position.y)-10
    }
  }

  @HostListener('moveDown', ['$event'])
  onDown(event: KeyboardEvent) {
    this.position = {
      x: this.position.x,
      y: (this.position.y)+10
    }
  }

  @HostListener('moveLeft', ['$event'])
  onleft(event: KeyboardEvent) {
    this.position = {
      x: this.position.x-10,
      y: (this.position.y)
    }
  }

  @HostListener('moveRight', ['$event'])
  onRight(event: KeyboardEvent) {
    this.position = {
      x: this.position.x+10,
      y: (this.position.y)
    }
  }
}
