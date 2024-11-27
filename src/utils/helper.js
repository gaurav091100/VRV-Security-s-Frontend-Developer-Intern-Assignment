export const generateToken = (user) => {

    const token = `${user.email}:${Date.now()}`;
    return token;
  };
  