export const uploadImage = async (image) => {
    const formData = new FormData();
    formData.append("image", image);
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMG_API}`, {
        method: "POST",
        body: formData
    });
    const data = await response.json();
    return data;
}