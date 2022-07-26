enum Error {
  expireToken = 'Authenticator.introspectToken: <invalid> The token is not active or has expired',
  deviceOrKeyDeleted = 'Authpb.Client.IntrospectKey',
}

export default class API {
  static callAPI(url:string, options:any):Promise<any> {
    return new Promise((resolve, reject) => {
      fetch(url, options)
        .then(async (response) => {
          const contentType = response.headers.get('Content-Type');
          if (response.status >= 200 && response.status < 300) {
            if (/text\/html/i.test(contentType || '')) {
              const text = await response.text();
              resolve(text);
            } else if (/application\/json/.test(contentType || '')) {
              const json = await response.json();
              resolve(json);
            }
            
          } else {
            reject({
              status: response.status,
            });
          }
        });
    });
  }

  static isAuthError(error:string) {
    if(error && error === Error.expireToken) return true;
    return false;
  }

  static isAuthDeviceOrKeyIDError(error:string) {
    if(error && error.includes(Error.deviceOrKeyDeleted)) return true;
    return false;
  }
}
