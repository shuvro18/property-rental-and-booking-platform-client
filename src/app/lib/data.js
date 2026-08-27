const backEndUrl = process.env.NEXT_PUBLIC_BACKEND_URL

export const getHouses = async() =>{
    const res = await fetch(`${backEndUrl}/houses`);
    const data = await res.json();
    return data
}