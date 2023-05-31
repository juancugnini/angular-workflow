import { Position, Size } from "../models/model";

export class IOUtils {
  public static getEventPosition(event: MouseEvent | TouchEvent): Position {
    if (event instanceof MouseEvent) {
      const me: MouseEvent = event;
      return { x: me.pageX, y: me.pageY };
    } else {
      const te: TouchEvent = event;
      return { x: te.touches[0].pageX, y: te.touches[0].pageY };
    }
  }

  public static getElementPosition(element: HTMLElement): Position {
    const rect = element.getBoundingClientRect();
    return { x: rect.left + window.scrollX, y: rect.top + window.scrollY };
  }

  public static setOffset(position: Position, offset: Position) {
    return {
      x: position.x + offset.x,
      y: position.y + offset.y
    };
  }

  public static getOffset(from: Position, to: Position) {
    return {
      x: to.x - from.x,
      y: to.y - from.y
    };
  }

  public static equalSize(a: Size, b: Size) {
    return a.height === b.height && a.width === b.width;
  }

  public static equalPosition(a: Position, b: Position) {
    return a.x === b.x && a.y === b.y;
  }

  public static getMiddle(
    startPosition: Position,
    endPosition: Position
  ): Position {
    const x = startPosition.x + (endPosition.x - startPosition.x) * 0.5;
    const y = startPosition.y + (endPosition.y - startPosition.y) * 0.5;

    return { x: x, y: y };
  }

  public static getD(startPosition: Position, endPosition: Position): string {
    const hx1 =
      startPosition.x + Math.abs(endPosition.x - startPosition.x) * 0.8;
    const hx2 = endPosition.x - Math.abs(endPosition.x - startPosition.x) * 0.8;

    return `M ${startPosition.x} ${startPosition.y} C ${hx1} ${
      startPosition.y
    } ${hx2} ${endPosition.y} ${endPosition.x} ${endPosition.y}`;
  }
}
