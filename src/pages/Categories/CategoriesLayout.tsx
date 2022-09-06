import { useContext, useEffect } from "react";
import { CategoryContext } from "../../contexts/categoriesContext";
import { SearchContext } from "../../contexts/searchContext";
import categoryApi from "../../services/categoryApi";
import Categories from "./Categories";

const CategoryLayout = () => {
    const categoriesContext = useContext(CategoryContext);
    const searchContext = useContext(SearchContext);

    useEffect(() => {
        categoryApi.getAllCategories().then((data) => {
            categoriesContext?.setCategoryList(data)
        });
    }, []);

    const filterData = categoriesContext?.categoryList.filter((val: any) => {
        if(searchContext?.searchText === '') {
            return val;
        } 
        return val.name.toLowerCase().includes(searchContext?.searchText.toLowerCase());
    })
    
    return (
        <div>
            {categoriesContext?.categoryList.length !== 0 && <Categories data={filterData} />}
        </div>
    )
}

export default CategoryLayout

// ***Lưu ý: kiểm tra dataUsers truyền từ component cha xem có data không thì mới render component con. Nếu không phải có dấu ? nơi map render của component con
// Ban đầu thì page sẽ render trước nên state sẽ là rỗng thôi, nên phải check như vậy để render đúng