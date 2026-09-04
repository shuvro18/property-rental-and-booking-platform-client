"use server";

import { revalidatePath } from "next/cache";

const backEndUrl = process.env.NEXT_PUBLIC_SERVER_URL;

// for add a comment
export const postComment = async (data) => {
  const res = await fetch(`${backEndUrl}/comments`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  return result;
};

// for the add to favorite

export const addToFavorite = async (data) => {
  const res = await fetch(`${backEndUrl}/favorites`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  return result;
};

//post api for bookings

export const addBooking = async (data) => {
  const res = await fetch(`${backEndUrl}/bookings`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  return result;
};

// delete from favorite
export const deleteFavorite = async (favoriteId, user) => {
  console.log("delete favorite id", favoriteId);
  const res = await fetch(`${backEndUrl}/favorite/${favoriteId}`, {
    method: "DELETE",
  });
  const data = await res.json();
  if (data.deletedCount > 0) {
    revalidatePath(`/${user}/favorite`);
  }
  return data;
};

// owner add a property

export const addProperty = async (data) => {
  const res = await fetch(`${backEndUrl}/addproperty`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  return result;
};

// owner delete property
export const deleteProperty = async (deleteId) => {
  const res = await fetch(`${backEndUrl}/houses/${deleteId}`, {
    method: "DELETE",
  });
  const data = await res.json();
  // if (data.deletedCount > 0) {
  //   revalidatePath(`/${user}/favorite`);
  // }
  return data;
};

// owner edit property

export const updateProperty = async (id, updateProperty) => {
  const res = await fetch(`${backEndUrl}/update/${id}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(updateProperty),
  });
  const data = await res.json();

  return data;
};

// owner update booking status  houses/bookings/id

export const updateBookingStatus = async (id, newStatus) => {
  const res = await fetch(`${backEndUrl}/houses/bookings/${id}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ status: newStatus }),
  });

  const data = await res.json();
  return data;
};

// admin update user's role

export const updateUserRole = async (userId, newRole) => {
  const res = await fetch(`${backEndUrl}/update-user-role/${userId}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ newRole }),
  });
  const data = await res.json();
  return data;
};

// admin approve property

export const approveProperty = async (id) => {
  const res = await fetch(`${backEndUrl}/owner-update-status/${id}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ newStatus: "approved" }),
  });
  const data = await res.json();
  return data;
};
