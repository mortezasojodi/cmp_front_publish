// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const path = require('path');

// const app = express();
// const port = process.env.PORT || 3000;

// Разрешаем CORS для всех источников (можете настроить так, чтобы разрешить только определенные источники)
// app.use(cors());

// // Увеличиваем максимальный размер запроса
// app.use(bodyParser.json({ limit: '50mb' }));
// app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// // Маршрут для загрузки документов
// app.post('/api/Document', (req, res) => {
//   // Ваш код для обработки запроса
//   res.json({ success: true, message: 'Document uploaded successfully' });
// });

// // Статические файлы
// app.use(express.static(path.join(__dirname, 'public')));

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

export const apiRequest = async (url, method, body = null, includeToken = true, isFormData = false) => {
  const token = localStorage.getItem('token'); 

  const headers = {};

  if (token && includeToken) {
    headers['Authorization'] = `Bearer ${token}`;
    // headers['Authorization'] = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJidXNpbmVzc0VtYWlsIjoiZHZ2Z3NyZUBwYXJsLmdjLmNhIiwiQ29tcGFueUlkIjoiMjIiLCJSZWdpc3RlcmVkIjoiZmFsc2UiLCJUeXBlIjoiMSIsImV4cCI6MTcyNTU2NDY1OSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1OTkyMSIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NDIwMCJ9.obT0bVHYzmbXM_tnQujnsjkJ_bVlaQzT10BLC2086fU`;
  }

  const options = {
    method,
    headers,
  };

  if (body && method !== 'GET') {
    if (isFormData) {
      options.body = body;
      delete headers['Content-Type']; // Удаляем заголовок Content-Type, чтобы fetch сам установил его корректно
    } else {
      headers['Content-Type'] = 'application/json-patch+json';
      options.body = JSON.stringify(body);
    }
  }

  try {
    const response = await fetch('https://api.app-cmp.com/api/' + url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error('API request error:', error);
    return { success: false, message: error.message };
  }
};





// export const apiRequest = async (url, method, body = null, includeToken = true) => {
//   const token = localStorage.getItem('token'); 

//   const headers = {
//     // 'Content-Type': 'application/json',
//     'Content-Type': 'application/json-patch+json',
//   };

//   if (token && includeToken) {
//     headers['Authorization'] = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJidXNpbmVzc0VtYWlsIjoiZHZ2Z3NyZUBwYXJsLmdjLmNhIiwiQ29tcGFueUlkIjoiMjIiLCJSZWdpc3RlcmVkIjoiZmFsc2UiLCJUeXBlIjoiMSIsImV4cCI6MTcyNTU2NDY1OSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1OTkyMSIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NDIwMCJ9.obT0bVHYzmbXM_tnQujnsjkJ_bVlaQzT10BLC2086fU`;
//     // headers['Authorization'] = `Bearer ${token}`;
//   }

//   const options = {
//     method,
//     headers,
//   };

//   if (body && method !== 'GET') {
//     options.body = JSON.stringify(body);
//   }

//   try {
//     const response = await fetch('https://api.app-cmp.com/api/' + url, options);
//     const data = await response.json();

//     return data; // возвращаем данные как есть
//   } catch (error) {
//     console.error('API request error:', error);
//     return { success: false, message: error.message };
//   }
// };



