import axios from 'axios';
import { isEmpty, assign } from 'lodash';

const singletonEnforcer = Math.random().toString(36).substring(2);

class AxiosClient {
  axiosClient;
  static axiosClientInstance;
  constructor(enforcer) {
    if (enforcer !== singletonEnforcer) {
      throw new Error('Cannot initialize Axios client single instance');
    }

    //create axios
    this.axiosClient = axios.create({
      baseURL: 'http://5f55a98f39221c00167fb11a.mockapi.io',
      headers: {
        // 'Content-Types': 'application/json',
        // 'Access-Control-Allow-Origin' : '*',
      },
    });
    // if you want to call API with header used auth, you can use axios set header.
    // hanlde before request
    this.axiosClient.interceptors.request.use(
      config => {
        //Do somthing before request
        return config;
      },
      error => Promise.reject(error)
    );
    // hanlde before response
    this.axiosClient.interceptors.response.use(
      res => {
        //Do something with response data
        return res;
      },
      error => {
        //Do something with response error
        return Promise.reject(error);
      }
    );
  }

  static get instance() {
    if (!this.axiosClientInstance) {
      this.axiosClientInstance = new AxiosClient(singletonEnforcer);
    }
    return this.axiosClientInstance;
  }
  // you can use function set header with token
  setHeader(token = null) {
    this.axiosClient.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
  // axios get
  get(resource, slug = '', config = {}) {
    const requestURL = isEmpty(slug) ? `${resource}` : `${resource}/${slug}`;
    return this.axiosClient.get(
      requestURL,
      assign(config, this.axiosClient.defaults.headers) //you can setHeader with auth and assign with config
    );
  }

  post(resource, data, config = {}) {
    return this.axiosClient.post(
      `${resource}`,
      data,
      assign(config, this.axiosClient.defaults.headers)
    );
  }

  update(resource, data, config = {}) {
    return this.axiosClient.put(
      `${resource}`,
      data,
      assign(config, this.axiosClient.defaults.headers)
    );
  }

  put(resource, data, config = {}) {
    return this.axiosClient.put(
      `${resource}`,
      data,
      assign(config, this.axiosClient.defaults.headers)
    );
  }

  patch(resource, data, config = {}) {
    return this.axiosClient.patch(
      `${resource}`,
      data,
      assign(config, this.axiosClient.defaults.headers)
    );
  }

  delete(resource, data, config = {}) {
    return this.axiosClient.delete(`${resource}`, {
      params: data,
      ...assign(config, this.axiosClient.defaults.headers),
    });
  }
}

export default AxiosClient.instance;
