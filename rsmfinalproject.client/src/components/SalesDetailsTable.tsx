import { Skeleton, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { SalesDetailsRecord } from "../hooks/useSalesDetails";

interface Props {
    data: SalesDetailsRecord[]
    loading: boolean
}

const SalesDetailsTable = ({ data, loading }: Props) => {

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
                            data.map((record) => (
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

        </>
    );
}

export default SalesDetailsTable;