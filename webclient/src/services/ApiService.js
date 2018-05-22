import * as moment from "moment";

//  const baseUrl = "https://api.cloudstacks.co";
const baseUrl = "http://localhost:4100";

// So we can distinguish fetch requests on the backend
const headers = new Headers();
headers.append("X-Requested-With", "XMLHttpRequest");

const defaultFetchOptions = {
    credentials: 'include',
    headers
};

class ApiService {
    get(url, data) {
        // Maybe add data to the url string as encoded parameters
        if (data && typeof data === 'object') {
            url += "?" + this.parameterize(data);
        }

        return fetch(baseUrl + url, defaultFetchOptions)
            .then(res => this.maybeParseJson(res));
    }

    post(url, data) {
        return fetch(baseUrl + url, {
            ...defaultFetchOptions,
            method: "post",
            headers: new Headers({
                "Content-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest"
            }),
            body: data !== undefined ? JSON.stringify(data) : undefined
        }).then(res => this.maybeParseJson(res));
    }

    put(url, data) {
        return fetch(baseUrl + url, {
            ...defaultFetchOptions,
            method: "put",
            headers: new Headers({
                "Content-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest"
            }),
            body: data !== undefined ? JSON.stringify(data) : undefined
        }).then(res => this.maybeParseJson(res));
    }

    delete(url, data) {
        return fetch(baseUrl + url, {
            ...defaultFetchOptions,
            method: "delete",
            headers: new Headers({
                "Content-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest"
            }),
            body: data !== undefined ? JSON.stringify(data) : undefined
        });
    }

    /**
     * Deserialize the response as JSON if it has a JSON content-type, otherwise return null.
     * @param response 
     */
    maybeParseJson(response) {
        const contentType = response.headers.get("content-type");
        return (contentType != null && contentType.indexOf("application/json") > -1)
            ? response.json()
            : null;
    }

    /**
     * Converts an object to a URL query string like ?thing=blah&anotherThing=Yep
     * See: http://stackoverflow.com/questions/22678346/convert-javascript-object-to-url-parameters
     */
    parameterize(data) {
        return Object
            .keys(data)
            .map(k => encodeURIComponent(k) + "=" + this.encode(data[k]))
            .join("&");
    }

    encode(value) {
        if (value == null) {
            return "";
        } else if (value instanceof moment) {
            return encodeURIComponent(value.format());
        } else {
            return encodeURIComponent(value);
        }
    }

}

export default new ApiService();
