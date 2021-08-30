import {
  Container,
  CssBaseline,
  TextField,
  Typography,
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import { Message } from '@reddit-text-to-speech/api-interfaces';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

const getRedditPost = async ({ url }: { url: string }) => {
  return {};
};

const useRedditPostQuery = ({ url }: { url: string }) => {
  return useQuery([url], () => {
    return getRedditPost({ url });
  });
};

export const App = () => {
  const [m, setMessage] = useState<Message>({ message: '' });

  const [redditPostUrl, setRedditPostUrl] = useState('');

  const redditPostQuery = useRedditPostQuery({
    url: redditPostUrl,
  });

  useEffect(() => {
    fetch('/api')
      .then((r) => r.json())
      .then(setMessage);
  }, []);

  useEffect(() => {
    console.log(redditPostUrl);
  }, [redditPostUrl]);

  return (
    <>
      <CssBaseline />

      <Container
        maxWidth="xs"
        sx={{
          paddingTop: 2,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Reddit Text To Speech
        </Typography>

        <TextField
          variant="outlined"
          fullWidth
          label="Reddit Post URL"
          sx={{
            marginBottom: 2,
          }}
          onChange={(event) => {
            setRedditPostUrl(event.target.value);
          }}
        />

        <LoadingButton
          fullWidth
          size="large"
          color="primary"
          variant="contained"
        >
          Create
        </LoadingButton>
      </Container>
    </>
  );
};

export default App;
