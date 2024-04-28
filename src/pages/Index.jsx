// Complete the Index page component for a simple Twitter clone
import { useState, useEffect } from "react";
import { Box, Button, Container, Flex, Input, Stack, Text, VStack, Heading, Textarea, useToast } from "@chakra-ui/react";
import { FaTwitter } from "react-icons/fa";

const Index = () => {
  const [tweets, setTweets] = useState([]);
  const [username, setUsername] = useState("");
  const [content, setContent] = useState("");
  const toast = useToast();

  // Simulating a database with local storage
  useEffect(() => {
    const storedTweets = JSON.parse(localStorage.getItem("tweets")) || [];
    setTweets(storedTweets);
  }, []);

  const handleTweet = () => {
    if (!username || !content) {
      toast({
        title: "Error",
        description: "Username and tweet content are required.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const newTweet = {
      id: Date.now(),
      username,
      content,
      timestamp: new Date().toISOString(),
    };

    const updatedTweets = [newTweet, ...tweets];
    localStorage.setItem("tweets", JSON.stringify(updatedTweets));
    setTweets(updatedTweets);
    setContent("");
  };

  return (
    <Container maxW="container.md" py={5}>
      <VStack spacing={4}>
        <Flex alignItems="center" justifyContent="space-between" w="full">
          <Heading as="h1" size="lg">
            Mini Twitter <FaTwitter />
          </Heading>
        </Flex>

        <Box w="full">
          <Input placeholder="Your username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <Textarea placeholder="What's happening?" value={content} onChange={(e) => setContent(e.target.value)} mt={2} />
          <Button colorScheme="twitter" mt={2} onClick={handleTweet}>
            Tweet
          </Button>
        </Box>

        <Stack spacing={3} w="full">
          {tweets.map((tweet) => (
            <Box key={tweet.id} p={4} shadow="md" borderWidth="1px">
              <Text fontWeight="bold">{tweet.username}</Text>
              <Text fontSize="sm">{new Date(tweet.timestamp).toLocaleString()}</Text>
              <Text mt={2}>{tweet.content}</Text>
            </Box>
          ))}
        </Stack>
      </VStack>
    </Container>
  );
};

export default Index;
