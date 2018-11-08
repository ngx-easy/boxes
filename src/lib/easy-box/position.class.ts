import { Component, Input, Renderer2, ElementRef, ViewChild, HostBinding, OnDestroy } from '@angular/core';

export class Position {
  public static getDelta(e: MouseEvent | TouchEvent, startEvent: MouseEvent | TouchEvent): ElementPosition {
    if (e instanceof MouseEvent) {
      const event: MouseEvent = startEvent as MouseEvent;
      return {
        top: e.pageY - event.pageY,
        left: e.pageX - event.pageX
      };
    } else if (e instanceof TouchEvent) {
      const event = startEvent as TouchEvent;
      return {
        top: e.changedTouches[0].pageY - event.changedTouches[0].pageY,
        left: e.changedTouches[0].pageX - event.changedTouches[0].pageX,
      };
    }
  }

  public static calculate(
    e: MouseEvent | TouchEvent,
    startEvent: MouseEvent | TouchEvent,
    element: any,
    lock?: boolean): ElementPosition {
    const position: ElementPosition = Position.getDelta(e, startEvent);
    if (lock) {
      const container = element.parentNode;
      // top
      const elementOffsetTop = element.offsetTop;
      if (position.top + elementOffsetTop < 0) {
        position.top = (elementOffsetTop * -1);
      }
      // bottom
      const elementOffsetHeight = element.offsetHeight + elementOffsetTop;
      const parentOffsetHeight = container.offsetHeight;
      if (position.top + elementOffsetHeight > parentOffsetHeight) {
        position.top = parentOffsetHeight - elementOffsetHeight;
      }
      // left
      const elementOffsetLeft = element.offsetLeft;
      if (position.left + elementOffsetLeft < 0) {
        position.left = (elementOffsetLeft * -1);
      }
      // right
      const elementOffsetWidth = element.offsetWidth + elementOffsetLeft;
      const parentOffsetWidth = container.offsetWidth;
      if (position.left + elementOffsetWidth > parentOffsetWidth) {
        position.left = parentOffsetWidth - elementOffsetWidth;
      }
    }
    return position;
  }
}

export interface ElementPosition {
  top: number;
  left: number;
}
