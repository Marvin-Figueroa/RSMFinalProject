import { Grid, GridItem } from "@chakra-ui/react";

function App() {

    return (
        <Grid templateAreas={`"nav" "main"`}>
            <GridItem area='nav' bg='gold'>Nav</GridItem>
            <GridItem area='main' bg='tomato'>Main</GridItem>
        </Grid>
    );
}

export default App;