// js replace 正则数据例外处理
function escapeRegExp(str) {
  return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
}

// 全局替换函数
export function replaceAll(str, find, replace) {
  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

/**
 * 16进制颜色转为RGB格式
 * @param {*} color
 * @param {*} type   1-字符串，2-数字
 */
export function colorRgb(color = '#000000', type = 1) {
  const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/i;
  color = color.toLowerCase();

  if (color && reg.test(color)) {
    if (color.length === 4) {
      let sColorNew = '#';
      for (let i = 1; i < 4; i += 1) {
        sColorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1));
      }
      color = sColorNew;
    }
    // 处理六位的颜色值
    let sColorChange = [];
    for (let j = 1; j < 7; j += 2) {
      sColorChange.push(parseInt('0x' + color.slice(j, j + 2)));
    }

    if (type == 1) {
      return 'RGB(' + sColorChange.join(',') + ')';
    } else {
      return sColorChange;
    }
  } else {
    return color;
  }
}

// =======url操作函数=======
// 1. 获取url的params部分--兼容ie的操作
export function getUrlVars() {
  let vars = {};
  window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
    vars[key] = value;
  });
  return vars;
}

// 多重数组拉平
export function flattening(array, key) {
  let enwArrAy = [];
  array.map((item) => {
    enwArrAy.push({
      ...item,
      [key]: [],
    });
    if (item[key] && item[key].length) {
      enwArrAy = enwArrAy.concat(flattening(item[key], key));
    }
  });
  return enwArrAy;
}
