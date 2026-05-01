import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { db } from "./firebase-service.js";
import { COLLECTIONS, GUEST_FIELDS } from "../shared/utils/constants.js";

export function addGuest({ name, userId }) {
  return addDoc(collection(db, COLLECTIONS.guests), {
    [GUEST_FIELDS.name]: name,
    [GUEST_FIELDS.userId]: userId,
    [GUEST_FIELDS.confirmed]: true,
    [GUEST_FIELDS.checkedIn]: false,
  });
}

export function subscribeGuestsByUser(userId, onChange, onError) {
  const guestsQuery = query(
    collection(db, COLLECTIONS.guests),
    where(GUEST_FIELDS.userId, "==", userId)
  );

  return onSnapshot(guestsQuery, onChange, onError);
}

export function getGuestById(guestId) {
  const guestRef = doc(db, COLLECTIONS.guests, guestId);
  return getDoc(guestRef);
}

export function checkInGuest(guestId) {
  const guestRef = doc(db, COLLECTIONS.guests, guestId);
  return updateDoc(guestRef, {
    [GUEST_FIELDS.checkedIn]: true,
  });
}
