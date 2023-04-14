import { useCallback, useEffect, useState } from 'react';
import api from '../../api';

import './product.css';

interface Post {
  _id: number;
  title: string;
  description: string;
  image: string;
  // author: string;
  vote: number;
}

interface ResponseData {
  message: string;
  data: Post[];
}

export const PostList = () => {

  const [posts, setPosts] = useState<Post[]>([]);
  console.log(posts);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    const response = await api.getPosts();
    console.log(response);

    const { data, message } = await response.data as ResponseData;
    setPosts(data);
    if (message) {
      setError(message);
    }
    setLoading(false);
  }, []);


  useEffect(() => {
    if (!navigator.onLine) {
      const data = JSON.parse(localStorage.getItem("posts") || "[]");
      setPosts(data);
      setLoading(false);
    } else {
      setLoading(true);
      fetchPosts();
    }
  }, [fetchPosts]);

  return (
    <>
      {posts.map(({ _id, title, description, image, vote }) => (
        <div key={_id} className="container">
          <div className="card">
            <img src={image} alt={title} />
            <div className="card-body">
              <div className="row">
                <div className="card-title">
                  <h2>{title}</h2>
                </div>
              </div>
              <p>{description.substring(0, 100)}...</p>
              <hr />
              <p>👍{vote}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}