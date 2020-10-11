import { Comparator, HeapList } from "./types.ts";
import {
  heapInsert,
  heapRemove,
} from "./utilities/heap-utils.ts";

export default class PriorityQueue<T> {
  private heap: HeapList<T> = [null];
  private comparator: Comparator<T>;

  constructor(comparator: Comparator<T>, initialValues?: T[]) {
    this.comparator = comparator;
    if (initialValues && initialValues.length > 0) {
      initialValues.forEach((element) =>
        heapInsert(this.heap, this.comparator, element)
      );
    }
  }

  push(value: T): void {
    heapInsert(this.heap, this.comparator, value);
  }

  pop(): T | null {
    return heapRemove(this.heap, this.comparator);
  }
}
