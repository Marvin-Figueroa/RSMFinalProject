import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react"
import { PDFDownloadLink } from "@react-pdf/renderer"
import { BsChevronDown } from "react-icons/bs"
import { CSVLink } from "react-csv"
import { GrDocumentCsv, GrDocumentPdf } from "react-icons/gr"
import { SalesDetailsRecord } from "../hooks/useSalesDetails"
import SalesDetailsPDFReport from "./SalesDetailsPDFReport"

interface Props {
    data: SalesDetailsRecord[];
}

const SalesDetailsReportMenu = ({ data }: Props) => {
    return (
        <Menu>
            <MenuButton as={Button} rightIcon={<BsChevronDown />}>
                Reports
            </MenuButton>
            <MenuList>
                <PDFDownloadLink document={<SalesDetailsPDFReport data={data} />} fileName="salesDetailsReport.pdf">
                    <MenuItem icon={<GrDocumentPdf />}>PDF</MenuItem>
                </PDFDownloadLink>
                <CSVLink data={data} filename={"salesDetailsReport.csv"}>
                    <MenuItem icon={<GrDocumentCsv />}>CSV</MenuItem>
                </CSVLink>
            </MenuList>
        </Menu>
    )
}

export default SalesDetailsReportMenu