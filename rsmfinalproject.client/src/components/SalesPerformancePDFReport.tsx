import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { SalesPerformanceRecord } from '../hooks/useSalesPerformance';

interface Props {
    data: SalesPerformanceRecord[]
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
        fontSize: '10px',
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
                    Sales Performance - Product Category & Region
                </Text>
                <View style={{
                    borderStyle: 'solid',
                    borderWidth: '1px',
                    borderColor: '#bfbfbf'
                }}>
                    <View style={{ flexDirection: 'row', backgroundColor: 'tomato', alignItems: 'center' }}>
                        <Text style={styles.tableHeadingCell}>Product</Text>
                        <Text style={styles.tableHeadingCell}>Category</Text>
                        <Text style={styles.tableHeadingCell}>Region</Text>
                        <Text style={styles.tableHeadingCell}>Total Sales</Text>
                        <Text style={styles.tableHeadingCell}>% SalesInRegion</Text>
                        <Text style={styles.tableHeadingCell}>% CategorySalesInRegion</Text>
                    </View>
                    {data.map((record) => (
                        <View key={record.id} style={styles.tableRow} wrap={false}>
                            <Text style={styles.tableCell}>{record.productName}</Text>
                            <Text style={styles.tableCell}>{record.productCategory}</Text>
                            <Text style={styles.tableCell}>{record.region}</Text>
                            <Text style={styles.tableCell}>
                                {record.totalSales.toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                })}
                            </Text>
                            <Text style={styles.tableCell}>{record.percentageOfTotalSalesPerRegion} %</Text>
                            <Text style={styles.tableCell}>{record.percentageOfTotalCategorySalesInRegion} %</Text>
                        </View>
                    ))}
                </View>
            </View>
        </Page>
    </Document>
);

export default SalesPerformancePDFReport;
