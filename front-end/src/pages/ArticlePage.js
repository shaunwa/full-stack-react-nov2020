import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { articles } from './article-content';

/*
const response = await fetch('localhost:8000/api/articles/learn-node');
const data = await response.json();
*/

export const ArticlePage = () => {
    const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [] })
    const { id } = useParams();
    const article = articles.find(article => article.name === id);

    useEffect(() => {
        const loadArticle = async () => {
            const response = await fetch(`/api/articles/${id}`);
            const data = await response.json(); 
            setArticleInfo(data);
        }

        loadArticle();
    }, []);

    const upvoteArticle = async () => {
        const response = await fetch(`/api/articles/${id}/upvotes`, { method: 'post' });
        const updated = await response.json();
        setArticleInfo(updated);
    }

    return (
        <>
        <h1>{article.title}</h1>
        <div>
            <button onClick={upvoteArticle}>Upvote</button>
            <p>This article has {articleInfo.upvotes} upvotes</p>
        </div>
        {article.content.map(paragraph => (
            <p>{paragraph}</p>
        ))}
        <h3>Comments:</h3>
        {articleInfo.comments.map(comment => (
            <div className="comment" key={comment.text}>
                <h4>{comment.postedBy}</h4>
                <p>{comment.text}</p>
            </div>
        ))}
        </>
    );
}