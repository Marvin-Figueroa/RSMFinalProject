import { Box, HStack, Image, Link as ChakraLink, Spacer } from "@chakra-ui/react"
import logo from "../assets/finance.png"
import { Link as ReactRouterLink } from "react-router-dom";

const NavBar = () => {
    return (
        <HStack justifyContent='space-between' alignItems='center' padding='10px 20px' bg='yellowgreen'>
            <Image src={logo} boxSize='50px' />
            <Box display='flex' flexDir='row' justifyContent='space-between' gap='10px'>
                <ChakraLink as={ReactRouterLink} to="/">Home</ChakraLink>
                <Spacer />
                <ChakraLink as={ReactRouterLink} to="/sales-performance">Overview</ChakraLink>
                <Spacer />
                <ChakraLink as={ReactRouterLink} to="/sales-details">Details</ChakraLink>
            </Box>
        </HStack>
    );
}

export default NavBar;