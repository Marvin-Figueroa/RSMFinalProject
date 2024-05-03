import { Box, HStack, Image, Spacer } from "@chakra-ui/react"
import logo from "../assets/growth.png"
import { NavLink } from "react-router-dom";

const NavBar = () => {
    return (
        <HStack justifyContent='space-between' alignItems='center' padding='10px 20px' bg='tomato'>
            <Image src={logo} boxSize='50px' />
            <Box display='flex' flexDir='row' justifyContent='space-between' gap='10px'>
                <NavLink color="red" className={({ isActive }) =>
                    isActive ? "active" : "navlink"
                } to="/">Home</NavLink>
                <Spacer />
                <NavLink className={({ isActive }) =>
                    isActive ? "active" : "navlink"
                } to="/sales-performance">Overview</NavLink>
                <Spacer />
                <NavLink className={({ isActive }) =>
                    isActive ? "active" : "navlink"
                } to="/sales-details">Details</NavLink>
            </Box>
        </HStack>
    );
}

export default NavBar;