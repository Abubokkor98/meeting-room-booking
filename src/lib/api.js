import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Fetch all rooms
export const fetchAllRooms = async (email) => {
  const { data } = await axios.get(`${API_BASE_URL}/rooms`, {
    params: { email },
  });
  return data;
};

// Fetch room details by ID
export const fetchRoomById = async (id) => {
  const { data } = await axios.get(`${API_BASE_URL}/rooms/${id}`);
  return data;
};

// Fetch user-specific bookings
export const fetchUserBookings = async (email) => {
  const { data } = await axios.get(`${API_BASE_URL}/bookings`, {
    params: { email },
  });
  return data;
};

// Create a new booking
export const createBooking = async (bookingData) => {
  const { data } = await axios.post(`${API_BASE_URL}/bookings`, bookingData);
  return data;
};

// User: Delete own booking
export const deleteUserBooking = async (bookingId, email) => {
  const { data } = await axios.delete(`${API_BASE_URL}/bookings/${bookingId}`, {
    params: { email },
  });
  return data;
};

// Admin: Fetch all bookings
export const fetchAllBookings = async (page = 1, limit = 10) => {
  const { data } = await axios.get(`${API_BASE_URL}/admin/bookings`, {
    params: { page, limit },
  });
  return data;
};

// Admin: Delete any booking
export const deleteBookingAdmin = async (bookingId, email) => {
  const { data } = await axios.delete(
    `${API_BASE_URL}/admin/bookings/${bookingId}`,
    {
      params: { email },
    }
  );
  return data;
};


// Admin: Add a new room
export const addRoom = async (newRoom) => {
  try {
    const { data } = await axios.post(`${API_BASE_URL}/admin/rooms`, newRoom);
    return data;
  } catch (error) {
    console.error("Error adding room:", error);
    throw error;
  }
};

// Admin: Delete a room
export const deleteRoom = async (roomId) => {
  const { data } = await axios.delete(`${API_BASE_URL}/admin/rooms/${roomId}`);
  return data;
};

// Admin: Update a room
export const updateRoom = async (roomId, updatedRoom) => {
  const { data } = await axios.put(
    `${API_BASE_URL}/admin/rooms/${roomId}`,
    updatedRoom
  );
  return data;
};

// Admin: Update booking status
export const updateBookingStatus = async (bookingId, status) => {
  const { data } = await axios.patch(
    `${API_BASE_URL}/admin/bookings/${bookingId}`,
    status
  );
  return data;
};

// Upload image to ImgBB
export const image_hosting_key = process.env.NEXT_PUBLIC_VITE_IMAGE_HOSTING_KEY;
export const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

export const uploadImage = async (image) => {
  const { data } = await axios.post(image_hosting_api, image, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};
