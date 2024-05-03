import { Box, Skeleton, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import useSalesDetails from "../hooks/useSalesDetails";
import { SalesDetailsQuery } from "../pages/SalesDetailsPage";
import { Pagination } from "antd";

interface Props {
    salesDetailsQuery: SalesDetailsQuery;
    onPageChange: (page: number, size: number) => void;
}

const SalesDetailsTable = ({ salesDetailsQuery, onPageChange }: Props) => {
    const { data, error, loading } = useSalesDetails(salesDetailsQuery);

    if (error) return <Text color="crimson">{error}</Text>

    return (
        <>
            <TableContainer borderRadius="5px" borderWidth="1px" borderColor="gray.200">
                <Table variant="simple" size="sm">
                    <Thead>
                        <Tr>
                            <Th>Date</Th>
                            <Th>Region</Th>
                            <Th>Customer(Person)</Th>
                            <Th>Salesperson</Th>
                            <Th>Product</Th>
                            <Th>Category</Th>
                            <Th>Subcategory</Th>
                            <Th>Qty</Th>
                            <Th>Price</Th>
                            <Th>Total</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {loading ? (
                            Array.from({ length: 10 }).map((_, index) => (
                                <Tr key={index}>
                                    <Td colSpan={10}>
                                        <Skeleton height="20px" />
                                    </Td>
                                </Tr>
                            ))
                        ) : (
                            data?.results.map((record) => (
                                <Tr key={record.salesOrderDetailID}>
                                    <Td>{new Date(record.date).toLocaleDateString()}</Td>
                                    <Td>{record.territory}</Td>
                                    <Td>{record.customerPerson}</Td>
                                    <Td>{record.salesperson || 'N/A'}</Td>
                                    <Td>{record.product}</Td>
                                    <Td>{record.category}</Td>
                                    <Td>{record.subcategory}</Td>
                                    <Td>{record.quantity}</Td>
                                    <Td>{record.unitPrice.toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                    })}</Td>
                                    <Td>{record.totalPrice.toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                    })}</Td>
                                </Tr>
                            ))
                        )}
                    </Tbody>
                </Table>
            </TableContainer>
            <Box marginY='10px' display='flex' justifyContent='center'>
                <Pagination
                    current={salesDetailsQuery.pageNumber}
                    onChange={(page, size) => onPageChange(page, size)}
                    total={data?.count}
                    hideOnSinglePage
                />
            </Box>
        </>
    );
}

export default SalesDetailsTable;