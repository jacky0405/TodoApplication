import axios from "axios";
import {API_URL} from '../../Constants.js';


class HelloWorldService {
    executeHelloWorldService(){
       return axios.get(`${API_URL}/helloworld`);
    }

    executeHelloWorldBeanService(){
        return axios.get(`${API_URL}/helloworld-bean`);
     }

    executeHelloWorldPathService(name){
      return axios.get(`${API_URL}/helloworld/${name}`);
   }

}

export default new HelloWorldService();