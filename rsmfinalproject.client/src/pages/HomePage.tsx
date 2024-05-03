import { Box, Heading, Image, Text } from "@chakra-ui/react";

const HomePage = () => {
  return (
    <Box textAlign="center" p={8}>
      <Heading color='tomato' as="h1" size="xl" mb={4}>Welcome!</Heading>
      <Text fontSize="xl" mb={4}>Oops! Looks like this page is still under construction.</Text>
      <Image src="https://media.giphy.com/media/l3q2W1m7Q6xU2bVLy/giphy.gif" alt="Under Construction" maxW="300px" mx="auto" mb={4} />
      <Text fontSize="xl" mb={4}>But don't worry, we're working hard to bring you something awesome!</Text>
    </Box>
  );
}

export default HomePage;