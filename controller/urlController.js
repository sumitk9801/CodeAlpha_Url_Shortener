import Url from "../models/urlModel.js";
import shortid from "shortid";

export const createShortUrl = async (req, res) => {
        const originalUrl = req.body.data;
    try{
        // VALIDATION FOR URL
        if (!originalUrl) {
            return res.status(400).json({ message: "URL is Required" });
        }

        // IF URL ALREADY EXISTS
        const urlExist = await Url.findOne({ originalUrl: originalUrl });
        if (urlExist) {
            return res.json({
                originalUrl: urlExist.originalUrl,
                shortId: urlExist.shortId,
                clicks: urlExist.clicks
            });
        }

        // CREATE A NEW SHORTURL
        const newUrl = new Url({ 
            originalUrl: originalUrl, 
            shortId: shortid.generate() 
        });
        await newUrl.save();

        res.status(201).json({
            originalUrl: newUrl.originalUrl,
            shortId: newUrl.shortId,
            clicks: newUrl.clicks
        });

    } catch (error) {
        console.error("Error creating short URL:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Redirect to original URL
export const redirectToOriginal = async (req, res) => {
    try {
        const  {shortId}  = req.params;

        const url = await Url.findOne({ shortId });
        if (!url) {
            return res.status(404).json({ error: "Short URL not found" });
        }
        //increasing the no. of visit 
        url.clicks += 1;
        await url.save();

        // visiting to original URL
        res.redirect(url.originalUrl);
    } catch (error) {
        console.error("Error redirecting:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getUrlStats = async (req, res) => {
    try {
        const { shortId } = req.params;

        const url = await Url.findOne({ shortId });
        if (!url) {
            return res.status(404).json({ error: "Short URL not found" });
        }

        res.json({
            originalUrl: url.originalUrl,
            shortId: url.shortId,
            clicks: url.clicks,
        });
    } catch (error) {
        console.error("Error getting URL stats:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getAllUrls = async (req, res) => {
    try {
        const urls = await Url.find({}).sort({ createdAt: -1 });
        res.json(urls);
    } catch (error) {
        console.error("Error getting all URLs:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const deleteUrl = async (req, res) => {
    try {
        const { shortId } = req.params;

        const url = await Url.findOneAndDelete({ shortId });
        if (!url) {
            return res.status(404).json({ error: "Short URL not found" });
        }

        res.json({ message: "URL deleted successfully" });
    } catch (error) {
        console.error("Error deleting URL:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
