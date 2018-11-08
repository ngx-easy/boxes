import { Box } from './box.class';
import { Sorter, Sorting } from './sorting.class';

export class Packer {
    public packed: Array<Box> = [];
    public unpacked: Array<Box> = [];
    private width: number;
    private height: number;
    private gutter: number;
    private sorting: Sorting;
    private empty: Array<Box> = [];

    constructor(width: number, height: number, gutter: number, sorting?: Sorting) {
        this.gutter = gutter ? gutter : 0;
        this.sorting = sorting ? sorting : Sorting.Horizontal;
        this.width = width;
        this.height = height;
        this.empty = [{
            x: 0,
            y: 0,
            width: width,
            height: height
        }];
    }

    public pack(boxes: Array<Box>) {
        // sort
        boxes.sort((a: Box, b: Box) => {
            if (a.index < b.index) {
                if (b.x !== undefined && b.y !== undefined) {
                    return 1;
                } else {
                    return -1;
                }
            } else {
                if (a.x !== undefined && a.y !== undefined) {
                    return -1;
                } else {
                    return 1;
                }
            }
        });
        // pack
        boxes.map(box => {
            return this._pack(box) || box;
        })        
        // order results
        boxes.sort((a: Box, b: Box) => {
            if (a.y < b.y) {
                return -1;
            }
            if (a.y == b.y) {
                if (a.x < b.x) {
                    return -1;
                } else {
                    return 1;
                }
            }
            return 1;
        }).map((box, index, array) => {
            box.index = index;
        });
    }

    private _pack(box: Box) {
        this.empty.some(_box => {
            if (Box.boxFit(box, _box)) {
                box.x = box.x !== undefined ? box.x : _box.x;
                box.y = box.y !== undefined ? box.y : _box.y;
                if (this.gutter) {
                    box.x += _box.x > 0 ? this.gutter : 0;
                    box.y += _box.y > 0 ? this.gutter : 0;
                }
                return true;
            }
            return false;
        });

        if (box.x === undefined || box.y === undefined) {
            this.unpacked.push(box);
            return false;
        }

        this.packed.push(box);

        let new_empty: Array<Box> = [];
        this.empty.forEach(fit => {
            if (!Box.intersect(box, fit)) {
                return new_empty.push(fit);
            }
            new_empty = new_empty.concat(Box.subtract(box, fit));
        });

        const sorted = Sorter.sort(new_empty, this.sorting);
        this.empty = sorted.filter((a: Box) => {
            return sorted.every((b: Box) => {
                return a === b || !Box.boxFit(a, b);
            });
        });

        return box;
    }
}
