import { Router } from "express";
import { UrlController } from "../controllers/url.controller";

const router = Router();

router.post("/", UrlController.createUrl);
router.get("/:shorturl", UrlController.getUrl);
router.put("/:id", UrlController.updateUrl);
router.delete("/:id", UrlController.deleteUrl);

export default router;
