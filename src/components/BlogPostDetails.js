

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Card, Spinner, Button } from 'react-bootstrap';

const API_KEY = process.env.REACT_APP_API_KEY; 
const BASE_URL = process.env.REACT_APP_BASE_URL;

const BlogPostDetails = () => {
  const { title } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/everything?q=${encodeURIComponent(title)}&apiKey=${API_KEY}`);
        setPost(response.data.articles[0]);
        setLoading(false);
      } catch (error) {
        setError('Error fetching post');
        setLoading(false);
      }
    };

    fetchPost();
  }, [title]);

  if (loading) return (
    <Container className="text-center mt-5">
      <Spinner animation="border" />
      <p>Loading post...</p>
    </Container>
  );

  if (error) return (
    <Container className="text-center mt-5">
      <p>{error}</p>
    </Container>
  );

  return (
    <Container className="mt-5">
      <Link to="/" className="btn btn-secondary mb-3">Back to List</Link>
      {post && (
        <Card>
          {post.urlToImage && (
            <Card.Img variant="top" src={post.urlToImage} alt={post.title} />
          )}
          <Card.Body>
            <Card.Title>{post.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {new Date(post.publishedAt).toLocaleDateString()}
            </Card.Subtitle>
            <Card.Text>{post.content}</Card.Text>
            <Button variant="primary" href={post.url} target="_blank">Read Full Article</Button>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default BlogPostDetails;
