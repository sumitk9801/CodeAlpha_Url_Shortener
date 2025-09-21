import express from "express";
import {createShortUrl,redirectToOriginal,getUrlStats,getAllUrls,deleteUrl} from "../controller/urlController.js";

const router = express.Router();

router.post("/shorten", createShortUrl);

router.get("/:shortUrl", redirectToOriginal);

router.get("/stats/:shortUrl", getUrlStats);

router.get("/", getAllUrls);

router.delete("/:shortUrl", deleteUrl);

export default router;
