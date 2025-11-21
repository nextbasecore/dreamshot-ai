import toast, { ToastOptions } from "react-hot-toast";

export class CustomToast {
  success(message: string, extraProps: ToastOptions = {}) {
    return toast.success(message, extraProps);
  }

  error(message: string) {
    return toast.error(message);
  }

  loading(message: string) {
    return toast.loading(message);
  }

  dismiss(id: string) {
    return toast.dismiss(id);
  }
}
