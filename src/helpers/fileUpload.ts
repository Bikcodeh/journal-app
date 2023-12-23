export const fileUpload = async (file: File) => {

    const cloudUrl = 'https://api.cloudinary.com/v1_1/react-images-bikcode/upload';
    const formData = new FormData();
    formData.append('upload_preset', 'journal_app');
    formData.append('file', file);
    try {
        const resp = await fetch(cloudUrl, {
            method: 'POST',
            body: formData
        });
        if (!resp.ok) throw new Error('Error uploading file');
        const cloudResp = await resp.json();
        return cloudResp.secure_url;
    } catch (error: any) {
        throw new Error(error.message);
    }
}