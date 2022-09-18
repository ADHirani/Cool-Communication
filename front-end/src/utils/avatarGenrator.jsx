import toonavatar from "cartoon-avatar";

const avatarGenrator = (avatarData) => {
  return toonavatar.generate_avatar({
    gender: avatarData.gender,
    id: avatarData.id,
  });
};

export default avatarGenrator;
