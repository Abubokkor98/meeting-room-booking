import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Fetch all rooms
export const fetchRooms = async () => {
  const { data } = await axios.get(`${API_BASE_URL}/rooms`);
  return data;
};

// Fetch room details by ID
export const fetchRoomById = async (id) => {
  const { data } = await axios.get(`${API_BASE_URL}/rooms/${id}`);
  return data;
};

// Fetch user-specific bookings
export const fetchUserBookings = async (email) => {
  const { data } = await axios.get(`${API_BASE_URL}/dashboard`, { params: { email } });
  return data;
};

// Create a new booking
export const createBooking = async (bookingData) => {
  const { data } = await axios.post(`${API_BASE_URL}/bookings`, bookingData);
  return data;
};

// Admin: Fetch all bookings
export const fetchAllBookings = async () => {
  const { data } = await axios.get(`${API_BASE_URL}/admin/bookings`);
  return data;
};

// Admin: Fetch all rooms
export const fetchAdminRooms = async () => {
  const { data } = await axios.get(`${API_BASE_URL}/admin/rooms`);
  return data;
};

// Admin: Delete a room
export const deleteRoom = async (roomId) => {
  const { data } = await axios.delete(`${API_BASE_URL}/admin/rooms/${roomId}`);
  return data;
};
