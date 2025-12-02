import { FEEDBACK_API_ENDPOINT } from "@/constants/runtime.constants";
import { CustomToast } from "@/utils/CustomToast";

const customToast = new CustomToast();

export const submitGlobalFeedback = async (
  feedback: string,
  userId?: string
) => {
  await fetch(`${FEEDBACK_API_ENDPOINT}/submit-global-feedback`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      feedback,
      userId,
      projectId: "remixAi",
    }),
  });

  customToast.success("Thank you for your feedback!");
};
