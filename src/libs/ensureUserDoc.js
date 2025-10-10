import { db } from "./firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

export async function ensureUserDoc(uid, email, extra = {}) {
    const ref = doc(db, "users", uid);
    const snap = await getDoc(ref);
    if (!snap.exists()) {
        await setDoc(ref, { email, createdAt: serverTimestamp(), ...extra });
    } else if (Object.keys(extra).length) {
        await setDoc(ref, { ...extra, lastLoginAt: serverTimestamp() }, { merge: true });
    } else {
        await setDoc(ref, { lastLoginAt: serverTimestamp() }, { merge: true });
    }
}
