import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://dog.ceo/api/',
});

const getBreeds = () => {
    return axiosInstance.get('breeds/list/all');
};

const getImagesByBreed = breed => {
    return axiosInstance.get(`breed/${breed}/images`);
}
export {
    getBreeds,
    getImagesByBreed
};
