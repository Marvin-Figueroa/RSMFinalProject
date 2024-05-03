import { Box, Skeleton, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import useSalesPerformance from "../hooks/useSalesPerformance";
import { SalesPerformanceQuery } from "../pages/SalesPerformancePage";
import { Pagination } from "antd";

interface Props {
    salesPerformanceQuery: SalesPerformanceQuery;
    onPageChange: (page: number, size: number) => void;
}

const SalesPerformanceTable = ({ salesPerformanceQuery, onPageChange }: Props) => {
    const { data, error, loading } = useSalesPerformance(salesPerformanceQuery);

    if (error) return <Text textAlign='center' color="crimson">{error}</Text>

    return (
        <>
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
                            data?.results.map((record) => (
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
            <Box marginY='10px' display='flex' justifyContent='center'>
                <Pagination
                    current={salesPerformanceQuery.pageNumber}
                    onChange={(page, size) => onPageChange(page, size)}
                    total={data?.count}
                    hideOnSinglePage
                />
            </Box>

        </>
    );
}

export default SalesPerformanceTable;