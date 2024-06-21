// ArticlePage.js
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
const ArticlePage = () => {
  const { id } = useParams();
  const article = useSelector((state) => state.articles.articles.find(article => article.id === id));

  if (!article) {
    return <div>Article not found</div>;
  }
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      {article.urlToImage && (
        <img src={article.urlToImage} alt={article.title} className="w-full h-auto mb-4" />
      )}
      <p className="text-gray-700">{article.content}</p>
    </div>
  );
};
export default ArticlePage;



//best
/*import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const ArticlePage = () => {
  const { id } = useParams();
  const article = useSelector((state) => state.articles.articles.find(article => article.id === id));

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      {article.urlToImage && (
        <img src={article.urlToImage} alt={article.title} className="w-full h-auto mb-4" />
      )}
      <p className="text-gray-700">{article.content}</p>
    </div>
  );
};

export default ArticlePage;*/



