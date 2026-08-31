const backEndUrl = process.env.NEXT_PUBLIC_SERVER_URL;

// all houses
export const getHouses = async () => {
  const res = await fetch(`${backEndUrl}/houses`);
  const data = await res.json();
  return data;
};

// single houser
export const getSingleHouse = async (id) => {
  const res = await fetch(`${backEndUrl}/houses/${id}`);
  const data = await res.json();
  return data;
};

//get user houser
export const getUserHouse = async (id) => {
  const res = await fetch(`${backEndUrl}/houses/user/${id}`);
  const data = await res.json();
  return data;
};

// get comments
export const getComments = async () => {
  const res = await fetch(`${backEndUrl}/comment`);
  const data = await res.json();
  return data;
};

//get booking
export const getTenantBookings = async () => {
  const res = await fetch(`${backEndUrl}/bookings`);
  const data = await res.json();
  return data;
};

//get  favorite
export const getFavorite = async () => {
  const res = await fetch(`${backEndUrl}/favorites`);
  const data = await res.json();
  return data;
};
