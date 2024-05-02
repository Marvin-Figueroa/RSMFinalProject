import { Grid, GridItem } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import SalesPerformanceTable from "./components/SalesPerformanceTable";
import ProductCategorySelector from "./components/ProductCategorySelector";
import { ProductCategory } from "./hooks/useProductCategories";
import { useState } from "react";

function App() {

    const [selectedProductCategory, setSelectedProductCategory] = useState<ProductCategory | null>(null);

    return (
        <Grid templateAreas={`"nav" "main"`}>
            <GridItem area='nav'><NavBar /></GridItem>
            <GridItem area='main' padding='10px'>
                <ProductCategorySelector onSelectProductCategory={(category) => setSelectedProductCategory(category)} />
                <SalesPerformanceTable selectedProductCategory={selectedProductCategory} />
            </GridItem>
        </Grid>
    );
}

export default App;