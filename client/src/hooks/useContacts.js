import { useState, useEffect, useCallback } from "react";
import contactsApi from "../api/contactsApi";

export const useContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchContacts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await contactsApi.getAllContacts();
      
      if (Array.isArray(response)) {
        setContacts(response);
      } else if (response.data && Array.isArray(response.data)) {
        setContacts(response.data);
      } else {
        setContacts([]);
      }
    } catch (err) {
      console.error("Error fetching contacts:", err);
      const errorMessage =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Không thể tải danh sách liên hệ";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteContact = async (id) => {
    try {
      const response = await contactsApi.deleteContact(id);
      await fetchContacts();
      return response;
    } catch (err) {
      throw err.response?.data || { error: "Không thể xóa liên hệ" };
    }
  };

  const updateContactStatus = async (id, status) => {
    try {
      const response = await contactsApi.updateContactStatus(id, status);
      await fetchContacts();
      return response;
    } catch (err) {
      throw err.response?.data || { error: "Không thể cập nhật trạng thái" };
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  return {
    contacts,
    loading,
    error,
    fetchContacts,
    deleteContact,
    updateContactStatus,
  };
};

