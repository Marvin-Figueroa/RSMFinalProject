import { Grid, GridItem } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import SalesPerformanceTable from "./components/SalesPerformanceTable";

function App() {

    return (
        <Grid templateAreas={`"nav" "main"`}>
            <GridItem area='nav'><NavBar/></GridItem>
            <GridItem area='main' bg='tomato'>{<SalesPerformanceTable/>}</GridItem>
        </Grid>
    );
}

export default App;