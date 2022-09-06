import { useContext, useEffect } from "react";
import { ProductContext } from "../../contexts/productsContext";
import { SearchContext } from "../../contexts/searchContext";
import productApi from "../../services/productApi";
import Products from "./Products";

const ProductLayout = () => {
    const productsContext = useContext(ProductContext);
    const searchContext = useContext(SearchContext);

    useEffect(() => {
        productApi.getAllProducts().then((data) => {
            productsContext?.setProductList(data)
        });
    }, []);

    const filterData = productsContext?.productList.filter((val: any) => {
        if(searchContext?.searchText === '') {
            return val;
        } 
        return val.name.toLowerCase().includes(searchContext?.searchText.toLowerCase());
    })
    
    return (
        <div>
            {productsContext?.productList.length !== 0 && <Products data={filterData} />}
        </div>
    )
}

export default ProductLayout

// ***Lưu ý: kiểm tra dataUsers truyền từ component cha xem có data không thì mới render component con. Nếu không phải có dấu ? nơi map render của component con
// Ban đầu thì page sẽ render trước nên state sẽ là rỗng thôi, nên phải check như vậy để render đúng