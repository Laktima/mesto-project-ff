const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-23',
    headers: {
      authorization: '3788ab92-ec4b-445e-aebd-a01d797e384a',
      'Content-Type': 'application/json'
    }
  }
  
export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
  
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      });
}

export const getUserInfo = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
      })
        .then(res => {
          if (res.ok) {
            return res.json();
          }
    
          // если ошибка, отклоняем промис
          return Promise.reject(`Ошибка: ${res.status}`);
        });
}

export const editUserInfo = (userInfo) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
          name: userInfo.name,
          about: userInfo.about
        })
      })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            
            // если ошибка, отклоняем промис
            return Promise.reject(`Ошибка: ${res.status}`);
        })
}

export const createNewCard = (cardInfo) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: cardInfo.name,
            link: cardInfo.link
        })
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
        }
        
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
    })
}

export const deleteCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
        }
        
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
    })
}

export const editUserAvatar = (userAvatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        avatar: userAvatar
      })
    })
      .then((res) => {
          if (res.ok) {
              return res.json();
          }
          
          // если ошибка, отклоняем промис
          return Promise.reject(`Ошибка: ${res.status}`);
      })
}

export const setLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: config.headers,
    })
      .then((res) => {
          if (res.ok) {
              return res.json();
          }
          
          // если ошибка, отклоняем промис
          return Promise.reject(`Ошибка: ${res.status}`);
      })
}

export const deleteLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: config.headers,
    })
      .then((res) => {
          if (res.ok) {
              return res.json();
          }
          
          // если ошибка, отклоняем промис
          return Promise.reject(`Ошибка: ${res.status}`);
      })
}