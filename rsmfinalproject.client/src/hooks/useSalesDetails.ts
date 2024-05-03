import { SalesDetailsQuery } from "../pages/SalesDetailsPage";
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

const useSalesDetails = (salesDetailsQuery: SalesDetailsQuery) =>
    useData<SalesDetailsRecord>('/details',
        {
            params: {
                category: salesDetailsQuery.category?.name,
                territory: salesDetailsQuery.territory?.name,
                search: salesDetailsQuery.textSearch,
                onlineOrder: salesDetailsQuery.onlineOrder,
                startDate: salesDetailsQuery.startDate,
                endDate: salesDetailsQuery.endDate,
                pageNumber: salesDetailsQuery.pageNumber,
                pageSize: salesDetailsQuery.pageSize
            }
        },
        [salesDetailsQuery]);

export default useSalesDetails