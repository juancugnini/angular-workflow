import {
  Component,
  Input,
  Output,
  AfterViewInit,
  EventEmitter,
  ElementRef,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { Node, Position, Path } from '../../models/model';
import { CdkDragMove } from '@angular/cdk/drag-drop';
import { IOUtils } from '../../utils/io.utils';

@Component({
  selector: 'node',
  templateUrl: 'node.component.html',
  styleUrls: ['node.component.scss'],
})
export class NodeComponent {
  @ViewChildren('inputEl') inputEl: QueryList<ElementRef>;
  @Input() node: Node;
  @Output() changePosition: EventEmitter<{
    id: number;
    position: Position;
  }> = new EventEmitter<{ id: number; position: Position }>();
  @Output() nodeEdited: EventEmitter<{
    node: Node;
  }> = new EventEmitter<{ node: Node }>();

  @Output() newLink: EventEmitter<{ path: Path; node: Node }> =
    new EventEmitter<{ path: Path; node: Node }>();

  fromId: any;
  toId: any;
  isOver: boolean = false;

   ngAfterViewInit() {
    this.inputEl.changes.subscribe(() => {
      this.setFocus();
    });
  }  

  setFocus() {
    if (this.inputEl.length > 0) {
      this.inputEl.first.nativeElement.focus();
    }
  }

  handleDragMoved(event: CdkDragMove) {
    const newPosition = IOUtils.getElementPosition(
      event.source.element.nativeElement
    );
    this.changePosition.emit({ id: this.node.id, position: newPosition });
  }
  editNodeLabel(node: Node) {
    node.editing = true;
  }

  cancelEdit(node: Node) {
    node.editing = false;
    this.nodeEdited.emit({ node: node });
  }

  selectNodeFrom(node: Node) {
    const path: Path = { from: node.id, to: null };
    this.newLink.emit({ path, node });
  }

  selectNodeTo(node: Node) {
    const path: Path = { from: null, to: node.id };
    this.newLink.emit({ path, node });
  }
  setHover(over: boolean): void {
    this.isOver = over;
  }
}
