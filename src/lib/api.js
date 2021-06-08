import axios from "axios";
import FormData from "form-data";

const BaseUrl = 'http://localhost:5000';

export async function login(email, password) {
  const response = await axios.post(BaseUrl + '/users/login', { email, password });
  return response.data;
}

export async function signup(email, password, firstName, lastName, phoneNumber) {
  const response = await axios.post(BaseUrl + '/users', { email, password, firstName, lastName, phoneNumber });
  return response.data;
}

export async function updateProfile(userId, firstName, lastName, phoneNumber, bio) {
  const response = await axios.put(BaseUrl + `/users/${userId}`, { firstName, lastName, phoneNumber, bio });
  return response.data;
}

export async function updatePet(petId, petItem) {
  const response = await axios.put(BaseUrl + `/pets/${petId}`, {petItem});  
  return response.data;
}

export async function createPet(petItem, picture, token) {
  const form = new FormData();
  form.append('petItem', JSON.stringify(petItem))
  form.append('petPicture', picture)
  const response = await axios.post(BaseUrl + '/pets', form, { headers: {'Content-Type': 'multipart/form-data', Authorization: 'Bearer ' + token} });
  return response.data;
}
                            
export async function updatePetStatus(id, adoptionStatus, userId){
  const response = await axios.put(BaseUrl + '/pets', {id, adoptionStatus, userId}) 
  return response.data;
}

export async function deletePet(petId, token) {
  const response = await axios.delete(BaseUrl + `/pets/${petId}`, { headers: {Authorization: 'Bearer ' + token}})
  return response.data;
}

export async function getMyPets(userId){ 
  const response = await axios.get(BaseUrl + `/pets/user/${userId}`) 
  return response.data;
}

export async function deleteUser(userId, token) {
  const response = await axios.delete(BaseUrl + `/users/${userId}`, { headers: {Authorization: 'Bearer ' + token}})
  return response.data;
}


export async function getUserById(id){ 
  const response = await axios.get(BaseUrl + `/users/${id}` ) 
  return response.data;
}

export async function getUsers(token){ 
  const response = await axios.get(BaseUrl + `/users/`, { headers: { Authorization: 'Bearer ' + token} });
  return response.data;
}

export async function search(petType, adoptionStatus, height, weight, name) {
  const query = searchQueryBuilder(petType, adoptionStatus, height, weight, name);
  const response = await axios.get(query)
  return response.data;
}

function searchQueryBuilder(petType, adoptionStatus, height, weight, name ) {
  let query = `${BaseUrl}/pets`
  if (!petType && !adoptionStatus && !height && !weight && !name)  // && !...
    return query;
  query += '?';
  if (petType) {
    query += `petType=${petType}&`  // localhost:3000/pets?petType=cat

  } 
  if (adoptionStatus) {
    query += `adoptionStatus=${adoptionStatus}&`    
  }
  if (height) {
    query += `height=${height}&`    
  }
  if (weight) {
    query += `weight=${weight}&`    
  }
  if (name) {
    query += `name=${name}&`       
  }
  return query.slice(0, -1);
}