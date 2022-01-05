import axios from "axios"

export const verifyUser = () => {
  const result = axios.get("http://localhost:8000/data")
  return result
}

export const sendData = (id, user) => {
  const result = axios.put(`http://localhost:8000/data/${id}`, user)
  return result
}
