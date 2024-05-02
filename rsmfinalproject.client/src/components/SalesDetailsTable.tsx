import { Skeleton, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import useSalesDetails from "../hooks/useSalesDetails";

const SalesDetailsTable = () => {
    const { data, error, loading } = useSalesDetails();

    return (
        <>
            {error && <Text color="crimson">{error}</Text>}
            <TableContainer borderRadius="5px" borderWidth="1px" borderColor="gray.200">
                <Table variant="simple" size="sm">
                    <Thead>
                        <Tr>
                            <Th>Date</Th>
                            <Th>Region</Th>
                            <Th>Customer(Person)</Th>
                            <Th>Customer(Store)</Th>
                            <Th>Salesperson</Th>
                            <Th>Product</Th>
                            <Th>Category</Th>
                            <Th>Subcategory</Th>
                            <Th>Quantity</Th>
                            <Th>Price</Th>
                            <Th>Total</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {loading ? (
                            Array.from({ length: 20 }).map((_, index) => (
                                <Tr key={index}>
                                    <Td colSpan={11}>
                                        <Skeleton height="20px" />
                                    </Td>
                                </Tr>
                            ))
                        ) : (
                            data.map((record) => (
                                <Tr key={record.salesOrderDetailID}>
                                    <Td>{new Date(record.date).toLocaleDateString()}</Td>
                                    <Td>{record.territory}</Td>
                                    <Td>{record.customerPerson}</Td>
                                    <Td>
                                        {record.customerStore}
                                    </Td>
                                    <Td>{record.salesperson}</Td>
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
        </>
    );
}

export default SalesDetailsTable;