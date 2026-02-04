import express from "express";
import dotenv from "dotenv";
import multer from "multer";
import cors from "cors";
import sharp from "sharp";
import { createClient } from "@supabase/supabase-js";
dotenv.config();

const PORT = process.env.PORT;
const SUPERBASE_URL = process.env.SUPERBASE_URL;
const ACCESS_KEY = process.env.ACCESS_KEY;
const app = express();

app.use(express.json());
app.use(cors());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const supabase = createClient(SUPERBASE_URL, ACCESS_KEY);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.post("/api/image", upload.single("image"), async (req, res) => {
  try {
    const image = req.file;

    if (!image) return res.send("Send a image");

    const filePath = `images/${Date.now()}-${image.originalname}`;

    const resiezImage = await sharp(image.buffer)
      .resize({
        width: 320, // or height: 240
        fit: "inside", // keeps aspect ratio, fits within the box
      })
      .webp({ quality: 80 })
      .toBuffer();
    const { data, error } = await supabase.storage
      .from("Deia")
      .upload(filePath, resiezImage, {
        contentType: image.mimetype,
      });

    const { data: PublicUrl } = supabase.storage
      .from("Deia")
      .getPublicUrl(data.path);

    res.status(200).json({
      PublicUrl: PublicUrl.publicUrl,
      filePath,
    });
  } catch (error) {
    console.log("Error: ", error);
  }
});

app.delete("/api/image/delete", async (req, res) => {
  try {
    const { filePath } = req.query;
    if (!filePath) return res.send("Send the actual filePath");

    const { data } = await supabase.storage.from("Deia").remove([filePath]);
    res.send(data);
  } catch (error) {
    console.log("Error: ", error);
  }
});

app.listen(PORT, () => {
  console.log("Server running on 8080");
});
