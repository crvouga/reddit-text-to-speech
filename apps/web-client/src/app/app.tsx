import {
  Container,
  CssBaseline,
  TextField,
  Typography,
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import { useRedditPostQuery } from '@reddit-text-to-speech/reddit-data';
import React, { useEffect, useState } from 'react';

export const App = () => {
  const [redditPostUrl, setRedditPostUrl] = useState('');

  const redditPostQuery = useRedditPostQuery({
    postId: redditPostUrl,
  });

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

        {JSON.stringify(redditPostQuery, null, 4)}

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
