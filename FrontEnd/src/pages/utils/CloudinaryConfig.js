import axios from 'axios'
const preset_key = import.meta.env.VITE_CLOUD_PRESET_KEY;
const cloudName = import.meta.env.VITE_CLOUD_NAME;

export const uploadFileToCloud = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append("upload_preset", preset_key);
    console.log('Uploading...');
    try {
        const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData);
        console.log(response);
        return response.data.secure_url;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
