import axios from "axios";
import { Photos } from "./AppTypes";

const instance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com"
});

export function getPhotos(): Promise<Photos[]>{
    return instance.get('photos');        
}