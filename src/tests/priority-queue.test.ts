import { assertEquals } from "https://deno.land/std@0.74.0/testing/asserts.ts";
import PriorityQueue from "../priority-queue.ts";

Deno.test("Pop returns a pushed value", () => {
  const queue = new PriorityQueue<number>((a, b) => a - b);
  queue.push(1);
  assertEquals(queue.pop(), 1);
});

Deno.test("Pop returns an initial value", () => {
  const queue = new PriorityQueue<number>((a, b) => a - b, [2]);
  assertEquals(queue.pop(), 2);
});

Deno.test("Pop returns the lowest pushed value", () => {
  const queue = new PriorityQueue<number>((a, b) => a - b);
  queue.push(3);
  queue.push(1);
  queue.push(2);
  queue.push(4);
  assertEquals(queue.pop(), 1);
});

Deno.test("Pop returns the lowest initial value", () => {
  const queue = new PriorityQueue<number>((a, b) => a - b, [3, 1, 2, 4]);
  assertEquals(queue.pop(), 1);
});

Deno.test("Pop returns values in order", () => {
  const queue = new PriorityQueue<number>((a, b) => a - b, [3, 1, 2, 4]);
  assertEquals(queue.pop(), 1);
  assertEquals(queue.pop(), 2);
  assertEquals(queue.pop(), 3);
  assertEquals(queue.pop(), 4);
});
