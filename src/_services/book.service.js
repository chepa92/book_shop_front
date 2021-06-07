import { BehaviorSubject } from "rxjs";

import config from "config";
import { fetchWrapper, history } from "../_helpers";

const userSubject = new BehaviorSubject(null);
const baseUrl = `${config.apiUrl}/api/books`;

export const bookService = {
  getBooks,
  getPurchasesBooks,
  searchBooks,
  createBook,
  purchaseBook,
  updateBook,
  deleteBook,
};

function getBooks() {
  return fetchWrapper.get(baseUrl);
}

function getPurchasesBooks() {
  return fetchWrapper.get(baseUrl);
}

function searchBooks() {
  return fetchWrapper.get(baseUrl);
}

function createBook(params) {
  return fetchWrapper.post(baseUrl, params);
}

function purchaseBook(params) {
  return fetchWrapper.post(baseUrl, params);
}

function deleteBook(id) {
  return fetchWrapper.delete(`${baseUrl}/${id}`).then((x) => {
    // auto logout if the logged in user deleted their own record
    if (id === userSubject.value.id) {
      logout();
    }
    return x;
  });
}

function updateBook(id, params) {
  return fetchWrapper.put(`${baseUrl}/${id}`, params).then((user) => {
    // update stored user if the logged in user updated their own record
    if (user.id === userSubject.value.id) {
      // publish updated user to subscribers
      user = { ...userSubject.value, ...user };
      userSubject.next(user);
    }
    return user;
  });
}
