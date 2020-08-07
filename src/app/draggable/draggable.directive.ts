import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appDraggable]'
})
export class DraggableDirective {
  @HostBinding('class.draggable') draggable = true;

  // to trigger pointer-events polyfill
  //@HostBinding('attr.touch-action') touchAction = 'none';

  @Output() dragStart = new EventEmitter<PointerEvent>();
  @Output() dragMove = new EventEmitter<PointerEvent>();
  @Output() dragEnd = new EventEmitter<PointerEvent>();
  @Output() unSelect = new EventEmitter<KeyboardEvent>();
  @Output() moveUp = new EventEmitter<KeyboardEvent>();
  @Output() moveDown = new EventEmitter<KeyboardEvent>();
  @Output() moveLeft = new EventEmitter<KeyboardEvent>();
  @Output() moveRight = new EventEmitter<KeyboardEvent>();

  @HostBinding('class.dragging') dragging = false;

  @HostListener('pointerdown', ['$event'])
  onClearDown(event: PointerEvent): void {
    console.log('started...');
    // if(!this.dragging){
    //   this.dragging = true;
    //   this.dragStart.emit(event);
    // }else{
      this.dragging = false;
      this.dragStart.emit(event);
    // }
  }

  @HostListener('pointerdown', ['$event'])
  onPointerDown(event: PointerEvent): void {
    console.log('started...');
    if(!this.dragging){
      this.dragging = true;
      this.dragStart.emit(event);
    }else{
      this.dragging = false;
      this.dragStart.emit(event);
    }
  }

  @HostListener('document:pointermove', ['$event'])
  onPointerMove(event: PointerEvent): void {
    if (!this.dragging) {
      return;
    }
    
    //this.dragMove.emit(event);
  }

  @HostListener('document:pointerup', ['$event'])
  onPointerUp(event: PointerEvent): void {
    if (!this.dragging) {
      return;
    }

    //this.dragging = false;
    this.dragEnd.emit(event);
  }

  @HostListener('document:keydown.escape', ['$event'])
  onUnselect(event: KeyboardEvent): void {
    console.log('Escape...');
    this.dragging = false;
    this.unSelect.emit(event);
  }

  @HostListener('document:keydown.arrowup', ['$event'])
  onMoveUp(event: KeyboardEvent): void {
    console.log('Moving Up...');
    if (!this.dragging) {
      return;
    }
    this.moveUp.emit(event);
  }

  @HostListener('document:keydown.arrowdown', ['$event'])
  onMoveDown(event: KeyboardEvent): void {
    console.log('Moving down...');
    if (!this.dragging) {
      return;
    }
    this.moveDown.emit(event);
  }

  @HostListener('document:keydown.arrowright', ['$event'])
  onMoveRight(event: KeyboardEvent): void {
    console.log('Moving Right...');
    if (!this.dragging) {
      return;
    }
    this.moveRight.emit(event);
  }

  @HostListener('document:keydown.arrowleft', ['$event'])
  onMoveLeft(event: KeyboardEvent): void {
    console.log('Moving Left...');
    if (!this.dragging) {
      return;
    }
    this.moveLeft.emit(event);
  }
}
