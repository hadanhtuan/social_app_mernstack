export const decode = (res) => {
  let base64Url = res.credential.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    
   // console.log( JSON.parse(jsonPayload)  )
    const { sub, email, name, picture } = JSON.parse(jsonPayload)
    return { sub, email, name, picture }
}