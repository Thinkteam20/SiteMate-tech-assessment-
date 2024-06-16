import React, { useState, useEffect } from 'react';
import './App.css';

function App({ postService }) {
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [searchId, setSearchId] = useState('');

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const data = await postService.getPosts();
            setPosts(data);
        } catch (error) {
            console.error('Failed to fetch posts:', error.message);
        }
    };

    const handleAddPost = async () => {
        try {
            const newPost = await postService.createPost(title, description);
            setPosts([newPost, ...posts]);
            setTitle('');
            setDescription('');
        } catch (error) {
            console.error('Failed to add post:', error.message);
        }
    };

    const handleDeletePost = async (id) => {
        try {
            await postService.deletePost(id);
            setPosts((prevPosts) => prevPosts.filter(post => post.id !== id));
        } catch (error) {
            console.error('Failed to delete post:', error.message);
        }
    };

    const handleUpdatePost = async (id, newTitle, newDescription) => {
        try {
            const updatedPost = await postService.updatePost(id, newTitle, newDescription);
            setPosts(posts.map(post => post.id === id ? updatedPost : post));
        } catch (error) {
            console.error('Failed to update post:', error.message);
        }
    };

    const handleSearchById = async () => {
        try {
            const data = await postService.getPostById(searchId);
            setPosts([data]);
        } catch (error) {
            console.error('Failed to fetch post by ID:', error.message);
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Posts</h1>
                <div>
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <button onClick={handleAddPost}>Add Post</button>
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Search by ID"
                        value={searchId}
                        onChange={(e) => setSearchId(e.target.value)}
                    />
                    <button onClick={handleSearchById}>Search</button>
                </div>
                <ul className='posts'>
                    {posts.map(post => (
                        <li 
                          className='post'
                          key={post.id}
                        >
                            <h2>{post.title}</h2>
                            <p>{post.description}</p>
                            <button onClick={() => handleDeletePost(post.id)}>Delete</button>
                            <button onClick={() => {
                                const newTitle = prompt('New title:', post.title);
                                const newDescription = prompt('New description:', post.description);
                                if (newTitle !== null && newDescription !== null) {
                                    handleUpdatePost(post.id, newTitle, newDescription);
                                }
                            }}>Update</button>
                        </li>
                    ))}
                </ul>
            </header>
        </div>
    );
}

export default App;
