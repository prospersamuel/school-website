export const validateField = (field, value) => {
  switch (field) {
    case "Full Name":
      return value.length >= 2 ? "" : "Must be at least 2 characters";
    case "Email":
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        ? ""
        : "Invalid email address";
    case "Phone Number":
      return /^\+?\d{10,15}$/.test(value)
        ? ""
        : "Invalid phone number";
    case "Password":
      if (!value) return { error: "Password is required", strength: 0, requirements: [] };
      
      const requirements = [
        { met: value.length >= 8, text: "At least 8 characters" },
        { met: /[a-z]/.test(value), text: "Lowercase letter (a-z)" },
        { met: /[A-Z]/.test(value), text: "Uppercase letter (A-Z)" },
        { met: /\d/.test(value), text: "Number (0-9)" },
        { met: /[^A-Za-z0-9]/.test(value), text: "Special character (!@#$% etc.)" }
      ];
      
      const strength = requirements.filter(req => req.met).length;
      const unmetRequirements = requirements.filter(req => !req.met).map(req => req.text);
      
      return {
        error: strength === 5 ? "" : "Password must meet all requirements",
        strength: strength,
        requirements: requirements
      };
    default:
      return "";
  }
};

export function PasswordStrengthIndicator({ strength, requirements, minStrength = 5 }) {
  const strengthLabels = [
    { text: "Very Weak", color: "bg-red-500", textColor: "text-red-500" },
    { text: "Weak", color: "bg-red-400", textColor: "text-red-400" },
    { text: "Fair", color: "bg-yellow-500", textColor: "text-yellow-500" },
    { text: "Good", color: "bg-blue-500", textColor: "text-blue-500" },
    { text: "Strong", color: "bg-green-500", textColor: "text-green-500" },
    { text: "Very Strong", color: "bg-green-600", textColor: "text-green-600" }
  ];

  const currentStrength = strengthLabels[strength] || strengthLabels[0];

  return (
    <div className="mt-3 space-y-2">

      {/* Requirements List */}
      {requirements && (
        <div className="space-y-1 mt-2">
          <p className="text-xs font-medium text-slate-600 mb-1">
            Requirements:
          </p>
          {requirements.map((requirement, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${
                requirement.met ? 'bg-green-500' : 'bg-gray-300'
              }`} />
              <span className={`text-xs ${
                requirement.met 
                  ? 'text-green-600' 
                  : 'text-slate-500'
              }`}>
                {requirement.text}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}