//new ArticlePage.js
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
// Component for displaying the detailed view of an article
const ArticlePage = () => {
  const { id } = useParams();
  const article = useSelector(state =>
    state.articles.articles.find(article => article.id === id)
  );

  if (!article) {
    return <p>Article not found.</p>;
  }

  return (
    <div className="p-4">
      <img src={article.urlToImage} alt={article.title} className="w-full h-64 object-cover" />
      <h2 className="text-2xl font-bold mt-4">{article.title}</h2>
      <p className="text-lg mt-2">{article.description}</p>
      <p className="mt-4">{article.content}</p>
      <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
        Read more
      </a>
    </div>
  );
};

export default ArticlePage;




