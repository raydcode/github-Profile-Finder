import * as v from './utils/variables.js';
import { getGithubUser, errorMessage } from './utils/functions.js';

v.form.addEventListener('submit', function (event) {
  event.preventDefault();

  let userName = v.search.value.split(' ').join('');

  if (userName === '') {
    errorMessage('Please enter a username');
  } else {
    getGithubUser(userName);
    v.search.value = '';
  }
});
