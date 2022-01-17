import * as admin from "firebase-admin";
import { callback, redirect } from "./auth";

admin.initializeApp();
// Export twitch auth functions
export { redirect, callback };
