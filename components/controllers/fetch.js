const fetchAPI = {
  postJSON(url, data) {
    return fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    }).then((response) => {
      return response.json();
    });
  },
  getJSON(url) {
    return fetch(url).then((response) => {
      return response.json();
    });
  },
};

export default fetchAPI;
