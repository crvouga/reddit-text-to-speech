import { useQuery } from 'react-query';
import { createRedditAPI } from './reddit-api';

const redditAPI = createRedditAPI();

type IRedditListing = {
  id: string;
};

const getRedditPost = async ({ postId }: { postId: string }) => {
  const response = redditAPI.get<IRedditListing>(`/post/${postId}`);

  return response;
};

export const useRedditPostQuery = ({ postId }: { postId: string }) => {
  return useQuery([postId], () => {
    return getRedditPost({ postId });
  });
};
