import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { Plan } from "@/types";
import { transformPlans, FirestorePlan } from "./transformPlans";

/**
 * Client-side function to fetch plans from Firestore
 * Uses Firebase client SDK for browser/client operations
 * 
 * This function is used in:
 * - Client Components
 * - React hooks
 * - Client-side data fetching
 * 
 * @returns Array of Plan objects or undefined if not found
 * @throws Error if Firestore operation fails
 */
export const getPlans = async (): Promise<Plan[] | undefined> => {
  try {
    const plansDoc = await getDoc(doc(db, "global", "plans"));

    if (!plansDoc.exists()) {
      console.warn("Plans document does not exist in Firestore");
      return undefined;
    }

    const plansData = plansDoc.data();
    const firestorePlans = plansData?.plans as FirestorePlan[] | undefined;

    if (!firestorePlans || !Array.isArray(firestorePlans)) {
      console.warn("Plans data is not an array or is missing");
      return undefined;
    }

    // Use shared transformation logic
    return transformPlans(firestorePlans);
  } catch (error) {
    console.error("Error fetching plans from Firestore (client):", error);
    throw error;
  }
};
