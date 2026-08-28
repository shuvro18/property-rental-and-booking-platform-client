"use server";

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
