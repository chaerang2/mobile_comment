import {dummy} from './dummydata.js';

if(!window.sessionStorage.commentList){
  window.sessionStorage.commentList = JSON.stringify(dummy)
}