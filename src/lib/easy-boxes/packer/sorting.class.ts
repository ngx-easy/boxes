export class Sorter {
    public static sort(array: Array<any>, sorter: Sorting): Array<any> {
        let compareFn;
        switch (sorter) {
            case Sorting.Fit:
                compareFn = (a, b) => {
                    return (
                        (Math.pow(a.x, 2) + Math.pow(a.y, 2)) -
                        (Math.pow(b.x, 2) + Math.pow(b.y, 2))
                    );
                };
                break;
            case Sorting.Vertical:
                compareFn = (a, b) => {
                    const sort = a['x'] - b['x'];
                    if (sort !== 0) {
                        return sort;
                    }
                    return a['y'] - b['y'];
                };
                break;
            case Sorting.Horizontal:
                compareFn = (a, b) => {
                    const sort = a['y'] - b['y'];
                    if (sort !== 0) {
                        return sort;
                    }
                    return a['x'] - b['x'];
                };
                break;
        }
        return array.sort(compareFn);
    }
}

export enum Sorting {
    Fit = 'Fit',
    Horizontal = 'Horizontal',
    Vertical = 'Vertical'
}
