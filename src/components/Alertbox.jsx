import { motion, AnimatePresence } from "framer-motion";
import {
  FiCheckCircle,
  FiXCircle,
  FiAlertTriangle,
  FiInfo,
} from "react-icons/fi";

const icons = {
  success: <FiCheckCircle className="text-green-500" size={56} />,
  error: <FiXCircle className="text-red-500" size={56} />,
  warning: <FiAlertTriangle className="text-yellow-500" size={56} />,
  info: <FiInfo className="text-blue-500" size={56} />,
};

const buttonColors = {
  success: "bg-green-500 hover:bg-green-600",
  error: "bg-red-500 hover:bg-red-600",
  warning: "bg-yellow-500 hover:bg-yellow-600 text-gray-800",
  info: "bg-blue-500 hover:bg-blue-600",
};

export default function AlertBox({
  isOpen,
  type = "info",
  title = "Notice",
  message = "This is a custom alert",
  onConfirm,
  onCancel,
  confirmText = "OK",
  cancelText = "Cancel",
  disabled = false,
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-blue-900/30 backdrop-blur-sm p-4">
          <motion.div className="bg-white rounded-md shadow-2xl max-w-sm w-full overflow-hidden border-2 border-blue-100">
            {/* Header with gradient */}
            <div
              className={`p-6 text-center ${
                type === "success"
                  ? "bg-green-50"
                  : type === "error"
                  ? "bg-red-50"
                  : type === "warning"
                  ? "bg-yellow-50"
                  : "bg-blue-50"
              }`}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: "spring" }}
                className="flex justify-center mb-4"
              >
                {icons[type]}
              </motion.div>
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className={`text-xl font-bold ${
                  type === "success"
                    ? "text-green-800"
                    : type === "error"
                    ? "text-red-800"
                    : type === "warning"
                    ? "text-yellow-800"
                    : "text-blue-800"
                }`}
              >
                {title}
              </motion.h3>
            </div>

            {/* Message */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="p-6 text-center"
            >
              <p className="text-blue-700 leading-relaxed">{message}</p>
            </motion.div>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex gap-3 p-6 pt-4"
            >
              {onCancel && (
                <button
                  onClick={onCancel}
                  className="flex-1 py-3 px-4 bg-blue-100 text-blue-700 rounded-md font-semibold hover:bg-blue-200 transition-all duration-200 border-2 border-transparent hover:border-blue-300"
                >
                  {cancelText}
                </button>
              )}
              <button
                onClick={onConfirm}
                disabled={disabled}
                className={`flex-1 py-3 px-4 text-white rounded-md font-semibold transition-all duration-200 ${
                  buttonColors[type]
                } ${
                  disabled
                    ? "opacity-50 cursor-not-allowed"
                    : "shadow-lg hover:shadow-xl transform"
                }`}
              >
                {confirmText}
              </button>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
