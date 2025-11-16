// src/services/Auth.js
import { auth, db } from "./firebase";
import { doc, setDoc, getDoc, Timestamp, updateDoc, deleteDoc } from "firebase/firestore";
import { updateProfile, deleteUser, reauthenticateWithCredential, reauthenticateWithPopup, EmailAuthProvider } from "firebase/auth";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  sendEmailVerification,
  signInWithPopup,
  signOut,
} from "firebase/auth";

// Email/Password login
export const loginUser = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;
  const userRef = doc(db, 'users', user.uid);
    await updateDoc(userRef, {
      lastLoginAt: new Date()
    });
  return userCredential.user;
};

// Logout
export const handleLogout = async () => {
  await signOut(auth);
};

// Email/Password registration
export const registerUser = async (email, password, name, phone) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;

  // Update display name and photo
  await updateProfile(user, {
    displayName: name,
  });

  sendEmailVerification(user)

  // Build Firestore schema
 const userData = {
  uid: user.uid,
  email,
  name,
  phone: phone || "",
  provider: "email",
  createdAt: Timestamp.now(),
  verified: false,
  lastLoginAt: (Timestamp.now())

};


  await setDoc(doc(db, "users", user.uid), userData);
  
  return user;
};

export const updateUserVerificationStatus = async (userId) => {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      verified: true,
    });
    console.log('User verification status updated in Firestore');
  } catch (error) {
    console.error('Error updating verification status:', error);
    throw error;
  }
};

export const resendVerificationEmail = async () => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error('No user logged in');
    
    await sendEmailVerification(user);
    return true;
  } catch (error) {
    console.error('Error resending verification email:', error);
    throw error;
  }
};

// Password reset
export const resetPassword = (email) => sendPasswordResetEmail(auth, email);

// Google sign-in
export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const user = result.user;

  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    const userData = {
      uid: user.uid,
      email: user.email || "",
      name: user.displayName || "",
      provider: "google",
      createdAt: Timestamp.now(),
      status: "active",
      lastLoginAt: Timestamp.now(),
    };
    await setDoc(userRef, userData);
  }else {
    // Update last login for existing Google users
    await updateDoc(userRef, {
      lastLoginAt: Timestamp.now()
    });
  }

  return user;
};

// Re-authenticate user
export const reauthenticateUser = async (password) => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('No user logged in');
  }
  
  // Check if user is a Google user
  const isGoogleUser = user.providerData.some(provider => provider.providerId === 'google.com');
  
  if (isGoogleUser) {
    // For Google users, reauthenticate with popup
    const provider = new GoogleAuthProvider();
    try {
      const result = await reauthenticateWithPopup(user, provider);
      return result.user;
    } catch (error) {
      if (error.code === 'auth/popup-closed-by-user') {
        throw new Error('Authentication cancelled. Please try again.');
      }
      throw error;
    }
  } else {
    // For email/password users, require password
    if (!password) {
      throw new Error('Password is required for email/password users');
    }
    
    const credential = EmailAuthProvider.credential(user.email, password);
    await reauthenticateWithCredential(user, credential);
    return user;
  }
};

// Optional: Create a separate function for Google reauthentication
export const reauthenticateGoogleUser = async () => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('No user logged in');
  }
  
  const provider = new GoogleAuthProvider();
  try {
    const result = await reauthenticateWithPopup(user, provider);
    return result.user;
  } catch (error) {
    if (error.code === 'auth/popup-closed-by-user') {
      throw new Error('Authentication cancelled. Please try again.');
    }
    throw error;
  }
};

// Delete user account and data
export const deleteUserAccount = async () => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('No user logged in');
  }

  try {
    // Delete user document from Firestore
    await deleteDoc(doc(db, "users", user.uid));
    
    // Delete the user from Firebase Auth
    await deleteUser(user);
    
    return true;
  } catch (error) {
    console.error('Error deleting user account:', error);
    throw error;
  }
};