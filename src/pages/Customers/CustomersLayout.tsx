import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/usersContext";
import userApi from "../../services/userApi";
import Customers from "./Customers";

const CustomersLayout = () => {
    const userContext = useContext(UserContext)

    useEffect(() => {
        userApi.getAllUsers().then((data) => {
            userContext?.setUserList(data)
        });
    }, []);
    
    return (
        <div>
            {userContext?.userList.length !== 0 && <Customers data={userContext?.userList} />}
        </div>
    )
}

export default CustomersLayout

// ***Lưu ý: kiểm tra dataUsers truyền từ component cha xem có data không thì mới render component con. Nếu không phải có dấu ? nơi map render của component con
// Ban đầu thì page sẽ render trước nên state sẽ là rỗng thôi, nên phải check như vậy để render đúng