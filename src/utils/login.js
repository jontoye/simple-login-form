export const login = async (username, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === "jon" && password === "password") {
        resolve();
      } else {
        reject();
      }
    }, 1000);
  });
};
