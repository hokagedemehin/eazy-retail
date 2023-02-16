export type SingleProductProps = {
  item: {
    id: string | number;
    name: string;
    price: number;
    quantity: number;
    totalPrice: number;
    image: string;
    status: string;
} 
nextPageNavigation: (id: string | number) => void;

}
