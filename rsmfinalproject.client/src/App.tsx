import { Grid, GridItem } from "@chakra-ui/react";
import NavBar from "./components/NavBar";

function App() {

    return (
        <Grid templateAreas={`"nav" "main"`}>
            <GridItem area='nav'><NavBar/></GridItem>
            <GridItem area='main' bg='tomato'>Main</GridItem>
        </Grid>
    );
}

export default App;