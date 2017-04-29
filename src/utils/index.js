export function getParameterByName(name, url) {
  const realname = name.replace(/[[\]]/g, '\\$&');
  const regex = new RegExp(`[?&]${realname}(=([^&#]*)|&|#|$)`);
  const results = regex.exec(url || window.location.href);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

export function isLocaleZhCN() {
  if (localStorage.getItem('locale')) {
    return localStorage.getItem('locale') === 'zh-CN';
  }
  return navigator.language === 'zh-CN';
}
