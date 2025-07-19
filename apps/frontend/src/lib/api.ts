export const API_BASE_URL = "http://localhost:4000";

// Helper function to get auth headers
function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem('authToken'); // Get from localStorage or Redux
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}

export async function loginUser(data: {
  email: string;
  password: string;
}) {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await res.json();
  if (!res.ok) throw new Error(result.error || "Login failed");
  
  // Store token for future requests
  if (result.token) {
    localStorage.setItem('authToken', result.token);
  }
  
  return result;
}

export async function registerUser(data: {
  name: string;
  email: string;
  password: string;
}) {
  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await res.json();
  if (!res.ok) throw new Error(result.error || "Registration failed");
  
  // Store token for future requests
  if (result.token) {
    localStorage.setItem('authToken', result.token);
  }
  
  return result;
}

// Protected API functions
export async function createListing(data: {
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
}) {
  const res = await fetch(`${API_BASE_URL}/api/listings`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  const result = await res.json();
  if (!res.ok) throw new Error(result.error || "Failed to create listing");
  return result;
}

export async function updateListing(id: string, data: {
  title?: string;
  description?: string;
  price?: number;
  imageUrl?: string;
  category?: string;
}) {
  const res = await fetch(`${API_BASE_URL}/api/listings/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  const result = await res.json();
  if (!res.ok) throw new Error(result.error || "Failed to update listing");
  return result;
}

export async function deleteListing(id: string) {
  const res = await fetch(`${API_BASE_URL}/api/listings/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    const result = await res.json();
    throw new Error(result.error || "Failed to delete listing");
  }
  return res.json();
}

export async function createOrder(data: {
  listingId: string;
  priceAtOrder: number;
  quantity?: number;
  status?: string;
}) {
  const res = await fetch(`${API_BASE_URL}/api/orders`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  const result = await res.json();
  if (!res.ok) throw new Error(result.error || "Failed to create order");
  return result;
}

export async function getUserOrders() {
  const res = await fetch(`${API_BASE_URL}/api/orders`, {
    headers: getAuthHeaders(),
  });

  const result = await res.json();
  if (!res.ok) throw new Error(result.error || "Failed to fetch orders");
  return result;
}

// Stripe Payment functions
export async function createCheckoutSession(orderId: string) {
  const res = await fetch(`${API_BASE_URL}/api/payments/create-checkout-session`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ orderId }),
  });

  const result = await res.json();
  if (!res.ok) throw new Error(result.error || "Failed to create checkout session");
  return result;
}

export async function getPaymentStatus(orderId: string) {
  const res = await fetch(`${API_BASE_URL}/api/payments/order/${orderId}`, {
    headers: getAuthHeaders(),
  });

  const result = await res.json();
  if (!res.ok) throw new Error(result.error || "Failed to fetch payment status");
  return result;
}

// Search function
export async function searchListings(query: string, category?: string) {
  const params = new URLSearchParams({ q: query });
  if (category) {
    params.append('category', category);
  }
  
  const res = await fetch(`${API_BASE_URL}/api/listings/search?${params}`);
  const result = await res.json();
  if (!res.ok) throw new Error(result.error || "Search failed");
  return result;
}

// Logout function to clear token
export function logout() {
  localStorage.removeItem('authToken');
}
