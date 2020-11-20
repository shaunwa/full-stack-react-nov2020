import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';
import path from 'path';

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'build')));

const startServer = async () => {
    const client = await MongoClient.connect(
        'mongodb://localhost:27017',
        { useNewUrlParser: true, useUnifiedTopology: true },
    );
    const db = client.db('react-blog-db-nov2020');

    app.get('/api/articles/:id', async (req, res) => {
        const { id } = req.params;
        const articleInfo = await db.collection('articles').findOne({ name: id });
        res.json(articleInfo);
    });

    app.post('/api/articles/:id/upvotes', async (req, res) => {
        const { id } = req.params;
        await db.collection('articles').updateOne({ name: id }, {
            $inc: { upvotes: 1 },
        });
        const articleInfo = await db.collection('articles').findOne({ name: id }); 
        res.json(articleInfo);
    });

    app.post('/api/articles/:id/comments', async (req, res) => {
        const { id } = req.params;
        const { newComment } = req.body;
        await db.collection('articles').updateOne({ name: id }, {
            $push: { comments: newComment },
        });
        const articleInfo = await db.collection('articles').findOne({ name: id }); 
        res.json(articleInfo);
    });

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
    });

    app.listen(8000, () => console.log('Server is listening on port 8000'));
}

startServer();