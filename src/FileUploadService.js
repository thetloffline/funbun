import axios from 'axios'
/* import { rejects } from 'assert'; */

const url = 'http://localhost:3000/api/files/'

class FileUploadService {
  // GET
  static getCakes () {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url)
        const data = res.data
        resolve(
          data.map(cake => ({
            ...cake /* ,
            createdAt : new Date(movie.createdAt) */
          }))
        )
      } catch (err) {
        reject(err)
      }
    })
  }
  // POST
  static async insertFile (FormData) {
    await axios.post(url, FormData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
  // DEL
  static deleteEntry (id) {
    return axios.delete(`${url}${id}`)
  }
}

export default FileUploadService
