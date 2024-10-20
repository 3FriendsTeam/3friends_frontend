import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    try {
        const result = await signInWithPopup(auth, provider);
        
        // Thông tin người dùng sau khi đăng nhập thành công
        const user = result.user;
        console.log("User logged in with Google: ", user);

        // Lấy thêm các thông tin từ Google nếu cần
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        // Tiếp tục xử lý theo logic của bạn (lưu thông tin người dùng, chuyển hướng, ...)
        console.log("Access Token: ", token);
    } catch (error) {
        // Xử lý lỗi khi đăng nhập thất bại
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error logging in with Google: ", errorCode, errorMessage);

        if (errorCode === 'auth/popup-closed-by-user') {
            alert('Popup đăng nhập đã bị đóng trước khi hoàn tất.');
        } else {
            alert('Đăng nhập bằng Google thất bại, vui lòng thử lại sau.');
        }
    }
};

export default signInWithGoogle;