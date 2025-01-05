import { createPost, deletePost, getDetailPost, getPosts, updatePost } from './blog.repo';

export const createPostService = async (
    title: string,
    description: string,
    createdBy: string,
    updatedBy: string,
) => {
    const postData = {
        title,
        description,
        createdBy,
        updatedBy,
    };

    return await createPost(postData);
};

export const updatePostService = async (
    id: string,
    title: string,
    description: string,
    updatedBy: string,
) => {
    const updatedPost = await updatePost(id, { title, description, updatedBy })

    return updatedPost
}

export const deletePostService = async (id: string) => {
    return await deletePost(id);
};

export const getPostsService = async () => {
    return await getPosts();
};

export const getDetailPostService = async (id: string) => {
    return await getDetailPost(id);
};