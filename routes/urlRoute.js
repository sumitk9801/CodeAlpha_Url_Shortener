import express from "express";
import {createShortUrl,redirectToOriginal,getUrlStats,getAllUrls,deleteUrl} from "../controller/urlController.js";

const router = express.Router();

router.post("/shorten", createShortUrl);

router.get("/:shortId", redirectToOriginal);

router.get("/stats/:shortId", getUrlStats);

router.get("/", getAllUrls);

router.delete("/:shortId", deleteUrl);

export default router;
