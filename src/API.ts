import axios from "axios";

const instance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com"
});

export function getPhotos(): Promise<any>{
  return instance.get('photos');        
}

export function getAlbum(id: number): Promise<any>{
  return instance.get(`albums/${id}/photos`)
}