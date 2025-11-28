import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { transformPlans, FirestorePlan } from "./transformPlans";
import { Plan } from "@/types";

export async function getPlansServer(): Promise<Plan[] | undefined> {
  try {
    const plansDoc = await getDoc(doc(db, "global", "plans"));

    if (!plansDoc.exists()) {
      console.warn("Plans document does not exist in Firestore (server)");
      return undefined;
    }

    const plansData = plansDoc.data();
    const firestorePlans = plansData?.plans as FirestorePlan[] | undefined;

    if (!firestorePlans || !Array.isArray(firestorePlans)) {
      console.warn("Plans data is not an array or is missing (server)");
      return undefined;
    }

    return transformPlans(firestorePlans);
  } catch (error) {
    console.error("Error fetching plans from Firestore (server):", error);
    throw error;
  }
}

