import { Injectable, EventEmitter, ElementRef } from '@angular/core';
import { Observable, Subscription, fromEvent } from 'rxjs';

@Injectable()
export class EasyBoxesService {

  public animation = 350;
  public lock: boolean;
  public resizeEvent = new EventEmitter<any>();
  public repackEvent = new EventEmitter<any>();

  private resizeSubscription: Subscription;

  constructor() {
    this.resizeSubscription =
      fromEvent(window, 'resize')
        .subscribe(() => {
          this.resizeEvent.emit();
          this.repackEvent.emit();
        });
  }
}
