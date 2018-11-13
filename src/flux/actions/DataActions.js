import axios from 'axios'
import alt from '../alt/alt.js'

class DataActions {
    constructor() {
      this.endPoint = 'https://marka.moscow/admin/api'
    }

    // Method for getting data from the provided end point url
    api(endPoint) {
      var config = {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE'
        }
      }
      return new Promise((resolve, reject) => {
          axios.get(endPoint, config).then((response) => {
              resolve(response.data);
          }).catch((error) => {
              reject(error);
          });
      });
    }

    // Method for getting Pages data
    getPages(cb){
        this.api(this.endPoint).then((response)=>{
            this.getPosts(response, cb)
        });
        return true;
    }

    // Method for getting Posts data
    getPosts(pages, cb){
        this.api(this.endPoint).then((response)=>{
            const posts     = response.management[0].artists
            const payload   = { pages, posts };

            this.getSuccess(payload); // Pass returned data to the store
            cb(payload); // This callback will be used for dynamic rout building
        });
        return true;
    }

    // This returnes an object with Pages and Posts data together
    // The Alt Store will listen for this method to fire and will store the returned data
    getSuccess(payload){
        return payload;
    }
}

export default alt.createActions(DataActions);
