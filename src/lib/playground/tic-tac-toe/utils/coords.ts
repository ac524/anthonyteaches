import type { Tile } from "../classes/Tile";

export type CoordList = [number,number,number]
export type CoordChecksList = [number,number]
export type GetCoordChecksList = (coord: number)  => CoordChecksList;
export type GetCoordChecksLists = GetCoordChecksList[][];

export const getAdjacentLeft = (coord: number) : CoordChecksList => [coord-1,coord-2];
export const getAdjacentRight = (coord: number) : CoordChecksList => [coord+1,coord+2];
export const getAdjacentLeftRight = (coord: number) : CoordChecksList => [coord-1,coord+1];
export const getAdjacentUp = (coord: number) : CoordChecksList => [coord-3,coord-6];
export const getAdjacentDown = (coord: number) : CoordChecksList => [coord+3,coord+6];
export const getAdjacentUpDown = (coord: number) : CoordChecksList => [coord-3,coord+3];
export const getDiagonalUpRight = (coord: number) : CoordChecksList => [coord-2,coord-4];
export const getDiagonalUpLeft = (coord: number) : CoordChecksList => [coord-4,coord-8];
export const getDiagonalDownRight = (coord: number) : CoordChecksList => [coord+4,coord+8];
export const getDiagonalDownLeft = (coord: number) : CoordChecksList => [coord+2,coord+4];
export const getDiagonalUpLeftDownRight = (coord: number) : CoordChecksList => [coord-4,coord+4];
export const getDiagonalUpRightDownLeft = (coord: number) : CoordChecksList => [coord-2,coord+2];

export const checks : GetCoordChecksLists = [
    // Checks for Coord 0
    [
        getAdjacentRight,
        getAdjacentDown,
        getDiagonalDownRight
    ],
    // Checks for Coord 1
    [
        getAdjacentLeftRight,
        getAdjacentDown,
    ],
    // Checks for Coord 2
    [
        getAdjacentLeft,
        getAdjacentDown,
        getDiagonalDownLeft
    ],
    // Checks for Coord 3
    [
        getAdjacentRight,
        getAdjacentUpDown
    ],
    // Checks for Coord 4
    [
        getAdjacentRight,
        getAdjacentUpDown,
        getDiagonalUpLeftDownRight,
        getDiagonalUpRightDownLeft
    ],
    // Checks for Coord 5
    [
        getAdjacentLeft,
        getAdjacentUpDown
    ],
    // Checks for Coord 6
    [
        getAdjacentRight,
        getAdjacentUp,
        getDiagonalUpRight
    ],
    // Checks for Coord 7
    [
        getAdjacentLeftRight,
        getAdjacentUp
    ],
    // Checks for Coord 8
    [
        getAdjacentLeft,
        getAdjacentUp,
        getDiagonalUpLeft
    ]
];

export const getWinningCoords = ( coord : number, tiles: Tile[] ) : false|CoordList => {
    if( !tiles[coord].value ) return false;

    for( const getCoords of checks[coord] ) {
        
        const coordChecks = getCoords( coord );

        if(
            tiles[coord].value === tiles[coordChecks[0]].value
            && tiles[coord].value === tiles[coordChecks[1]].value
        ) {
            return [ coord, ...coordChecks ];
        }

    }

    return false;
}