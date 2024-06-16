export default class PostsService {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    async getPosts() {
        const response = await fetch(`${this.baseURL}/posts`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();
        if (response.status !== 200) {
            throw new Error(data.message);
        }
        return data;
    }

    async getPostById(id) {
        const response = await fetch(`${this.baseURL}/posts/${id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();
        if (response.status !== 200) {
            throw new Error(data.message);
        }
        return data;
    }

    async createPost(title, description) {
        const response = await fetch(`${this.baseURL}/posts`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, description }),
        });
        const data = await response.json();
        if (response.status !== 201) {
            throw new Error(data.message);
        }
        return data;
    }

    async deletePost(id) {
        const response = await fetch(`${this.baseURL}/posts/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.status !== 200) {
            const data = await response.json();
            throw new Error(data.message);
        }
        return { id }; // Return the deleted post ID or any relevant information if needed
    }

    async updatePost(id, description) {
        const response = await fetch(`${this.baseURL}/posts/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ description }),
        });
        const data = await response.json();
        if (response.status !== 200) {
            throw new Error(data.message);
        }
        return data;
    }
}
