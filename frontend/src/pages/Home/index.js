import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetProducts } from "../../apicalls/products";
import { SetLoader } from "../../redux/loaderslice";
import { AutoComplete, message } from "antd";
import Divider from "../../components/Divider";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import Filter from "./Filter";



const Home = () => {

  const [suggestions, setSuggestions] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [showFilters, setShowFilters] = React.useState(true)
  const [products, setProducts] = React.useState([]);
  const [filters, setFilters] = React.useState({
    status: "approved",
    category: [],
    age: [],
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users)


  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetProducts(filters);
      dispatch(SetLoader(false));
      if (response.success) {
        setProducts(response.data);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  const handleSearch = (value) => {
    setSearchQuery(value);
    // Filter products based on the search query if it's not empty
    if (value.trim() !== "") {
      const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredProducts);
    } else {
      // Clear suggestions when the search query is empty
      setSuggestions([]);
    }
  };

  const navigateToProduct = (productId) => {
    navigate(`/product/${productId}`);
  };




  useEffect(() => {
    getData();
  }, [filters]);

  return (

    <div className="flex gap-5">

      {/* filters section starts  */}

      {showFilters && (<Filter showFilters={showFilters} setShowFilters={setShowFilters} filters={filters} setFilters={setFilters} />)}

      {/* filter section ends  */}

      <div className="flex flex-col gap-7 w-full">

        <div className="flex gap-5 items-center">
          {!showFilters && (
            <i
              className="ri-equalizer-line text-xl cursor-pointer"
              onClick={() => setShowFilters(!showFilters)}
            ></i>
          )}

          <div style={{ position: "relative", flex: 1 }}>
            <input
              type="text"
              style={{ width: "100%" }}
              placeholder="Search Products here..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <ul className="suggestions-list">
              {suggestions.map((product) => (
                <li
                  key={product._id}
                  onClick={() => navigateToProduct(product._id)}
                >
                  {product.name}
                </li>
              ))}
            </ul>
          </div>

        </div>


        <div className={`grid gap-5 ${showFilters ? "grid-cols-3" : "grid-cols-4"}`}>
          {products?.map((product) => (
            <div
              className="border border-gray-300 rounded border-solid flex flex-col gap-2 pb-2 cursor-pointer grid-item"
              key={product._id}
              onClick={() => navigate(`/product/${product._id}`)}
            >
              <img
                src={product.images[0]}
                className="w-full h-60 rounded-md p-0"
                alt=""
              />

              <div className="px-2 flex flex-col">
                <h1 className="text-lg font-semibold">{product.name}</h1>
                <p className="text-sm">
                  {product.age}{" "}
                  {product.age === 1 ? " year" : " years"} old
                </p>
                <Divider />
                <span className="text-xl font-semibold text-green-700">
                  $ {product.price}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}

export default Home




