export class Tile {
    constructor(
        readonly coord: number,
        readonly value: string = ""
    ){}

    withNewValue( value: string ) : Tile {
        return new Tile(this.coord, value)
    }

    get isPicked() : boolean {
        return !!this.value;
    }

    get isX() : boolean {
        return this.value === "X";
    }

    get isO() : boolean {
        return this.value === "O";
    }
}