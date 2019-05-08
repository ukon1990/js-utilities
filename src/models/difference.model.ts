export class Difference {
    constructor(
        public name: string,
        public value1: any,
        public value2: any,
        public children?: Array<Difference>
    ) { }
}
