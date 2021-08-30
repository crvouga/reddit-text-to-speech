import React, { FC, ReactNode, useEffect, useState } from 'react';
import { Message } from '@reddit-text-to-speech/api-interfaces';
import {
  Container,
  createTheme,
  CssBaseline,
  TextField,
  ThemeProvider,
  Typography,
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const queryClient = new QueryClient();

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={darkTheme}>{children}</ThemeProvider>
    </QueryClientProvider>
  );
};
