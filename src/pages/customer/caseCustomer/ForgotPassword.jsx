// ForgotPassword.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../../../config/firebaseService";
import { path } from "../../../utils/constant";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

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
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-center text-2xl font-bold mb-6">Quên mật khẩu</h2>
        <p className="text-center text-gray-600 mb-4">
          Nhập email của bạn để khôi phục mật khẩu.
        </p>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, status }) => (
            <Form>
              {status && status.success && (
                <div
                  className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
                  role="alert"
                >
                  <span className="block sm:inline">{status.success}</span>
                </div>
              )}
              {serverError && (
                <div
                  className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
                  role="alert"
                >
                  <span className="block sm:inline">{serverError}</span>
                </div>
              )}
              <div className="mb-4">
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  aria-label="Email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
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
