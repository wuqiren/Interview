request(urls, maxNum, callback)
 function request(urls, maxNum, callback) {
  if (urls.length > maxNum) {
    let reqNum = 0,
    k = 0;
    const thenFun = () => {
      reqNum--;
      if (k < urls.length) {
        httpReq(url[k]).then(thenFun);
        k++;
      } else if (reqNum == 0) {
        callback();
      }
    };
    for (let i = 0; i < maxNum; i++) {
      reqNum++;
      k++;
      httpReq(urls[i]).then(thenFun);
    }
  }
}