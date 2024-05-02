import { ReactNode } from 'react';
import { Grid, GridItem } from '@chakra-ui/react';
import NavBar from './NavBar';

interface Props {
    children: ReactNode
}

const Layout = ({ children }: Props) => {
    return (

        <Grid templateAreas={`"nav" "main"`}>
            <GridItem area='nav'><NavBar /></GridItem>
            <GridItem area='main' paddingX='20px'>
                {children}
            </GridItem>
        </Grid>

    );
}

export default Layout;