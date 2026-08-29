"use server";

import { revalidatePath } from "next/cache";



const backEndUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

// for the comment
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
  console.log("delete favorite id", favoriteId)
  const res = await fetch(`${backEndUrl}/favorite/${favoriteId}`, {
    method: "DELETE",
  });
  const data = await res.json();
  if(data.deletedCount > 0){
    revalidatePath(`/${user}/favorite`)
  }
  return data;
};


