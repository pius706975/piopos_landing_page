import { Schema, models, model, Document } from 'mongoose';

export interface IAdmin extends Document {
    name: string;
    username: string;
    email: string;
    password?: string;
    refreshToken: string;
    role: string;
    picture: string;
}

const AdminSchema = new Schema({
    name: { type: String },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    refreshToken: {type: String},
    role: { type: String },
    picture: { type: String },
});

const Admin = models.Admin || model('Admin', AdminSchema);

export default Admin;
