import { Schema, models, model, Document } from 'mongoose';

export interface IBlog extends Document {
    title: string;
    description: string;
    createdBy: Schema.Types.ObjectId;
    updatedBy: Schema.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const BlogSchema = new Schema({
    title: { type: String },
    description: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'Admin' },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'Admin' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const Blog = models.Blog || model('Blog', BlogSchema);

export default Blog;
