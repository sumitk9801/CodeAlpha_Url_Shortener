import mongoose from "mongoose";
import shortid from "shortid";

const urlSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: true
    },
    shortId: {
        type: String,
        required: true,
        default: shortid.generate
    },
    clicks: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

const Url = mongoose.model("Url", urlSchema);

export default Url;
