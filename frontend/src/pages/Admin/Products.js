import { Button, Table, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {  GetProducts, UpdateProductStatus } from '../../apicalls/products';
import { SetLoader } from '../../redux/loaderslice';
import moment from "moment";



const Products = () => {

  
  const [products, setProducts] = useState([]);
 
 
  const dispatch = useDispatch();


  // get products //
  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetProducts(null);
      dispatch(SetLoader(false));
      if (response.success) {
        setProducts(response.data);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  const onStatusUpdate = async (id, status) => {
    try {
      dispatch(SetLoader(true));
      const response = await UpdateProductStatus(id, status);
      dispatch(SetLoader(false));
      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "Productimg",
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
      title: "product",
      dataIndex: "name",
    },
    {
        title: "Seller",
        dataIndex: "name",
        render: (text, record) => {
          return record.seller.name;
        },
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
      render: (text, record) => {
        return record.status.toUpperCase();
      },
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
          const { status, _id } = record;
          return (
            <div className="flex gap-3">
              {status === "pending" && (
                <Button type='primary'
                  className="underline cursor-pointer"
                  onClick={() => onStatusUpdate(_id, "approved")}
                >
                  Approve
                </Button>
              )}
              {status === "pending" && (
                <Button type='primary'
                  className="underline cursor-pointer"
                  onClick={() => onStatusUpdate(_id, "rejected")}
                  style={{ backgroundColor: 'red', color: 'white' }}
                >
                  Reject
                </Button>
              )}
              {status === "approved" && (
                <Button type='primary'
                  className="underline cursor-pointer"
                  onClick={() => onStatusUpdate(_id, "blocked")}
                  style={{ backgroundColor: 'black', color: 'white' }}
                >
                  Block
                </Button>
              )}
              {status === "blocked" && (
                <Button type='primary'
                  className="underline cursor-pointer"
                  onClick={() => onStatusUpdate(_id, "approved")}
                  style={{ backgroundColor: 'grey', color: 'black' }}
                >
                  Unblock
                </Button>
              )}
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
     
      <Table columns={columns} dataSource={products} />

      
    </div>
  )
}

export default Products

