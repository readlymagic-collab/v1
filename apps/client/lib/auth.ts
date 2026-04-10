export function setAdminToken(token: string) {
  if (typeof window !== "undefined") {
    localStorage.setItem("readly_magic_admin_token", token);
  }
}

export function getAdminToken() {
  if (typeof window !== "undefined") {
    return localStorage.getItem("readly_magic_admin_token");
  }
  return null;
}

export function removeAdminToken() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("readly_magic_admin_token");
  }
}

export async function verifyAdmin() {
  const token = getAdminToken();
  if (!token) return false;

  try {
    const response = await fetch("http://localhost:5000/api/admin/verify", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.ok;
  } catch (error) {
    return false;
  }
}
