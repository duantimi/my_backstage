import defaults from '@/themes/defaults.js';
import green from '@/themes/green.js';
import blue from '@/themes/blue.js';
import cyan from '@/themes/cyan.js';
const themes = { green, blue, cyan };

/**
 * @description 获取css文件
 * @param {String} url
 * @param {Boolean} isBlob
 */
const getFile = (url, isBlob = false) => {
  return new Promise((resolve, reject) => {
    const client = new XMLHttpRequest();
    client.responseType = isBlob ? 'blob' : '';
    client.onreadystatechange = () => {
      if (client.readyState !== 4) {
        return;
      }
      if (client.status === 200) {
        const urlArr = client.responseURL.split('/');
        resolve({
          data: client.response,
          url: urlArr[urlArr.length - 1],
        });
      } else {
        reject(new Error(client.statusText));
      }
    };
    client.open('GET', url);
    client.send();
  });
};

/**
 * @description 获取新主题
 * @param {String} data
 * @param {Object} theme
 */
const getStyleTemplate = (data = '', theme = {}) => {
  const colorMap = defaults;
  Object.keys(colorMap).forEach((key) => {
    if (!theme[key]) console.error(`当前${ENV.theme}主题,没有${key}这个key，请添加！`);
    data = data
      .replace(
        new RegExp(colorMap[key].replace(/\((.+)\)/, '\\($1\\)'), 'ig'), // 解决rgba()中括号匹配问题
        theme[key] ? theme[key] : colorMap[key]
      )
      .replace(/(\n)/g, '')
      .replace(/ {1,}/g, ' ');
  });
  return data;
};

/**
 * @description 文件写入
 * @param {String} cssText
 */
const writeNewStyle = (cssText = '') => {
  const style = document.head.querySelector('style');
  const id = style ? style.id : '';
  if (id !== '#theme-style') {
    const style = document.createElement('style');
    style.id = '#theme-style';
    style.innerText = cssText;
    document.head.appendChild(style);
  } else {
    document.head.lastChild.innerHTML = cssText;
  }
};

/**
 * @description 获取css路径
 */
export const init = (callback) => {
  if (!window.cssLinkList) window.cssLinkList = [];
  const linkList = document.querySelectorAll('link');
  linkList.forEach((item) => {
    const { href = '' } = item;
    if (href.includes('.css')) window.cssLinkList.push(getFile(item.href));
  });
  getSeparatedStyles(callback);
};

/**
 * @description 主逻辑函数
 */
export const getSeparatedStyles = (callback) => {
  const cssText = window.cssText;
  const theme = ENV.theme;
  if (!cssText) {
    Promise.all(window.cssLinkList)
      .then((values = []) => {
        let cssTexts = '';
        values.length && values.forEach((item) => (cssTexts += `${item.data}`));
        if (cssTexts) {
          window.cssText = cssTexts;
          const cssText = getStyleTemplate(cssTexts, themes[theme]);
          writeNewStyle(cssText);
          callback && callback();
        }
      })
      .catch((error) => {
        console.error('主题文件获取失败', error);
      });
  } else {
    const _cssText = getStyleTemplate(cssText, themes[theme]);
    writeNewStyle(_cssText);
    callback && callback();
  }
};
