import useData from "./useData";
export interface SalesDetailsRecord {
    orderID: number;
    salesOrderDetailID: number;
    date: string;
    onlineOrder: boolean;
    territory: string;
    customerPerson: string;
    customerStore: string;
    salesperson: string;
    product: string;
    category: string;
    subcategory: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
}


const useSalesDetails = () => useData<SalesDetailsRecord>('/details');


export default useSalesDetails