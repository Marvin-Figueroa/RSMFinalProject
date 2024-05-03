import { Checkbox, HStack } from "@chakra-ui/react";
import ProductCategorySelector from "../components/ProductCategorySelector";
import SalesRegionSelector from "../components/SalesRegionSelector";
import SearchBox from "../components/SearchBox";
import { ProductCategory } from "../hooks/useProductCategories";
import { Region } from "../hooks/useSalesRegions";
import { useState } from "react";
import SalesDetailsTable from "../components/SalesDetailsTable";
export interface SalesDetailsQuery {
    territory: Region | null;
    category: ProductCategory | null;
    textSearch: string;
    onlineOrder: boolean;

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

        </HStack><SalesDetailsTable salesDetailsQuery={salesDetailsQuery} /></>
    );
}

export default SalesDetailsPage;
