//new HomePage.js
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchArticles } from '../redux/articlesSlice';
import ArticlePreview from './ArticlePreview';
import Pagination from './Pagination';
// Component for displaying the home page with a list of articles
const HomePage = () => {
  const dispatch = useDispatch();
  const { articles, status, error } = useSelector((state) => state.articles);
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage] = useState(10);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
// Fetch articles whenever the selected category changes
  useEffect(() => {
    dispatch(fetchArticles({ category: selectedCategory }));
  }, [dispatch, selectedCategory]);
// Filter articles based on the search term
  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
 // Calculate indices for paginated articles
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setCurrentPage(1);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between mb-4">
        <select value={selectedCategory} onChange={handleCategoryChange} className="border p-2">
          <option value="All">All</option>
          <option value="Business">Business</option>
          <option value="Technology">Technology</option>
          <option value="Entertainment">Entertainment</option>
        </select>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search articles..."
          className="border p-2"
        />
      </div>
      {status === 'loading' && <p>Loading articles...</p>}
      {status === 'failed' && <p className="text-red-500">Error: {error}</p>}
      {status === 'succeeded' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentArticles.map((article) => (
              <ArticlePreview key={article.id} article={article} />
            ))}
          </div>
          <Pagination
            articlesPerPage={articlesPerPage}
            totalArticles={filteredArticles.length}
            paginate={paginate}
          />
        </>
      )}
    </div>
  );
};

export default HomePage;




