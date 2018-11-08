export class Box {
    public static boxFit(a: Box, b: Box): boolean {
        if (a.x === undefined && a.y === undefined) {
            return (
                a.width <= b.width &&
                a.height <= b.height
            );
        } else {
            return (
                a.x >= b.x && (a.x + a.width) <= (b.x + b.width) &&
                a.y >= b.y && (a.y + a.height) <= (b.y + b.height)
            );
        }
    }

    public static intersect(a: Box, b: Box): boolean {
        return (
            a.x < (b.x + b.width) && (a.x + a.width) > b.x &&
            a.y < (b.y + b.height) && (a.y + a.height) > b.y
        );
    }

    public static subtract(box: Box, from: Box): Box[] {
        return [box].concat(
            Box.divideX(from, box.x),
            Box.divideX(from, box.x + box.width),
            Box.divideY(from, box.y),
            Box.divideY(from, box.y + box.height)
        ).filter(_ => {
            return !Box.intersect(box, _);
        });
    }

    public static divideX(box: Box, x: number): Box[] {
        if (x <= box.x || x >= (box.x + box.width)) {
            return [];
        }
        return [
            { x: box.x, y: box.y, width: (x - box.x), height: box.height },
            { x: x, y: box.y, width: (box.x + box.width - x), height: box.height }
        ];
    }

    public static divideY(box: Box, y: number): Box[] {
        if (y <= box.y || y >= (box.y + box.height)) {
            return [];
        }
        return [
            { x: box.x, y: box.y, width: box.width, height: (y - box.y) },
            { x: box.x, y: y, width: box.width, height: (box.y + box.height - y) }
        ];
    }
}

export interface Box {
    component?: any;
    index?: number;
    width?: number;
    height?: number;
    x?: number;
    y?: number;
    position?: number;
}
