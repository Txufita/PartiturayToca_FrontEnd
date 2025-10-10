import api from "./client";

export function upLoad(formData) {
  // formData es un FormData con el campo "file"
  return api.post("/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}