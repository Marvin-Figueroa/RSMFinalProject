import { Box, Checkbox, HStack } from "@chakra-ui/react";
import ProductCategorySelector from "../components/ProductCategorySelector";
import SalesRegionSelector from "../components/SalesRegionSelector";
import SearchBox from "../components/SearchBox";
import { ProductCategory } from "../hooks/useProductCategories";
import { Region } from "../hooks/useSalesRegions";
import { useState } from "react";
import SalesDetailsTable from "../components/SalesDetailsTable";
import DatePicker from "../components/DatePicker";
export interface SalesDetailsQuery {
    territory: Region | null;
    category: ProductCategory | null;
    textSearch: string;
    onlineOrder: boolean;
    startDate: string;
    endDate: string;
    pageNumber: number;
    pageSize: number;

}

const SalesDetailsPage = () => {
    const [salesDetailsQuery, setSalesDetailsQuery] = useState<SalesDetailsQuery>({} as SalesDetailsQuery);

    return (
        <><HStack display='flex' justifyContent='center' gap='20px' marginY='30px'>
            <Checkbox checked={salesDetailsQuery.onlineOrder} colorScheme='green' onChange={() => setSalesDetailsQuery({ ...salesDetailsQuery, onlineOrder: !salesDetailsQuery.onlineOrder })} >
                Online Sales
            </Checkbox>
            <SearchBox placeholder="customer, salesperson, product..."
                onSearch={(textSearch) => setSalesDetailsQuery({ ...salesDetailsQuery, textSearch })} />
            <ProductCategorySelector
                selectedProductCategory={salesDetailsQuery.category}
                onSelectProductCategory={(category) => setSalesDetailsQuery({ ...salesDetailsQuery, category })} />
            <SalesRegionSelector
                selectedSalesRegion={salesDetailsQuery.territory}
                onSelectSalesRegion={(region) => setSalesDetailsQuery({ ...salesDetailsQuery, territory: region })} />
            <Box display='flex' gap='10px'>
                <DatePicker
                    labelText="From"
                    maxDate={salesDetailsQuery.endDate ? salesDetailsQuery.endDate : new Date().toISOString().slice(0, 10)}
                    minDate="2011-05-31"
                    onSelectDate={(date) => setSalesDetailsQuery({ ...salesDetailsQuery, startDate: date })}
                />
                <DatePicker
                    labelText="To"
                    maxDate={new Date().toISOString().slice(0, 10)}
                    minDate={salesDetailsQuery.startDate ? salesDetailsQuery.startDate : "2011-05-31"}
                    onSelectDate={(date) => setSalesDetailsQuery({ ...salesDetailsQuery, endDate: date })}
                />
            </Box>
        </HStack>
            <SalesDetailsTable
                salesDetailsQuery={salesDetailsQuery}
                onPageChange={(page, size) => setSalesDetailsQuery({ ...salesDetailsQuery, pageNumber: page, pageSize: size })}

            /></>
    );
}

export default SalesDetailsPage;
