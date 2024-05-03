import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { SalesDetailsRecord } from '../hooks/useSalesDetails';

interface Props {
    data: SalesDetailsRecord[]
}

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#fff',
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
    },
    tableRow: {
        flexDirection: 'row',
        borderBottom: '1px solid #bfbfbf',
        padding: '5px'
    },
    tableCell: {
        flex: 1,
        border: 'none',
        fontSize: '8px',
        color: '#000',
        textAlign: 'center'
    },
    tableHeadingCell: {
        flex: 1,
        padding: 2,
        border: 'none',
        fontSize: '8px',
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#fff'
    },
});

const SalesPerformancePDFReport = ({ data }: Props) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <Text
                    style={{ marginBottom: 12, fontSize: '18px', fontWeight: 'bold', textAlign: 'center', color: 'tomato' }}>
                    Sales Details - Region, Customer, Salesperson & Product
                </Text>
                <View style={{
                    borderStyle: 'solid',
                    borderWidth: '1px',
                    borderColor: '#bfbfbf'
                }}>
                    <View style={{ flexDirection: 'row', backgroundColor: 'tomato', alignItems: 'center' }}>
                        <Text style={styles.tableHeadingCell}>Date</Text>
                        <Text style={styles.tableHeadingCell}>Region</Text>
                        <Text style={styles.tableHeadingCell}>Customer</Text>
                        <Text style={styles.tableHeadingCell}>Salesperson</Text>
                        <Text style={styles.tableHeadingCell}>Product</Text>
                        <Text style={styles.tableHeadingCell}>Category</Text>
                        <Text style={styles.tableHeadingCell}>Subcategory</Text>
                        <Text style={styles.tableHeadingCell}>Qty</Text>
                        <Text style={styles.tableHeadingCell}>Price</Text>
                        <Text style={styles.tableHeadingCell}>Total</Text>
                    </View>
                    {data.map((record) => (
                        <View key={record.salesOrderDetailID} style={styles.tableRow} wrap={false}>
                            <Text style={styles.tableCell}>{new Date(record.date).toLocaleDateString()}</Text>
                            <Text style={styles.tableCell}>{record.territory}</Text>
                            <Text style={styles.tableCell}>{record.customerPerson}</Text>
                            <Text style={styles.tableCell}>{record.salesperson}</Text>
                            <Text style={styles.tableCell}>
                                {record.product}
                            </Text>
                            <Text style={styles.tableCell}>{record.category}</Text>
                            <Text style={styles.tableCell}>{record.subcategory}</Text>
                            <Text style={styles.tableCell}>{record.quantity}</Text>
                            <Text style={styles.tableCell}>{record.unitPrice.toLocaleString('en-US', {
                                style: 'currency',
                                currency: 'USD',
                            })}</Text>
                            <Text style={styles.tableCell}>{record.totalPrice.toLocaleString('en-US', {
                                style: 'currency',
                                currency: 'USD',
                            })}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </Page>
    </Document>
);

export default SalesPerformancePDFReport;
