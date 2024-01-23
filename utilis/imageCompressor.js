import imageCompression from "browser-image-compression";

const options = {
    maxSizeMB: 0.35,
    maxWidthOrHeight: 600,
    useWebWorker: true,
  };

export default async function compressImage(file) {
    try {
      const compressedFile = await imageCompression(file, options);
        compressedFile.lastModifiedDate = new Date();
        compressedFile.name = file.name;
        return compressedFile;
      } catch (error) {
        return file;
      }
}