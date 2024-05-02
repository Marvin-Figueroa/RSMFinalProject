import { HStack, Image } from "@chakra-ui/react"
import logo from "../assets/finance.png"

const NavBar = () => {
    return (
        <HStack padding='10px'>
            <Image src={logo} boxSize='50px' />
       </HStack>
  );
}

export default NavBar;