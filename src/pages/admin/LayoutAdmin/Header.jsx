import logo from "../../../assets/admin/logo.png";

const Header = () => {
    const employee = JSON.parse(localStorage.getItem('employee'));
    const PositonName = localStorage.getItem('Position');
    const NameUser = employee.data.FullName?employee.data.FullName:"admin";

    return (
        <header className="bg-white shadow-md p-3 z-50">
            <div className="w-full flex items-center justify-between">
                <div className="flex items-center">
                    <img src={logo} alt="Logo" className="h-12 w-12 object-contain mr-3" />
                    <h3 className="font-bold text-xl text-gray-800">{PositonName}</h3>
                </div>
                <div className="flex items-center">
                    {NameUser && <h2 className="ml-2 text-base font-semibold text-gray-500"><b>Xin chào, {NameUser}</b></h2>}
                </div>
            </div>
        </header>
    );
}

export default Header;

