import { REINVEST_SITE_URL } from '@env';
import { BlogPost } from '@screens/Education/components/BlogCard/types';
import { useQuery } from '@tanstack/react-query';

const fetchBlogs = async () => {
  const response = await fetch(`${REINVEST_SITE_URL}api/posts`, {
    method: 'GET',
  });
  const data = await response.json();

  return typeof data === 'string' ? JSON.parse(data).data : data.data;
};

export const usePostsQuery = () =>
  useQuery<[BlogPost]>({
    queryKey: ['getPosts'],
    queryFn: fetchBlogs,
  });
