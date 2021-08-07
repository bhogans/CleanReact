import store from '../index';

export default class BaseService {



    constructor(getState) {
        this.currentState = () => getState ? getState() : store.getState();


    }

    //Injects fake-auth headers
    fetchOptions = (additionalOptions) => {
        let fetchOptions = {
            headers: {
                "Fake-Auth": this.currentState().auth.currentUser.username,
                "Content-Type": "text/json"
            }
        };

        var mergedOptions = Object.assign({}, fetchOptions, additionalOptions);
        return mergedOptions;
    }

    async get(url, options) {
        return await fetch(url, this.fetchOptions(options));
    }

    async post(url, data, options) {
        var postOptions = Object.assign({}, { method: "post", body: JSON.stringify(data) }, options);

        return await fetch(url, this.fetchOptions(postOptions));
    }

    async put(url, data, options) {
        var putOptions = Object.assign({}, { method: "put", body: JSON.stringify(data) }, options);

        return await fetch(url, this.fetchOptions(putOptions));
    }

    async delete(url, options) {
        var deleteOptions = Object.assign({}, { method: "delete" }, options);

        return await fetch(url, this.fetchOptions(deleteOptions));
    }

    //TODO: instantiate a client/way to spawn requests with the current user injected from the store
}