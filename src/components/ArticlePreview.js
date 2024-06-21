//new ArticlePreview.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../redux/articlesSlice';
import { Link } from 'react-router-dom';
// Component for displaying a preview of an article
const ArticlePreview = ({ article }) => {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.articles.favorites);
  const isFavorite = favorites.some(fav => fav.id === article.id);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      dispatch(removeFavorite(article));
    } else {
      dispatch(addFavorite(article));
    }
  };

  return (
    <div className="border p-4">
      <Link to={`/article/${article.id}`}>
        <img src={article.urlToImage} alt={article.title} className="w-full h-48 object-cover" />
        <h2 className="font-bold text-lg mt-2">{article.title}</h2>
      </Link>
      <p className="text-sm mt-2">{article.description}</p>
      <button onClick={handleFavoriteClick} className="mt-2 p-2 border">
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
    </div>
  );
};

export default ArticlePreview;






