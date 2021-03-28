/**
 * Queue to add and receive typed values in order FIFO
 */
export default class Queue<T> {
    private storage: T[] = [];

    public add(value: T): void {
        this.storage.push(value);
    }

    public next(): T | undefined {
        return this.storage.shift();
    }
}
