const API_URL = "http://localhost:5000/api/auth";

// Request to login Route from Frontend by using fetch
export const login = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorMessage = await response.json();
      throw new Error(errorMessage.msg || 'Failed to login');
    }
    const data = await response.json();
    localStorage.setItem('token',data.token);
    return data;
  } catch (error) {
    throw new Error(`${error.message}`);
  }
};

// Request to register Route from Frontend by using fetch
export const register = async (name, email, password) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
      const errorMessage = await response.json();
      throw new Error(errorMessage.message || 'Failed to register');
    }

    return response.json();
  } catch (error) {
    throw new Error(`Register error: ${error.message}`);
  }
};


export const isAuthenticated = ()=>{
  if(localStorage.getItem('token')){
      return true;
  }else{
      return false;
  }

}