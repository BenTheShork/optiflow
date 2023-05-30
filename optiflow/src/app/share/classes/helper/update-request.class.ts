export class UpdateRequest<T> {
    constructor(
        public data: T,
        public properties: string[]
    ) { }
}
