import { Comparator, HeapList } from "../types.ts";

export const swap = (
  arr: unknown[],
  a: number,
  b: number,
): void => {
  [arr[a], arr[b]] = [arr[b], arr[a]];
};

export const heapInsert = <T>(
  heap: HeapList<T>,
  comparator: Comparator<T>,
  value: T,
): void => {
  heap.push(value);
  heapifyUp(heap, comparator, heap.length - 1);
};

export const heapRemove = <T>(
  heap: HeapList<T>,
  comparator: Comparator<T>,
): T | null => {
  const result = heap[1];
  if (heap.length > 3) {
    heap[1] = heap[heap.length - 1];
    heap.pop();
    heapifyDown(heap, comparator, 1);
  } else if (heap.length === 3) {
    heap[1] = heap[2];
    heap.pop();
  } else if (heap.length === 2) {
    heap.pop();
  } else {
    return null;
  }
  return result;
};

export const heapifyUp = <T>(
  heap: HeapList<T>,
  comparator: Comparator<T>,
  i: number,
): void => {
  const parentIndex = toParent(i);
  if (
    i > 1 && heap[i] !== null && heap[parentIndex] !== null &&
    comparator(heap[i]!, heap[parentIndex]!) < 0
  ) {
    swap(heap, i, toParent(i));
    heapifyUp(heap, comparator, toParent(i));
  }
};

export const heapifyDown = <T>(
  heap: HeapList<T>,
  comparator: Comparator<T>,
  index: number,
): void => {
  if (
    !heap[index] ||
    (toLeft(index) >= heap.length && toRight(index) >= heap.length)
  ) {
    return;
  }
  const [leftIndex, rightIndex] = [toLeft(index), toRight(index)];
  if (
    (toLeft(index) < heap.length && heap[index] !== null &&
      heap[leftIndex] !== null &&
      comparator(heap[index]!, heap[leftIndex]!) < 0) ||
    (toRight(index) < heap.length && heap[index] !== null &&
      heap[rightIndex] !== null &&
      comparator(heap[index]!, heap[rightIndex]!) > 0)
  ) {
    let toSwapWith;
    if (heap[toLeft(index)] === undefined) {
      toSwapWith = toRight(index);
    } else if (heap[toRight(index)] === undefined) {
      toSwapWith = toLeft(index);
    } else {
      toSwapWith = comparator(heap[leftIndex]!, heap[rightIndex]!) <
          0
        ? toLeft(index)
        : toRight(index);
    }
    swap(heap, index, toSwapWith);
    heapifyDown(heap, comparator, toSwapWith);
  }
};

const toParent = (index: number): number => {
  return Math.floor(index / 2);
};

const toLeft = (index: number): number => {
  return index * 2;
};

const toRight = (index: number): number => {
  return index * 2 + 1;
};
