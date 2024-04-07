import React, { useEffect, useState } from "react";
import axios from "axios";
import "./news.css";
import defaultImage from './news_image.webp';


const News = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("API Key:", process.env.REACT_APP_NEWS_API_KEY); // Log the API Key to the console

    const fetchNews = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
        );
        setArticles(response.data.articles);
      } catch (error) {
        console.error(
          "There was an error fetching the news:",
          error.response || error
        );
        setError("Could not fetch news");
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="news-container">
      {articles.length > 0 ? (
        articles.map((article, index) => (
          <div className="article" key={article.url || index}>
            {/* Include an image if available */}
            {article.urlToImage && (
              <img
              src={article.urlToImage || defaultImage}
              alt={article.title}
              onError={(e) => {
                if (e.target.src !== defaultImage) {
                  e.target.src = defaultImage; // Fallback to default image if an error occurs
                }
              }}
            />
            )}
            <h2>{article.title}</h2>
            <p>{article.description}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              Read more
            </a>
          </div>
        ))
      ) : (
        <div>No news articles found.</div>
      )}
    </div>
  );
};

export default News;
