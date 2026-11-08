import { useCallback, useState } from "react";
import { container } from "../../di/container";

export function useAuth(initialMode = "login") {
  const [mode, setMode] = useState(initialMode);

  const [loginForm, setLoginForm] = useState({
    identifier: "",
    password: "",
  });

  const [registerForm, setRegisterForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const switchMode = useCallback((nextMode) => {
    setMode(nextMode);
    setFieldErrors({});
    setServerError("");
  }, []);

  const updateLoginField = (field, value) => {
    setLoginForm((prev) => {
      const next = { ...prev, [field]: value };
      const validation = container.loginUseCase.validate(next);
      setFieldErrors((prevErr) => ({
        ...prevErr,
        [field]: validation.errors[field] || "",
      }));
      return next;
    });
    setServerError("");
  };

  const updateRegisterField = (field, value) => {
    setRegisterForm((prev) => {
      const next = { ...prev, [field]: value };
      const validation = container.registerUseCase.validate(next);
      setFieldErrors((prevErr) => ({
        ...prevErr,
        [field]: validation.errors[field] || "",
      }));
      return next;
    });
    setServerError("");
  };

  const fillDemoAccount = (email = "rani.maharani@example.com") => {
    setMode("login");
    setLoginForm({
      identifier: email,
      password: "password123",
    });
    setFieldErrors({});
    setServerError("");
  };

  const submitLogin = (event) => {
    if (event?.preventDefault) {
      event.preventDefault();
    }

    setLoading(true);
    const result = container.loginUseCase.execute(loginForm);
    setLoading(false);

    setFieldErrors(result.errors);
    if (!result.isValid) {
      return null;
    }

    return result.user;
  };

  const submitRegister = (event) => {
    if (event?.preventDefault) {
      event.preventDefault();
    }

    setLoading(true);
    const result = container.registerUseCase.execute(registerForm);
    setLoading(false);

    setFieldErrors(result.errors);
    if (!result.isValid) {
      return null;
    }

    return result.user;
  };

  return {
    mode,
    switchMode,
    loginForm,
    registerForm,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    fieldErrors,
    serverError,
    loading,
    updateLoginField,
    updateRegisterField,
    fillDemoAccount,
    submitLogin,
    submitRegister,
  };
}
