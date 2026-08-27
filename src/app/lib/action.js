"use server";

const backEndUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

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
