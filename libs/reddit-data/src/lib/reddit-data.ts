import { useQuery } from 'react-query';
import { createRedditAPI } from './reddit-api';

const client = createRedditAPI();

const getRedditPost = async ({ url }: { url: string }) => {
  const response = client({
    method: 'GET',
  });
  return {
    url,
  };
};

export const useRedditPostQuery = ({ url }: { url: string }) => {
  return useQuery([url], () => {
    return getRedditPost({ url });
  });
};
