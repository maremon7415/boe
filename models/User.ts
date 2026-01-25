import mongoose, { mongo } from "mongoose";

export type userRole = "ADMINISTRATOR" | "ADMIN" | "MEMBER" | "CAPTAIN" | "PENDING"

export interface IUser extends mongoose.Document {
    clubId: string;
    fullName: string;
    email: string;
    password: string;
    role: userRole;
    avatar: string;
    socialAccounts: {
        facebook: string;
        twitter: string;
        youtube: string;
        discord: string;
    }
    efootballId: string;
    device: {
        name: string;
        model: string;
    }
    dob: Date;
    bloodGroup: string;
    stats: {
        totalMatch: number;
        win: number;
        draw: number;
        loss: number;
        goalsFor: number;
        goalsAgainst: number;
        goalDiff: number;
        points: number;
    }
}

const userSchema = new mongoose.Schema<IUser>({
    clubId: {
        type: String,
        required: true
    },
    fullName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        enum: ["ADMINISTRATOR", "ADMIN", "MEMBER", "CAPTAIN","PENDING"],
        default: "PENDING"
    },
    efootballId: {
        type: String,
        default: ""
    },
    device: {
        name: {
            type: String,
            required: true
        },
        model: {
            type: String,
            required: true
        }
    },
    avatar: {
        type: String,
        default: "",
    },
    socialAccounts:{
        facebook: {
            type: String,
            default: ""
        },
        twitter: {
            type: String,
            default: ""
        },
        youtube: {
            type: String,
            default: ""
        },
        discord: {
            type: String,
            default: ""
        }
    },
    dob: {
        type: Date,
        required: true
    },
    bloodGroup: {
        type: String,
        default: ""
    }, stats: {
        totalMatch: {
            type: Number,
            default: 0
        },
        win: {
            type: Number,
            default: 0
        },
        draw: {
            type: Number,
            default: 0
        },
        loss: {
            type: Number,
            default: 0
        },
        goalsFor: {
            type: Number,
            default: 0
        },
        goalsAgainst: {
            type: Number,
            default: 0
        },
        goalDiff: {
            type: Number,
            default: 0
        },
        points: {
            type: Number,
            default: 0
        }
    }
},{
    timestamps: true
})

const User = mongoose.models?.User || mongoose.model<IUser>("User", userSchema)

export default User
