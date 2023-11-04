import { Button, Table, message } from 'antd'
import React, { useEffect, useState } from 'react'
import ProductForm from './ProductForm';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteProduct, GetProducts } from '../../../apicalls/products';
import { SetLoader } from '../../../redux/loaderslice';
import moment from "moment";
import Bids from './Bids';


const Products = () => {

  const [showBids, setShowBids] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [showProductForm, setShowProductForm] = useState(false);
  const { user } = useSelector((state) => state.users)
  const dispatch = useDispatch();


  // get products //
  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetProducts({ seller: user._id });
      dispatch(SetLoader(false));
      if (response.success) {
        setProducts(response.data);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "Product",
      dataIndex: "image",
      render: (text, record) => {
        return (
          <img
            src={record?.images?.length > 0 ? record.images[0] : ""}
            alt=""
            className="w-20 h-20 object-cover rounded-md"
          />
        );
      },
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Age",
      dataIndex: "age",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Added On",
      dataIndex: "createdAt",
      render: (text, record) =>
        moment(record.createdAt).format("DD-MM-YYYY hh:mm A"),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        return (
          <div className="flex gap-5 items-center">
            <i
              className="ri-delete-bin-line"
              onClick={() => {
                DeleteProduct(record._id);
                message.success("Product deleted successfully")
                window.location.reload();
              }}
            ></i>
            <i
              className="ri-pencil-line"
              onClick={() => {
                setSelectedProduct(record);
                setShowProductForm(true);
              }}
            ></i>


            <span
              className="underline cursor-pointer"
              onClick={() => {
                setSelectedProduct(record);
                setShowBids(true);
              }}
            >
              Show Bids
            </span>


          </div>
        );
      },
    },

  ];

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className='flex justify-end mb-5'>
        <Button type='primary'
          onClick={() => {
            setSelectedProduct(null);
            setShowProductForm(true)
          }}
        >
          Add Products
        </Button>
      </div>
      <Table columns={columns} dataSource={products} />

      {showProductForm &&
        <ProductForm
          showProductForm={showProductForm}
          setShowProductForm={setShowProductForm}
          selectedProduct={selectedProduct}
        />}


      {showBids && (
        <Bids
          showBidsModal={showBids}
          setShowBidsModal={setShowBids}
          selectedProduct={selectedProduct}
        />
      )}
    </div>
  )
}

export default Products

