import { apiRequest } from './api';

// Login user
export const loginUser = async (businessEmail, password) => {
  const data = await apiRequest('User/Login', 'POST', { businessEmail, password });

  console.log('Login result:', data); // Добавляем лог

  if (data && data.token) {
    return { 
      success: true,
      data: data,
      token: data.token,
      message: data.Message,
    };
  } else {
    return { 
      success: false,
      message: data?.Message || 'Login failed',
    };
  }
};


// apiService.js
export const checkRegistrationStatus = async (token) => {
  const response = await apiRequest('RegisterStatus', 'GET', null, true, true, token);

  if (response && response.Data) {
    if (response.Data === 'Registered') {
      return { 
        success: true, 
        status: 'Registered',
        message: response.Message 
      };
    } else {
      return { 
        success: true, 
        status: response.Data, 
        message: response.Message 
      };
    }
  } else {
    return { 
      success: false, 
      message: response?.Message || 'Failed to check registration status' 
    };
  }
};



// Register company
export const registerCompany = async (data) => {
  console.log(data);
  const result = await apiRequest('RegisterCompany', 'POST', data, false);
  console.log(result.token);
  console.log(result.Data);
  console.log(result);

  if (result.token) {
    return { 
      success: true, 
      token: result.token, 
      expiration: result.expiration, 
      accepted: result.accepted 
    };
  } else if (result.Success !== undefined) {
    return { 
      success: result.Success, 
      message: result.Message || 'Registration failed due to an unknown error'
    };
  } else {
    return { 
      success: false, 
      message: result.Message || 'Registration failed due to an unknown error'
    };
  }
};



//OperationalAddress 
export const createOperationalAddress = async (data) => {
  const result = await apiRequest('OperationalAddress', 'POST', data);

  if (result.Success) {
    return {
      success: true,
      data: result.Data,
      message: result.Message
    };
  } else {
    return {
      success: false,
      message: result.Message || 'Failed to create operational address'
    };
  }
};


// companyLocation

export const createCompanyLocation = async (data) => {
  const result = await apiRequest('RegisterCompanyLocation', 'POST', data);

  if (result.Success) {
    return {
      success: true,
      data: result.Data,
      message: result.Message
    };
  } else {
    return {
      success: false,
      message: result.Message || 'Failed to create company location'
    };
  }
};


// Получение оперативного адреса
export const fetchOperationalAddress = async () => {
  const result = await apiRequest('OperationalAddress', 'GET', null, true);

  if (result.Success) {
    return {
      success: true,
      data: result.Data,
      message: result.Message
    };
  } else {
    return {
      success: false,
      message: result.Message || 'Failed to fetch operational address'
    };
  }
};

// Получение адресов локаций
export const fetchCompanyLocations = async () => {
  const result = await apiRequest('RegisterCompanyLocation', 'GET', null, true);

  if (result.Success) {
    return {
      success: true,
      data: result.Data,
      message: result.Message
    };
  } else {
    return {
      success: false,
      message: result.Message || 'Failed to fetch company locations'
    };
  }
};


// Удаление оперативного адреса
export const deleteOperationalAddress = async (id) => {
  const result = await apiRequest(`OperationalAddress/${id}`, 'DELETE');

  if (result.Success) {
    return {
      success: true,
      message: result.Message
    };
  } else {
    return {
      success: false,
      message: result.Message || 'Failed to delete operational address'
    };
  }
};

// Удаление адреса локации
export const deleteCompanyLocation = async (id) => {
  const result = await apiRequest(`RegisterCompanyLocation/${id}`, 'DELETE');

  if (result.Success) {
    return {
      success: true,
      message: result.Message
    };
  } else {
    return {
      success: false,
      message: result.Message || 'Failed to delete company location'
    };
  }
};



// apiService.js
export const updateCompanyLocation = async (id, data) => {
  const result = await apiRequest(`RegisterCompanyLocation/${id}`, 'PUT', data);

  if (result.Success) {
    return {
      success: true,
      data: result.Data,
      message: result.Message
    };
  } else {
    return {
      success: false,
      message: result.Message || 'Failed to update company location'
    };
  }
};

export const updateOperationalAddress = async (id, data) => {
  const result = await apiRequest(`OperationalAddress/${id}`, 'PUT', data);

  if (result.Success) {
    return {
      success: true,
      data: result.Data,
      message: result.Message
    };
  } else {
    return {
      success: false,
      message: result.Message || 'Failed to update operational address'
    };
  }
};

//Documents
export const fetchDocuments = async () => {
  try {
    const response = await apiRequest('Document', 'GET', null, true);
    return response;
  } catch (error) {
    console.error('Failed to fetch documents:', error);
    return { Success: false, Message: error.message };
  }
};



export const uploadDocuments = async (file1, file2) => {
  const formData = new FormData();
  formData.append('BusinessLicense', file1);
  formData.append('HealthDepartmentCertificate', file2);

  const response = await apiRequest('Document', 'POST', formData, true, true);

  return response;
};

export const deleteDocument = async (id) => {

    const result = await apiRequest(`Document/${id}`, 'DELETE');
    
    if (result.Success) {
      return {
        success: true,
        message: result.Message
      };
    } else {
      return {
        success: false,
        message: result.Message || 'Failed to delete company location'
      };
    }
};


export const submitBillingInformation = async (data, selectedButton) => {
  const formData = new FormData();
  formData.append('CardholderName', data.cardholderName);
  formData.append('City', data.city);
  formData.append('ZIPCode', data.zipcode);
  formData.append('CVC', data.cvc);
  formData.append('State', data.state);
  formData.append('Expiry', data.expiry);
  formData.append('Address', data.address);
  formData.append('CardNumber', data.cardNumber);
  formData.append('IsPaypal', selectedButton === 'paypal' ? 'true' : 'false');


  console.log(formData);
  const response = await apiRequest('BilingInformation', 'POST', formData, true, true);

  return response;
};
