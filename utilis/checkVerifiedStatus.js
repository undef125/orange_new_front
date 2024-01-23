import decode from "jwt-decode";

export default function checkVerifiedStatus(token) {
  try {
      let decoded = decode(token);
      return decoded.verified;
  } catch (error) {
    return false;
  }
}
