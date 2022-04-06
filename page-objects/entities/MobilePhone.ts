export class MobilePhone {
    private _name: string;
    private _description: string;
    private _minPrice: number;
    private _os: string;
    private _screenSize: string;
    private _screenDimension: string;
    private _ram: number;
    private _memory: number;

    constructor(name: string, description: string, minPrice: number, additionalInfo?: { os?: string, screenSize?: string, screenDimension?: string, ram?: number, memory?: number }) {
        this._name = name;
        this._description = description;
        this._minPrice = minPrice;
        this._os = additionalInfo.os;
        this._screenSize = additionalInfo.screenSize;
        this._screenDimension = additionalInfo.screenDimension;
        this._ram = additionalInfo.ram;
        this._memory = additionalInfo.memory;
    }

    public get name() {
        return this._name;
    }

    public get description() {
        return this._description;
    }

    public get minPrice() {
        return this._minPrice;
    }

    public get os() {
        return this._os;
    }

    public get screenSize() {
        return this._screenSize;
    }

    public get screenDimension() {
        return this._screenDimension;
    }

    public get ram() {
        return this._ram;
    }

    public get memory() {
        return this._memory;
    }

    equal(mobile: MobilePhone) {
        if (this.name === mobile.name
            && this.description === mobile.description
            && this.minPrice === mobile.minPrice
            && this.os === mobile.os
            && this.screenSize === mobile.screenSize
            && this.screenDimension === mobile.screenDimension
            && this.ram === mobile.ram
            && this.memory === mobile.memory) {
            return true;
        } else {
            console.info(`Phones not equals:\n
                                            current Name: ${this.name}, expected: ${mobile.name}\n
                                            current Description: ${this.description}, expected: ${mobile.description}\n
                                            current Minimal price: ${this.minPrice}, expected: ${mobile.minPrice}
                                            current Os: ${this.os}, expected: ${mobile.os}
                                            current Screen size: ${this.screenSize}, expected: ${mobile.screenSize}
                                            current Screen dimension: ${this.screenDimension}, expected: ${mobile.screenDimension}
                                            current Ram: ${this.ram}, expected: ${mobile.ram}
                                            current Memory: ${this.memory}, expected: ${mobile.memory}`);
            return false;
        }
    }
}