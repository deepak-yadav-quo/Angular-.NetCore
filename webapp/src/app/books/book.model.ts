export class Book {
    constructor(
        public id: number,
        public name: string,
        public authorName: string,
        public publishDate: Date,
        public genre: string
    ) {}
}
