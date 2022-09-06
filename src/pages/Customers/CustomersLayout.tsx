import { useContext, useEffect } from "react";
import { SearchContext } from "../../contexts/searchContext";
import { UserContext } from "../../contexts/usersContext";
import userApi from "../../services/userApi";
import Customers from "./Customers";

const CustomersLayout = () => {
    const usersContext = useContext(UserContext);
    const searchContext = useContext(SearchContext);

    useEffect(() => {
        userApi.getAllUsers().then((data) => {
            usersContext?.setUserList(data)
        });
    }, []);

    const filterData = usersContext?.userList.filter((val: any) => {
        if(searchContext?.searchText === '') {
            return val;
        } 
        return val.firstName.toLowerCase().includes(searchContext?.searchText.toLowerCase());
    })
    
    return (
        <div>
            {usersContext?.userList.length !== 0 && <Customers data={filterData} />}
        </div>
    )
}

export default CustomersLayout

// ***Lưu ý: kiểm tra dataUsers truyền từ component cha xem có data không thì mới render component con. Nếu không phải có dấu ? nơi map render của component con
// Ban đầu thì page sẽ render trước nên state sẽ là rỗng thôi, nên phải check như vậy để render đúng