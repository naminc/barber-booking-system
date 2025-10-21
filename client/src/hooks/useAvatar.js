import { useState, useCallback } from "react";

export const useAvatar = (
  defaultAvatar = "https://cdn-icons-png.flaticon.com/512/149/149071.png"
) => {
  const [avatar, setAvatar] = useState(defaultAvatar);

  const handleAvatarChange = useCallback((e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const resetAvatar = useCallback(() => {
    setAvatar(defaultAvatar);
  }, [defaultAvatar]);

  return {
    avatar,
    handleAvatarChange,
    resetAvatar,
    setAvatar,
  };
};
