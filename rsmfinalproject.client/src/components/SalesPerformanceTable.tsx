import { Skeleton, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { SalesPerformanceRecord } from "../hooks/useSalesPerformance";
interface Props {
    data: SalesPerformanceRecord[]
    loading: boolean
}

const SalesPerformanceTable = ({ data, loading }: Props) => {

    return (
        <TableContainer borderRadius="5px" borderWidth="1px" borderColor="gray.200">
            <Table variant="simple" size="sm">
                <Thead>
                    <Tr>
                        <Th>Product</Th>
                        <Th>Category</Th>
                        <Th>Region</Th>
                        <Th>Total Sales</Th>
                        <Th>% SalesInRegion</Th>
                        <Th>% CategorySalesInRegion</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {loading ? (
                        Array.from({ length: 10 }).map((_, index) => (
                            <Tr key={index}>
                                <Td colSpan={6}>
                                    <Skeleton height="20px" />
                                </Td>
                            </Tr>
                        ))
                    ) : (
                        data.map((record) => (
                            <Tr key={record.id}>
                                <Td>{record.productName}</Td>
                                <Td>{record.productCategory}</Td>
                                <Td>{record.region}</Td>
                                <Td>
                                    {record.totalSales.toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                    })}
                                </Td>
                                <Td>{record.percentageOfTotalSalesPerRegion} %</Td>
                                <Td>{record.percentageOfTotalCategorySalesInRegion} %</Td>
                            </Tr>
                        ))
                    )}
                </Tbody>
            </Table>
        </TableContainer>



    );
}

export default SalesPerformanceTable;