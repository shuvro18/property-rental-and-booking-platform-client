export const uploadImage = async (image) => {
    const formData = new FormData();
    formData.append("image", image);
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMG_API}`, {
        method: "POST",
        body: formData
    });
    const result = await response.json();
    return result.data.display_url;
}