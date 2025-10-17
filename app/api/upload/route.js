import { NextResponse } from "next/server";
import path from "path";
import { writeFile, mkdir } from "fs/promises";

// Ensure the uploads directory exists
const ensureUploadsDir = async (uploadDir) => {
  try {
    await mkdir(uploadDir, { recursive: true });
  } catch (error) {
    console.error("Error creating uploads directory:", error);
  }
};

export const POST = async (req) => {
  const formData = await req.formData();
  const file = formData.get("file");

  if (!file) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = file.name.replace(/ /g, "_");
  const uploadDir = path.join(process.cwd(), "public/uploads");
  const filePath = path.join(uploadDir, filename);

  // Ensure the uploads directory exists
  await ensureUploadsDir(uploadDir);

  try {
    await writeFile(filePath, buffer);
    console.log("File uploaded to:", filePath);
    return NextResponse.json(
      { message: "File uploaded successfully." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error writing file:", error);
    return NextResponse.json({ error: "File upload failed." }, { status: 500 });
  }
};
