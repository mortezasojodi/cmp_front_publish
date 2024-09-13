
// export const loginUser = async (businessEmail, password) => {
//   const apiUrl = process.env.NEXT_PUBLIC_API_URL;
//   try {
//     const response = await fetch(`${apiUrl}/User/Login`, {
//       method: 'POST',
//       headers: {
//         'accept': '*/*',
//         'Content-Type': 'application/json-patch+json'
//       },
//       body: JSON.stringify({ businessEmail, password })
//     });

//     const data = await response.json();

//     if (response.ok && data.Success) {
//       return { success: true, data: data.Data };
//     } else {
//       return { success: false, message: data.Message || 'Login failed' };
//     }
//   } catch (error) {
//     console.error('Login API Error:', error);
//     return { success: false, message: 'An error occurred during login' };
//   }
// };
