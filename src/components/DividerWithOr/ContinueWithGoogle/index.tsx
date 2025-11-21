
import { GoogleIcon } from "@/components/Icons";
import { Button } from "@/components/ui/button";

interface Props {
  onClick?: () => void | Promise<unknown>;
}

const ContinueWithGoogle = ({ onClick }: Props) => {
  return (
    <Button
      variant="outline"
      onClick={onClick}
      className="w-full h-12 rounded-md flex items-center justify-center gap-3 text-gray-900 transition-colors duration-200"
      style={{ backgroundColor: "#F5F5F5" }}
    >
      <GoogleIcon />
      <span className="text-sm font-normal">Sign up with Google</span>
    </Button>
  );
};

export default ContinueWithGoogle;
