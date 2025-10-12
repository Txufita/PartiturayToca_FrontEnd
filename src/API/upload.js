import api from "./client";

export function upLoad(formData) {
  
  return api.post("/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}