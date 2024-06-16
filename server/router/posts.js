import express from 'express';
import 'express-async-errors';

let posts = [
    {
        id: '1',
        title: 'sitemate post 1',
        description: 'site mate description1'
    },
    {
        id: '2',
        title: 'sitemate post 2',
        description: 'site mate description2'
    },
    {
        id: '3',
        title: 'sitemate post 3',
        description: 'site mate description3'
    },
];

const router = express.Router();

router.get('/', (req, res, next) => {
    console.log(req.params)
    console.log(req.query)
    res.status(200).json(posts);
})

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    const post = posts.find((t) => t.id === id);
    if (post) {
        res.status(200).json(post);
    } else {
        res.status(404).json({ message: `post ${id} not found` });
    }
})

router.post('/', (req, res, next) => {
    const { title, description } = req.body;

    const nextId = (parseInt(posts[posts.length - 1].id) + 1).toString();

    const post = {
        id: nextId,
        title: title,
        description: description
    };

    posts = [post, ...posts];

    res.status(201).json(post);
});

router.put('/:id', (req, res, next) => {
    const id = req.params.id;
    const newDescription = req.body.description;
    const post = posts.find((post) => post.id === id);
    if (post) {
        post.description = newDescription;
        res.status(200).json(post);
    } else {
        res.status(404).json({ message: `post id(${id}) not found` });
    }
});

router.delete('/:id', (req, res, next) => {
    const id = req.params.id;

    const index = posts.findIndex(post => post.id === id);
    if (index === -1) {
        return res.status(404).json({ message: `Post with id ${id} not found` });
    }

    const deletedPost = posts.splice(index, 1)[0];

    res.status(200).json({ deletedPost, posts });
});

export default router;