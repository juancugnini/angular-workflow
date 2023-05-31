import { Component, HostListener, Input, Output } from '@angular/core';
import { Node, Path, Position, Size } from './models/model';
import { IOUtils } from './utils/io.utils';

@Component({
  selector: 'workflow',
  templateUrl: './workflow.html',
  styleUrls: ['./workflow.scss'],
})
export class Workflow {
  @Input()
  nodes: Node[] = [];
  @Input()
  paths: Path[] = [];
  
  newPath: Path = { from: null, to: null };
  linking: boolean = false;
  startPosition: Position | undefined = { x: 0, y: 0 };
  dottedLine: string = '';
  linkingNodes: {from: Node | null, to: Node | null} = {from: null, to: null};

  @HostListener('mousemove', ['$event']) onMouseMove(event) {
    if (this.linking) {
      let endPosition: Position = { x: event.clientX, y: event.clientY };

      this.dottedLine = IOUtils.getD(this.startPosition, endPosition);
    }
  }

  private nodeSize: Size = { width: 100, height: 100 };
  private nodePositions: { [nodeId: number]: Position } = {};

  constructor() {
    this.nodePositions = {
      1: { x: 30, y: 30 },
      2: { x: 200, y: 100 },
      3: { x: 400, y: 30 },
      4: { x: 600, y: 100 },
      5: { x: 0, y: 0 },
    };

    this.nodes = [
      {
        id: 1,
        icon: '🔥',
        title: 'En creación',
        initialPosition: this.nodePositions[1],
      },
      {
        id: 2,
        icon: '🐛',
        title: 'Creada',
        initialPosition: this.nodePositions[2],
      },
      {
        id: 3,
        icon: '🛠️',
        title: 'Anulada',
        initialPosition: this.nodePositions[3],
      },
      {
        id: 4,
        icon: '🚀',
        title: 'Cerrada',
        initialPosition: this.nodePositions[4],
      },
    ];

  }

  handleChangeNodePosition(event: { id: number; position: Position }) {
    this.nodePositions[event.id] = event.position;
  }

  getD(path: Path): void {
    const startPosition = this.getNodePosition(path.from, 'OUTPUT');
    const endPosition = this.getNodePosition(path.to, 'INPUT');
    return (
      startPosition && endPosition && IOUtils.getD(startPosition, endPosition)
    );
  }

  private getNodePosition(
    nodeId: number,
    socketType: 'INPUT' | 'OUTPUT'
  ): Position | undefined {
    const position = this.nodePositions[nodeId];
    if (!position) {
      return undefined;
    }
    if (socketType === 'INPUT') {
      return IOUtils.setOffset(position, {
        x: 0,
        y: this.nodeSize.height / 2,
      });
    }
    return IOUtils.setOffset(position, {
      x: this.nodeSize.width,
      y: this.nodeSize.height / 2,
    });
  }

  addNode(): void {
    const id = this.nodes.length + 1;
    this.nodes.push({
      id: id,
      icon: 'new',
      title: 'Nuevo Evento',
      initialPosition: this.nodePositions[5],
    });
  }

  edittedNode(node: Node): void {
    console.log('Node editted: ' + node);
  }

  linkNewNodes(event: any) {
    const path: Path = event.path;
    const node: Node = event.node;
    if (path.from != null) {
      this.clearNode(this.linkingNodes.from);
      this.newPath.from = path.from;
      this.linking = true;
      this.linkingNodes.from = node;
      node.linkingFrom = true;
      this.startPosition = this.getNodePosition(node.id, 'OUTPUT');
    } else if (path.to != null) {
      this.clearNode(this.linkingNodes.to);
      this.newPath.to = path.to;
      this.linkingNodes.to = node;
      node.linkingTo = true;
      this.linking = true;
      this.startPosition = this.getNodePosition(node.id, 'INPUT');
    }
    if (this.newPath.to != null && this.newPath.from != null) {
      if (!this.checkIfExits()) {
        this.paths.push(this.newPath);
        this.linkingNodes.to.inputSocket = {};
        this.linkingNodes.from.outputSocket = {};
      }
      this.clearLinking();
    }
  }

  private checkIfExits(): boolean {
    const exists: Path | undefined = this.paths.find((path) => {
      return path.from == this.newPath.from && path.to == this.newPath.to;
    });

    return exists != undefined || exists != null;
  }

  clearLinking(): void {
    if (this.linking) {
      this.clearNodeInvalidLinks();
      this.linking = false;
      this.newPath = { from: null, to: null };
      this.dottedLine = '';
    }
  }

  clearNodeInvalidLinks(): void {
    if (this.linkingNodes.to != null) {
      this.clearNode(this.linkingNodes.to);
    } else if (this.linkingNodes.from != null) {
      this.clearNode(this.linkingNodes.from);
    }
    this.linkingNodes.to = null;
    this.linkingNodes.from = null;
  }

  private clearNode(node: Node | null): void {
    if (node != null) {
      node.linkingFrom = false;
      node.linkingTo = false;
    }
  }
}
