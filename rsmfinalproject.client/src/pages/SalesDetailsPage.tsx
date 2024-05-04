import { Box, Checkbox, HStack, Text } from "@chakra-ui/react";
import ProductCategorySelector from "../components/ProductCategorySelector";
import SalesRegionSelector from "../components/SalesRegionSelector";
import SearchBox from "../components/SearchBox";
import { ProductCategory } from "../hooks/useProductCategories";
import { Region } from "../hooks/useSalesRegions";
import { useState } from "react";
import SalesDetailsTable from "../components/SalesDetailsTable";
import DatePicker from "../components/DatePicker";
import useSalesDetails from "../hooks/useSalesDetails";
import { Pagination } from "antd";
import SalesDetailsReportMenu from "../components/SalesDetailsReportMenu";
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
    const { data, error, loading } = useSalesDetails(salesDetailsQuery);

    if (error) return <Text textAlign='center' color="crimson">{error}</Text>


    return (
        <><HStack display='flex' justifyContent='center' gap='20px' marginY='30px'>
            <Checkbox disabled={loading} checked={salesDetailsQuery.onlineOrder} colorScheme='orange' onChange={() => setSalesDetailsQuery({ ...salesDetailsQuery, onlineOrder: !salesDetailsQuery.onlineOrder })} >
                Online Sales
            </Checkbox>
            <SearchBox disabled={loading} placeholder="customer"
                onSearch={(textSearch) => setSalesDetailsQuery({ ...salesDetailsQuery, textSearch })} />
            <ProductCategorySelector
                selectedProductCategory={salesDetailsQuery.category}
                onSelectProductCategory={(category) => setSalesDetailsQuery({ ...salesDetailsQuery, category })} />
            <SalesRegionSelector
                selectedSalesRegion={salesDetailsQuery.territory}
                onSelectSalesRegion={(region) => setSalesDetailsQuery({ ...salesDetailsQuery, territory: region })} />
            <Box display='flex' gap='10px'>
                <DatePicker
                    disabled={loading}
                    labelText="From"
                    maxDate={salesDetailsQuery.endDate ? salesDetailsQuery.endDate : new Date().toISOString().slice(0, 10)}
                    minDate="2011-05-31"
                    onSelectDate={(date) => setSalesDetailsQuery({ ...salesDetailsQuery, startDate: date })}
                />
                <DatePicker
                    disabled={loading}
                    labelText="To"
                    maxDate={new Date().toISOString().slice(0, 10)}
                    minDate={salesDetailsQuery.startDate ? salesDetailsQuery.startDate : "2011-05-31"}
                    onSelectDate={(date) => setSalesDetailsQuery({ ...salesDetailsQuery, endDate: date })}
                />
            </Box>
            <SalesDetailsReportMenu data={data.results} />
        </HStack>
            <SalesDetailsTable
                data={data.results}
                loading={loading}
            /><Box marginY='20px' display='flex' justifyContent='center'>
                <Pagination
                    disabled={loading}
                    current={salesDetailsQuery.pageNumber}
                    onChange={(page, size) => setSalesDetailsQuery({ ...salesDetailsQuery, pageNumber: page, pageSize: size })}
                    total={data?.count}
                    hideOnSinglePage
                />
            </Box></>
    );
}

export default SalesDetailsPage;
