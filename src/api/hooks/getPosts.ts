import { REINVEST_SITE_URL } from '@env';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { BlogPost } from '../../screens/Education/components/BlogCard/types';

const fetchBlogs = async () => {
  const { data } = await axios.get(`${REINVEST_SITE_URL}api/posts`);

  return typeof data === 'string' ? JSON.parse(data).data : data.data;
};

export const usePostsQuery = () =>
  useQuery<[BlogPost]>({
    queryKey: ['getPosts'],
    queryFn: fetchBlogs,
  });
