// ForgotPassword.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../../../config/firebaseService";
import { path } from "../../../utils/constant";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import icons from "../../../utils/icons";
const ForgotPassword = () => {
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  const initialValues = { email: "" };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Email không hợp lệ")
      .required("Vui lòng nhập email của bạn"),
  });

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    setServerError("");
    try {
      await resetPassword(values.email);
      setStatus({ success: "Email đặt lại mật khẩu đã được gửi!" });
      setTimeout(() => {
        navigate(path.CUSTOMERLOGIN);
      }, 2000);
    } catch {
      setServerError("Đã có lỗi xảy ra. Vui lòng thử lại sau.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-red-100 via-white to-red-50 px-4">
  <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
    <h2 className="text-center text-3xl font-bold text-gray-800 mb-6">
      Quên mật khẩu
    </h2>
    <p className="text-center text-gray-600 mb-6">
      Nhập email của bạn để khôi phục mật khẩu.
    </p>
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, status }) => (
        <Form className="space-y-4">
          {status && status.success && (
            <div
              className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md flex items-center space-x-2 mb-4"
              role="alert"
            >
              <icons.BiCheckCircle className="text-green-500 text-xl" />
              <span>{status.success}</span>
            </div>
          )}
          {serverError && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md flex items-center space-x-2 mb-4"
              role="alert"
            >
              <icons.BiErrorCircle className="text-red-500 text-xl" />
              <span>{serverError}</span>
            </div>
          )}

          <div className="relative">
            <Field
              type="email"
              name="email"
              placeholder="Nhập email của bạn"
              className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent"
              aria-label="Email"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-sm mt-2"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-red-400 disabled:opacity-50"
          >
            {isSubmitting ? "Đang gửi..." : "Tiếp tục"}
          </button>
        </Form>
      )}
    </Formik>
  </div>
</div>

  );
};

export default ForgotPassword;
