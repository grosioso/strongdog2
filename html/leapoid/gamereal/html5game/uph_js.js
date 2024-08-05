function ls_save(key, value) {
  localStorage.setItem(key, value);
}

function ls_load(key) {
  let val = localStorage.getItem(key);
  return val || -1;
}

function ls_clear(key) {
  localStorage.removeItem(key);
}

function sitelock() {
  return (!!window.location.host.match(/^(.*(\.))?armorgames\.com$/));
}