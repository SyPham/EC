export class Oc {
    constructor() {
        this.children = new Array<Oc>();
    }
    key: number;
    levelnumber: number;
    parentid: number;
    state: boolean;
    code: string;
    HasChildren: boolean;
    children: Array<Oc>;
}
