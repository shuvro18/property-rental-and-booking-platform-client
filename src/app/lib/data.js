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

// get app for total earning booking and property (aggregate)  /owner/total-earnings/:userId

export const getOwnerDetail = async (ownerId) => {
  const res = await fetch(`${backEndUrl}/owner/total-earnings/${ownerId}`);
  const data = await res.json();
  return data;
};

// get api for admin earning , houses, tenant, owner (aggregate) /admin/total-earning

export const getAdminDetails = async () => {
  const res = await fetch(`${backEndUrl}/admin/total-earning`);
  const data = await res.json();
  return data;
};

// get all users get api

export const getAllUsers = async () => {
  const res = await fetch(`${backEndUrl}/all-users`);
  const data = res.json();
  return data;
};
