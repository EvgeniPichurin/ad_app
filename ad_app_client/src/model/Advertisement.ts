export type Advertisement = {
    id: number;
    categoryName: string;
    price: number;
    itemName: string;
    itemDetails: string;
}

export function createAd(id: number, categoryName: string, price: number,
                         itemName: string, itemDetails: string): Advertisement {
    return {categoryName, id, price, itemName, itemDetails};
}