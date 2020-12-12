const BASE_URL = 'https://thinkful-list-api.herokuapp.com/arian-yazdi/bookmarks'

const apiFetch = function (...args) {
    let error;
    return fetch(...args)
      .then(res => {
        if (!res.ok) {
          error = { code: res.status };
          if (!res.headers.get('content-type').includes('json')) {
            error.message = res.statusText;
            return Promise.reject(error);
          }
        }
        return res.json();
      })
      .then(data => {
        if (error) {
          error.message = data.message;
          return Promise.reject(error);
        }
        return data;
    });
};

function getItems() {
    return apiFetch(`${BASE_URL}`)
}

const createItem = function (title, url, description, rating) {
    const newBookmark = JSON.stringify({
      title: title,
      url: url,
      desc: description,
      rating: rating
    });
    return apiFetch(`${BASE_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: newBookmark
    });
  }
const deleteItem = function (id) {
    return apiFetch(`${BASE_URL}/${id}`, {method: 'DELETE'})
}

export default {
    getItems,
    createItem,
    deleteItem
}