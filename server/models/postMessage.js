import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    creator_id: String,
    creator_name: String,
    tags: [String],
    selectedFile: String,
    likes: {
        type: [String],
        default: []
    },
    created_at: {
        type: Date,
        default: new Date(),
    },
})

var PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage; 