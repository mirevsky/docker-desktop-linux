export const RequestType = {
    GET: "GET",
    POST: "POST",
    PATCH: "PATCH",
    DELETE: "DELETE"
}

export default class Request
{
    constructor(requestType = RequestType.GET, url="", callback, data={}, headers={}, responseType = 'json') {
        let xhr = new XMLHttpRequest();
        //xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhr.open(requestType, url);
        let formData = null
        if (Object.keys(data).length > 0) {
            formData = new FormData()
            for(let idx in data) {
                formData.append(idx, data[idx])
            }
        }

        xhr.send(formData);
        xhr.onload = function() {
          if (xhr.status !== 200) { // analyze HTTP status of the response
            console.log(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
          } else { // show the result
            callback(xhr.response)
          }
        };

        xhr.onprogress = function(event) {
          if (event.lengthComputable) {
            console.log(`Received ${event.loaded} of ${event.total} bytes`);
          } else {
            console.log(`Received ${event.loaded} bytes`); // no Content-Length
          }

        };

        xhr.onerror = function() {
          console.log("Request failed");
        };
    }
}