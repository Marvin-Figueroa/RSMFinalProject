import { ReactNode } from 'react';
import { Grid, GridItem } from '@chakra-ui/react';
import NavBar from './NavBar';

interface Props {
    children: ReactNode
}

const Layout = ({ children }: Props) => {
    return (

        <Grid templateAreas={`"nav" "main"`} minHeight='100vh'>
            <GridItem area='nav'><NavBar /></GridItem>
            <GridItem minHeight='80vh' area='main' paddingX='20px'>
                {children}
            </GridItem>
        </Grid>

    );
}

export default Layout;