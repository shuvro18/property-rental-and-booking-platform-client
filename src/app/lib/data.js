const backEndUrl = process.env.NEXT_PUBLIC_BACKEND_URL

// all houses
export const getHouses = async() =>{
    const res = await fetch(`${backEndUrl}/houses`);
    const data = await res.json();
    return data
}

// single houser 
export const getSingleHouse = async(id) => {
    const res = await fetch(`${backEndUrl}/houses/${id}`);
    const data = await res.json();
    return data
}