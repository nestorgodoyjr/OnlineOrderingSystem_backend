import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        min: 0
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    phoneNumber: {
        type: String,
        required: true,
        match: [/^\+?[0-9]{7,15}$/, 'Invalid phone number']
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        select: false
    },
    
    role: {
        type: String,
        enum: ['customer', 'vendor', 'rider', 'admin'],
        default: 'customer'
    },
    
    isVerified: {
        type: Boolean,
        default: false
    },

    phoneVerified: {
        type: Boolean,
        default: false
    },

    status: {
        type: String,
        enum: ['active', 'suspended', 'banned'],
        default: 'active'
        },

    strikes: {
        type: Number,
        default: 0
        }
}, {
    timestamps: true
})

userSchema.pre('save', async function (next) {
        if (!this.isModified('password')) return next()
        this.password = await bcrypt.hash(this.password, 10)
})

export default mongoose.model('User', userSchema)