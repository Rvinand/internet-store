export interface IDevice {
    info: [{title: string, description: string}];
    id: number,
    name: string,

    description: string,
    img: ImageData | null,

    rating: number,

    price: number
}