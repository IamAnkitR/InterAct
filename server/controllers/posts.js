import Post from "../models/Post.js";
import User from "../models/User.js";

/* CREATE */

export const createPost = async (req, res) => {
    try {
        const { userId, description, picturePath } = req.body;
        const user = await User.findById(userId);

        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            likes: {},
            comments: []
        })

        await newPost.save();

        const post = await Post.find();

        res.status(201).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
}

/* READ */

export const getFeedPosts = async (req, res) => {
    try {
        const post = await Post.find();
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
}

export const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        const post = await Post.find({ userId: userId });
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
}

/* UPDATE */

export const likePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId);

        if (isLiked) {
            post.likes.delete(userId);
        } else {
            post.likes.set(userId, true);
        }

        const updatedPost = await post.findByIdAndUpdate(id, { likes: post.likes }, { new: true });

        res.status(200).json(updatedPost);

    } catch (err) {
        res.status(500).json(err);
    }
}