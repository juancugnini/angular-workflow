import { Component, Output, EventEmitter } from '@angular/core';
@Component({
  selector: "output-socket",
  templateUrl: "./output-socket.component.html",
  styleUrls: ["./output-socket.component.scss"]
})
export class OutputSocketComponent {
  @Output() emitToClick: EventEmitter<{}> = new EventEmitter<{}>();

  constructor() {}

  emitClick(): void {
    this.emitToClick.emit();
  }
}
