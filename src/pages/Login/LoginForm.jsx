import { FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import { PasswordStrengthIndicator } from "../../services/Validate";
import {motion} from 'framer-motion'
import { CiWarning } from "react-icons/ci";

export default function LoginForm({
    handleSubmit,
    handleInputChange,
    inputs,
    errors,
    passwordVisible,
    setPasswordVisible,
    handleResetPassword,
    setInputs,
    loading,
    mode
}) {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {mode === "login" ? (
        <>
          <div className="space-y-4">
            <FloatingInput 
              type="email"
              name="Email"
              value={inputs["Email"] || ""}
              onChange={handleInputChange}
              error={errors["Email"]}
              autoComplete="email"
            />
            
            <div className="relative">
              <FloatingInput 
                type={passwordVisible ? "text" : "password"}
                name="Password"
                value={inputs["Password"] || ""}
                onChange={handleInputChange}
                error={errors["Password"]}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute right-3 top-3 text-blue-500 hover:text-yellow-500 transition-colors"
              >
                {passwordVisible ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>
          </div>
          
          <div className="flex justify-end -mt-2">
            <button
              type="button"
              onClick={handleResetPassword}
              className="text-sm text-blue-600 hover:text-yellow-500 transition-colors font-medium"
            >
              Forgot Password?
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="space-y-4">
            <FloatingInput 
              type="text"
              name="Full Name"
              value={inputs["Full Name"] || ""}
              onChange={handleInputChange}
              error={errors["Full Name"]}
              autoComplete="name"
              placeholder="John Doe"
            />
            
              <FloatingInput 
                type="email"
                name="Email"
                value={inputs["Email"] || ""}
                onChange={handleInputChange}
                error={errors["Email"]}
                autoComplete="email"
                placeholder="johndoes12@example.com"
              />
              
              <FloatingInput 
                type="tel"
                name="Phone Number"
                value={inputs["Phone Number"] || ""}
                onChange={handleInputChange}
                error={errors["Phone Number"]}
                autoComplete="tel"
                placeholder="08011223344"
              />
            
            <div className="relative">
              <FloatingInput 
                type={passwordVisible ? "text" : "password"}
                name="Password"
                value={inputs["Password"] || ""}
                onChange={handleInputChange}
                error={errors["Password"]}
                autoComplete="new-password"
                placeholder="Create password"
              />
              <button
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute right-3 top-4 text-blue-500 hover:text-yellow-500 transition-colors"
              >
                {passwordVisible ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
              </button>
            </div>
          </div>

          {/* Password Strength Indicator */}
          {mode === "signup" && inputs["Password"] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3 }}
            >
              <PasswordStrengthIndicator 
                strength={inputs.passwordStrength} 
                requirements={inputs.passwordRequirements}
                minStrength={5}
              />
            </motion.div>
          )}
        </>
      )}

      <motion.button
        disabled={loading || (mode === "signup" && inputs.passwordStrength < 5)}
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-md font-bold shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
      >
        {loading ? (
          <span className="inline-flex items-center justify-center gap-2">
            <FaSpinner size={20} className="animate-iteration-count-infinite animate-spin-clockwise"/>
            {mode === "login" ? "Signing in..." : "Creating account..."}
          </span>
        ) : mode === "login" ? (
          "Sign In"
        ) : (
          "Create Account"
        )}
      </motion.button>
    </form>
  );
}

function FloatingInput({ type, name, value, onChange, error, autoComplete, placeholder, mode, ...props }) {
  const inputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (value) {
      setIsFocused(true);
    }
  }, [value]);

  const handleChange = (e) => {
    const customEvent = {
      target: {
        placeholder: name,
        value: e.target.value
      }
    };
    onChange(customEvent);
  };

  return (
    <motion.div 
      className="relative"
      whileFocus={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 400 }}
    >
      <div className="relative">
        <input
          ref={inputRef}
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => !value && setIsFocused(false)}
          autoComplete={autoComplete}
          className={`w-full px-4 py-3 bg-blue-50 border-2 rounded-md text-blue-900 placeholder-blue-300 focus:outline-none transition-all duration-200 ${
            error 
              ? "border-yellow-500 focus:border-yellow-500" 
              : "border-blue-200 focus:border-blue-500 focus:bg-white"
          } ${isFocused || value ? 'pt-5 pb-1' : ''}`}
          placeholder={isFocused ? placeholder : ''}
          {...props}
        />
        <label
          htmlFor={name}
          className={`absolute left-4 transition-all duration-200 pointer-events-none ${
            isFocused || value
              ? "top-2 text-xs font-semibold text-blue-600"
              : "top-3.5 text-blue-400"
          }`}
          onClick={() => inputRef.current.focus()}
        >
          {name}
          {error && <span className="text-yellow-500 ml-1">*</span>}
        </label>
      </div>
      {error && (
        <motion.p 
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-yellow-500 text-xs mt-1 ml-1 font-medium flex items-center gap-1"
        >
          <CiWarning/> {error}
        </motion.p>
      )}
    </motion.div>
  );
}