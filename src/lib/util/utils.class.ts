export class Utils {
    public static getFormat(value: string): Format {
        if (String(value).includes('%')) {
            return Format.Percent;
        } else if (String(value).includes('px')) {
            return Format.Pixel;
        } else {
            return Format.Number;
        }
    }

    public static getNumber(value: string): number {
        switch (Utils.getFormat(value)) {
            case Format.Percent:
                return parseInt(value, 10) / 100;
            case Format.Pixel:
                return parseInt(value, 10);
            case Format.Number:
                return typeof value === 'undefined' ? 0 : Number(value);
        }
    }

    public static parseToDecimal(value: string): number {
        return parseInt(value, 10) / 100;
    }
}

export enum Format {
    Pixel, Percent, Number
}
