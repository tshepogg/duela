export const auth = { currentUser: { uid: 'tshepo', email: 'Tshepo' } };

export const watchAuth = (cb) => cb(auth.currentUser);
export const login = async () => auth.currentUser;
export const signup = async () => auth.currentUser;
export const resetPw = async () => {};
export const logout = async () => {};

export function toggleAdminLink() {
  const link = document.getElementById('adminLink');
  if (link) link.hidden = true;
}

