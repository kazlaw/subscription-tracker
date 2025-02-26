import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({

    name: {
        type: String, required: [true, 'User Name is required'],
        trim: true,
        minLength: 2,
        maxLength: 30,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 5,
        maxLength: 30,
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: 6,
    }
}, {timestamps: true});

const User = mongoose.model('User', UserSchema);

export default User;