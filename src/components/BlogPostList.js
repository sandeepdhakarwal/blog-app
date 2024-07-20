
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card, Spinner, Pagination } from 'react-bootstrap';

const API_KEY = process.env.REACT_APP_API_KEY; 
const BASE_URL = process.env.REACT_APP_BASE_URL;
const POSTS_PER_PAGE = 10;
console.log(">>>>>>>>>>>>>",API_KEY,">>>>>>>>>>>>>.",BASE_URL)
const BlogPostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/everything?q=blog&apiKey=${API_KEY}`);
        const allPosts = response.data.articles;
        const sortedPosts = allPosts.filter((article)=> article.title !== "[Removed]")
        const total = Math.ceil(sortedPosts.length / POSTS_PER_PAGE);
        setTotalPages(total);
        setPosts(sortedPosts.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE));
        setLoading(false);
      } catch (error) {
        setError('Error fetching posts');
        setLoading(false);
      }
    };

    fetchPosts();
  }, [currentPage]);

  if (loading) return (
    <Container className="text-center mt-5">
      <Spinner animation="border" />
      <p>Loading posts...</p>
    </Container>
  );

  if (error) return (
    <Container className="text-center mt-5">
      <p>{error}</p>
    </Container>
  );

  return (
    <Container className="mt-5">
      <Row>
        {posts.map(post => (
          <Col md={12} className="mb-4" key={post.title}>
            <Card className="w-100">
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>{post.description}</Card.Text>
                <Card.Subtitle className="mb-2 text-muted">
                  {new Date(post.publishedAt).toLocaleDateString()}
                </Card.Subtitle>
                <Link to={`/post/${encodeURIComponent(post.title)}`} className="btn btn-primary">
                  Read More
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Pagination className='d-flex justify-content-center mt-4 mb-4'>
        <Pagination.Prev
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        />
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <Pagination.Item
            key={page}
            active={page === currentPage}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        />
      </Pagination>
    </Container>
  );
};

export default BlogPostList;
