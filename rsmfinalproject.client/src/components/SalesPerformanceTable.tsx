import { Text } from "@chakra-ui/react";
import useSalesPerformanceData from "../hooks/useSalesPerformanceData";

const SalesPerformanceTable = () => {
    const {salesPerformanceRecords, error, loading} = useSalesPerformanceData();

    return (

        <> {loading && <Text> Loading...</Text >}
            {error && <Text color='crimson'>{error}</Text> }
            <ul>{
                salesPerformanceRecords.map(record => <li key={record.id}>{record.productName}</li>)
            }</ul>
        </>
  );
}

export default SalesPerformanceTable;