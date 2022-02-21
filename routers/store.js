// module imports
import express from "express";

import { retrieveCollections } from "../controllers/store.js";

const router = express.Router();

router.route("/collections").get(retrieveCollections);

export default router;
