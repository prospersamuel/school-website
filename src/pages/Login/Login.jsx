import { useState } from "react";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import {
  loginUser,
  registerUser,
  signInWithGoogle,
  resetPassword,
} from "../../services/Auth";
import './LoginForm'
import AlertBox from "../../components/Alertbox";
import { validateField } from "../../services/Validate";
import { errorMessages } from "./errorMessages";
import LoginForm from "./LoginForm";

const formFields = {
  login: [
    { type: "email", name: "Email" },
    { type: "password", name: "Password" },
  ],
  signup: [
    { type: "text", name: "Full Name" },
    { type: "email", name: "Email" },
    { type: "tel", name: "Phone Number" },
    { type: "password", name: "Password" },
  ],
};

export default function LoginPage() {
  const [mode, setMode] = useState("login");
  const [inputs, setInputs] = useState({});
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const getFriendlyError = (code) =>
    errorMessages[code] || "Something went wrong.";

  const [alert, setAlert] = useState({
    open: false,
    type: "info",
    title: "",
    message: "",
    onConfirmAction: null,
  });

  const showAlert = ({
    type = "info",
    title,
    message,
    onConfirmAction = null,
  }) => {
    setAlert({ open: true, type, title, message, onConfirmAction });
  };

  const handleSwitch = () => {
    setMode((prev) => (prev === "login" ? "signup" : "login"));
    setErrors({});
    setInputs({});
  };

  const handleInputChange = (e) => {
    const { placeholder: name, value } = e.target;
    const validationResult = validateField(name, value);
    
    setInputs((prev) => ({ 
      ...prev, 
      [name]: value,
      ...(name === "Password" && typeof validationResult === 'object' ? { 
        passwordStrength: validationResult.strength,
        passwordRequirements: validationResult.requirements
      } : {})
    }));
    
    setErrors((prev) => ({
      ...prev,
      [name]: typeof validationResult === 'object' 
        ? validationResult.error 
        : validationResult
    }));
  };

  const handleGoogleAuth = async () => {
    try {
      setGoogleLoading(true);
      await signInWithGoogle();

      showAlert({
        type: "success",
        title: "Google Sign-in Successful",
        message: "You're logged in!",
        onConfirmAction: () => {
          navigate("/dashboard");
        },
      });
    } catch (err) {
      showAlert({
        type: "error",
        title: "Google Sign-in Failed",
        message: getFriendlyError(err.code) || err.message || "Something went wrong!",
      });
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate all fields
    const newErrors = {};
    let isValid = true;
    let errorMessages = [];
    
    formFields[mode].forEach((field) => {
      const fieldValue = inputs[field.name] || "";
      const validation = validateField(field.name, fieldValue);
      
      if (typeof validation === 'object' ? validation.error : validation) {
        newErrors[field.name] = typeof validation === 'object' ? validation.error : validation;
        isValid = false;
        
        // Collect error messages for alert
        if (field.name === "Email" && !fieldValue) {
          errorMessages.push("Email is required");
        } else if (field.name === "Password" && !fieldValue) {
          errorMessages.push("Password is required");
        } else if (field.name === "Full Name" && !fieldValue) {
          errorMessages.push("Full Name is required");
        } else if (field.name === "Phone Number" && !fieldValue) {
          errorMessages.push("Phone Number is required");
        } else {
          errorMessages.push(newErrors[field.name]);
        }
      }
    });
    
    // Special case for password strength - require all criteria for signup
    if (mode === "signup" && inputs["Password"]) {
      const passwordValidation = validateField("Password", inputs["Password"]);
      if (typeof passwordValidation === 'object' && passwordValidation.strength < 5) {
        newErrors["Password"] = "Password must meet all security requirements";
        isValid = false;
        errorMessages.push("Password must meet all security requirements");
      }
    }
    
    if (!isValid) {
      setErrors(newErrors);
      
      // Create appropriate alert message based on the errors
      let alertTitle = "Form Validation Error";
      let alertMessage = "";
      
      if (errorMessages.length > 0) {
        alertMessage = errorMessages.slice(0, 3).join(", "); // Show first 3 errors
        if (errorMessages.length > 3) {
          alertMessage += ", and more...";
        }
      } else {
        alertMessage = "Please fill in all required fields correctly";
      }
      
      setAlert({
        open: true,
        type: "error",
        title: alertTitle,
        message: alertMessage,
      });
      setLoading(false);
      return;
    }

    const {
      Email: email,
      Password: password,
      "Full Name": name,
      "Phone Number": phone,
    } = inputs;

    try {
      if (mode === "login") {
        await loginUser(email, password);
        showAlert({
          type: "success",
          title: "Login Successful",
          message: "Welcome back!",
          onConfirmAction: () => {
            navigate("/dashboard");
          },
        });
      } else {
        await registerUser(email, password, name, phone);

        showAlert({
          type: "success",
          title: "Account Created",
          message: "Your account has been created successfully!",
          onConfirmAction: () => {
            navigate("/verify");
          },
        });
      }
    } catch (err) {
      setLoading(false);
      showAlert({
        type: "error",
        title: mode === "login" ? "Login Failed" : "Registration Failed",
        message: getFriendlyError(err.code),
      });
    }
  };

  const handleResetPassword = async () => {
    const email = inputs["Email"];
    if (!email) {
      showAlert({
        type: "warning",
        title: "Missing Email",
        message: "Please enter your email first.",
      });
      return;
    }
    try {
      await resetPassword(email);
      showAlert({
        type: "success",
        title: "Reset Email Sent",
        message: "Check your inbox for reset instructions.",
      });
    } catch (err) {
      showAlert({
        type: "error",
        title: "Reset Failed",
        message: getFriendlyError(err.code),
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 overflow-hidden">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      {/* Navigation Back to Home */}
      <nav className="relative z-10 py-6 px-8">
        <Link 
          to="/" 
          className="inline-flex items-center gap-3 text-blue-900 hover:text-yellow-500 transition-colors font-semibold"
        >
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-sm">←</span>
          </div>
          Back to Home
        </Link>
      </nav>

      <div className="relative z-10 min-h-[calc(100vh-80px)] px-4 py-8">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 max-w-6xl mx-auto">
          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-xl"
          >
            {/* Main Card */}
            <div className="bg-white/80 backdrop-blur-lg rounded-md shadow-2xl border border-white/50 overflow-hidden">
              {/* Decorative Header */}
              <div className="bg-gradient-to-r from-blue-500 to-green-500 p-6 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="w-20 h-20 mx-auto bg-white rounded-md flex items-center justify-center mb-4 shadow-lg"
                >
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
                    SA
                  </span>
                </motion.div>
                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-2xl font-bold text-white mb-2"
                >
                  Sunshine Academy
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-blue-100 text-sm"
                >
                  {mode === "login" ? "Welcome back, student!" : "Join our learning community"}
                </motion.p>
              </div>

              {/* Form Content */}
              <div className="p-8">
                <LoginForm
                  handleSubmit={handleSubmit}
                  handleInputChange={handleInputChange}
                  inputs={inputs}
                  errors={errors}
                  passwordVisible={passwordVisible}
                  setPasswordVisible={setPasswordVisible}
                  handleResetPassword={handleResetPassword}
                  setInputs={setInputs}
                  loading={loading}
                  mode={mode}
                />

                {/* Google Sign-in */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-blue-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-3 bg-white/80 text-blue-600 font-medium">
                      OR CONTINUE WITH
                    </span>
                  </div>
                </div>

                <motion.button
                  onClick={handleGoogleAuth}
                  disabled={googleLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-3 py-3.5 px-4 bg-white border-2 border-blue-200 rounded-md font-semibold text-blue-700 hover:border-blue-300 hover:shadow-lg transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed shadow-sm mb-6"
                >
                  <FcGoogle size={20} />
                  {googleLoading ? "Signing in..." : "Continue with Google"}
                </motion.button>

                {/* Switch Mode */}
                <motion.div 
                  className="text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <p className="text-blue-700">
                    {mode === "login" ? "New to Sunshine Academy? " : "Already have an account? "}
                    <button
                      onClick={handleSwitch}
                      className="font-bold text-yellow-500 hover:text-yellow-600 transition-colors underline"
                    >
                      {mode === "login" ? "Create account" : "Sign in"}
                    </button>
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-full max-w-xl hidden lg:block"
          >
            <div className="relative rounded-md overflow-hidden shadow-2xl">
              <img 
                src="https://img.freepik.com/free-vector/welcome-back-school-lettering-with-sharpener-pencils_1262-15673.jpg?_gl=1*1q6iklh*_gcl_au*OTA5NDk4NDAzLjE3NjE5NzY2MTI.*_ga*MTI5NzcwNDQxNC4xNzYxOTc2NjIy*_ga_QWX66025LC*czE3NjIwMzIzMDUkbzIkZzEkdDE3NjIwMzM1MzYkajU2JGwwJGgw" 
                alt="Sunshine Academy"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <AlertBox
        isOpen={alert.open}
        type={alert.type}
        title={alert.title}
        message={alert.message}
        onConfirm={() => {
          setAlert((prev) => ({ ...prev, open: false }));
          if (alert.onConfirmAction) alert.onConfirmAction();
        }}
      />
    </div>
  );
}