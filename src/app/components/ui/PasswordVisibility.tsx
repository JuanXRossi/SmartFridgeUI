import { Dispatch, SetStateAction } from "react";
import { Eye, EyeOff } from "lucide-react";

const styles = {
  toggleBtn:
    'absolute right-3 top-1/2 -translate-y-1/2 transform text-[#ccc] focus:outline-none cursor-pointer',
}

interface PasswordVisibilityProps {
  showPassword: boolean
  setShowPassword: Dispatch<SetStateAction<boolean>>
}

export default function PasswordVisibility( { showPassword, setShowPassword }: PasswordVisibilityProps ) {
  const handleTogglePassword = () => setShowPassword((prev) => !prev);
  
  return (
    <button
      type="button"
      onClick={handleTogglePassword}
      className={styles.toggleBtn}
      aria-label={
        showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'
      }
    >
      {showPassword ? (
        <EyeOff size={20} />
      ) : (
        <Eye size={20} />
      )}
    </button>
  );
}