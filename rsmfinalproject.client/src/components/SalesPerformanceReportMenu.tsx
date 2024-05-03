import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react"
import { PDFDownloadLink } from "@react-pdf/renderer"
import { BsChevronDown } from "react-icons/bs"
import SalesPerformancePDFReport from "./SalesPerformancePDFReport"
import { CSVLink } from "react-csv"
import { GrDocumentCsv, GrDocumentPdf } from "react-icons/gr"
import { SalesPerformanceRecord } from "../hooks/useSalesPerformance"

interface Props {
    data: SalesPerformanceRecord[]
}

const SalesPerformanceReportMenu = ({ data }: Props) => {
    return (
        <Menu>
            <MenuButton as={Button} rightIcon={<BsChevronDown />}>
                Generate Reports
            </MenuButton>
            <MenuList>
                <PDFDownloadLink document={<SalesPerformancePDFReport data={data} />} fileName="salesPerformanceReport.pdf">
                    <MenuItem icon={<GrDocumentPdf />}>PDF</MenuItem>
                </PDFDownloadLink>
                <CSVLink data={data} filename={"salesPerformanceReport.csv"}>
                    <MenuItem icon={<GrDocumentCsv />}>CSV</MenuItem>
                </CSVLink>
            </MenuList>
        </Menu>
    )
}

export default SalesPerformanceReportMenu