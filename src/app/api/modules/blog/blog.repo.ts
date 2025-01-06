import Blog from '@/database/blog.model';
import { connectToDatabase } from '@/utils/mongoose';

export const createPost = async (post: {
    title: string;
    description: string;
    createdBy: string;
    updatedBy: string;
}) => {
    connectToDatabase();

    const newPost = new Blog(post);
    return await newPost.save();
};

export const updatePost = async (
    id: string,
    post: {
        title: string;
        description: string;
        updatedBy: string;
    },
) => {
    connectToDatabase();
    return await Blog.findByIdAndUpdate(id, post, { new: true });
};

export const deletePost = async (id: string) => {
    connectToDatabase();
    return await Blog.findByIdAndDelete(id);
};

export const getPosts = async () => {
    connectToDatabase();
    return await Blog.find()
        .populate('createdBy', 'name')
        .populate('updatedBy', 'name');
};

export const getDetailPost = async (id: string) => {
    connectToDatabase();
    return await Blog.findById(id);
};
