import { Grid, GridItem } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
// import SalesPerformanceTable from "./components/SalesPerformanceTable";
import SalesDetailsTable from "./components/SalesDetailsTable";
import ProductCategorySelector from "./components/ProductCategorySelector";

function App() {

    return (
        <Grid templateAreas={`"nav" "main"`}>
            <GridItem area='nav'><NavBar /></GridItem>
            <GridItem area='main' padding='10px'>
                <ProductCategorySelector />
                <SalesDetailsTable />
            </GridItem>
        </Grid>
    );
}

export default App;