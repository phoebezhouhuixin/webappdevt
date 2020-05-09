window.onload = () => {
  'use strict';

  if ('serviceWorker' in navigator) {
    console.log("registering the service worker");
    navigator.serviceWorker.register('/sw.js')
  }
}