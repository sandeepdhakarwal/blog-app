import React from 'react';
import { Route, Routes } from 'react-router-dom';
import BlogPostList from './components/BlogPostList';
import BlogPostDetails from './components/BlogPostDetails';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<BlogPostList />} />
      <Route path="/post/:title" element={<BlogPostDetails />} />
    </Routes>
  );
};

export default App;
