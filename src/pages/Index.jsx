import React from "react";
import { ChakraProvider, Box, VStack, Input, Button, Text, extendTheme } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from "react-router-dom";

// Custom theme to apply throughout the app
const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "gray.100",
        color: "gray.800",
      },
    },
  },
});

const PageOne = () => {
  const [inputValue, setInputValue] = React.useState("");
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = () => {
    localStorage.setItem("userInput", inputValue);
    navigate("/page-two");
  };

  return (
    <VStack spacing={4}>
      <Input placeholder="Enter something..." value={inputValue} onChange={handleInputChange} />
      <Button colorScheme="blue" onClick={handleSubmit}>
        Submit and Go to Page Two
      </Button>
    </VStack>
  );
};

const PageTwo = () => {
  const [storedValue, setStoredValue] = React.useState("");

  React.useEffect(() => {
    const data = localStorage.getItem("userInput");
    if (data) {
      setStoredValue(data);
    }
  }, []);

  return (
    <VStack spacing={4}>
      <Text fontSize="xl">Value from Page One:</Text>
      <Text fontSize="lg">{storedValue}</Text>
      <Link to="/">
        <Button colorScheme="teal">Go Back to Page One</Button>
      </Link>
    </VStack>
  );
};

const Index = () => {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Box p={5}>
          <Routes>
            <Route path="/" element={<PageOne />} />
            <Route path="/page-two" element={<PageTwo />} />
          </Routes>
        </Box>
      </Router>
    </ChakraProvider>
  );
};

export default Index;
