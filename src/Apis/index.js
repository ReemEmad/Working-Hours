import axios from "axios"

export const verifyUser = () => {
  const result = axios.get("http://localhost:8000/data")
  return result
}

// export const verifyUser = (id) => {
//   const result = axios.post(`http://localhost:8000/data/${id}`)
//   return result
// }
