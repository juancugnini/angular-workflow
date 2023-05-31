import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: "input-socket",
  templateUrl: "./input-socket.component.html",
  styleUrls: ["./input-socket.component.scss"]
})
export class InputSocketComponent {
  @Output() emitFromClick: EventEmitter<{}> = new EventEmitter<{}>();

  constructor() {}

  emitClick(): void {
    this.emitFromClick.emit();
  }
}
