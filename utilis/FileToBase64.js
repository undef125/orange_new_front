async function toBase64(file) {
    try {
      const reader = new FileReader();
      const result = await new Promise((resolve, reject) => {
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
      });
      return result;
    } catch (error) {
      console.error(error);
    }
  }
export default toBase64;