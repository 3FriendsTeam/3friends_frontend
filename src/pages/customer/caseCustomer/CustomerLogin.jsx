import logo from "../../../assets/client/logo.png";
import google from "../../../assets/client/google.png";
import axios from "axios";
import { signInWithGoogle } from "../../../config/firebaseService";
import { signInWithEmailAndPassword } from "firebase/auth";
const CustomerLogin = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });


    const saveAccount =async (
        {
            uid,
            customerName,
            gender,
            email,
            phoneNumber,
            birthDate,
            isVerified = true,
        }
    ) => {
        try{
            console.log(uid,customerName,gender,email,phoneNumber,birthDate,isVerified);
            const response = await axios.post('http://localhost:3001/api/register', {
            uid,
            customerName,
            gender,
            email,
            phoneNumber,
            birthDate,
            isVerified,
            })
            if(response.status === 200){
                console.log("save accounting success");
                return true;
            }
        }catch(error){
            console.log("error save accounting",error.message);
            return false;
        }

    }
    const checkEmail = async ({ email }) => {
        try {
            const response = await axios.get(`http://localhost:3001/api/check-email?email=${email}`);
            console.log("res: ", response);
    
            if (response.data.success) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error("error check mail: ", error.message);
            return false;
        }
    };
    
    const handleGoogleLogin = async () => {
        try {
            const userCredential = await signInWithGoogle();
            console.log('userCredential: ', userCredential.displayName, userCredential.email, userCredential.emailVerified, userCredential.uid);
            if (userCredential) {
                const user = userCredential;
                console.log('thong tin user: ', user.displayName, user.email, user.emailVerified, user.uid);
                if (user) {
                    const checkCreatedEmail = await checkEmail({ email: user.email });
                    if (!checkCreatedEmail) {
                        try {
                            await saveAccount({
                                uid: user.uid,
                                customerName: user.displayName,
                                gender: user.gender || 'Unknown',
                                email: user.email,
                                phoneNumber: user.phoneNumber || 'Unknown',
                                birthDate: user.birthDate || null,
                                isVerified: true,
                            });
                            localStorage.setItem("token", await user.getIdToken());
                            alert('Đăng nhập thành công!');
                        } catch (error) {
                            console.error('Error saving account: ', error);
                            alert('Đã xảy ra lỗi khi lưu tài khoản.');
                        }
                    } else {
                        localStorage.setItem("token", await user.getIdToken());
                        alert('Đăng nhập thành công!');
                    }
                }
            }
        } catch (error) {
            console.error('Error signing in with Google:', error);
            alert('Đã xảy ra lỗi khi đăng nhập.');
        }
    }

    

    const handleSubmitLogin = async (e) => {
        e.preventDefault();
        if (!formData?.email || !formData?.password) {
            alert.error("Vui lòng nhập đầy đủ thông tin.");
            return;
          }
        const { email, password } = formData;

        try {
            const userCredential = await signInWithEmailAndPassword(email, password);
        } catch (error) {
            console.error('Error logging in:', error);
            alert('Đã xảy ra lỗi khi đăng nhận này.');
        }
        }




    return (
        <div className="bg-gray-100 h-screen flex items-center justify-center">
            <div className="bg-white shadow-lg rounded-lg flex max-w-4xl w-full">
                <div className="w-1/2 p-8 flex flex-col justify-center ">
                    <a href="#" className="text-blue-500 text-sm mb-4">← Trở về trang chủ</a>
                    <img src={logo} alt="Illustration" className="w-full bg-red-500 rounded-lg" />
                </div>

               
                <div className="w-1/2 bg-gray-50 p-8 flex flex-col justify-center">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-6">ĐĂNG NHẬP NGAY</h2>
                    <form>
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-gray-600 text-sm mb-2">e-mail</label>
                            <input type="text" id="username" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Nhập e-mail"/>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-600 text-sm mb-2">Mật khẩu</label>
                            <input type="password" id="password" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Nhập mật khẩu"/>
                        </div>
                        <div className="flex justify-between items-center mb-6">
                            <a href="#" className="text-blue-500 text-sm">Quên mật khẩu?</a>
                        </div>
                        <button className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition">Đăng nhập</button>
                    </form>
                    <div className="flex items-center my-6">
                        <div className="border-t border-gray-300 flex-grow"></div>
                        <span className="mx-3 text-gray-400">Hoặc</span>
                        <div className="border-t border-gray-300 flex-grow"></div>
                    </div>
                    <button onClick={handleGoogleLogin} className="w-full py-3 rounded-lg hover:bg-red-600 hover:text-white transition flex items-center justify-center">
                        <span className="text-lg mr-2"><img className="w-6" src={google} alt="google" /></span> Đăng nhập với tài khoản Google
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CustomerLogin;