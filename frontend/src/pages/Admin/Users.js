import { Button, Table, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { SetLoader } from '../../redux/loaderslice';
import moment from "moment";
import { GetAllUsers, UpdateUserStatus } from '../../apicalls/users';



const Users = () => {

  
    const [users, setUsers] = useState([]);
 
 
  const dispatch = useDispatch();


  // get data of users //
  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetAllUsers(null);
      dispatch(SetLoader(false));
      if (response.success) {
        setUsers(response.data);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  const onStatusUpdate = async (id, status) => {
    try {
      dispatch(SetLoader(true));
      const response = await UpdateUserStatus(id, status);
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
        title: "Name",
        dataIndex: "name",
      },
      {
        title: "Email",
        dataIndex: "email",
      },
      {
        title: "Role",
        dataIndex: "role",
        render: (text, record) => {
          return record.role.toUpperCase();
        }
      },
      {
        title: "Created At",
        dataIndex: "createdAt",
        render: (text, record) =>
          moment(record.createdAt).format("DD-MM-YYYY hh:mm A"),
      },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record) => {
        return record.status.toUpperCase();
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        const { status, _id } = record;
        return (
          <div className="flex gap-3">
            {status === "active" && (
              <Button 
                className="underline cursor-pointer"
                onClick={() => onStatusUpdate(_id, "blocked")}
                style={{ backgroundColor: 'black', color: 'white' }}
              >
                Block
              </Button>
            )}
            {status === "blocked" && (
              <Button
                className="underline cursor-pointer"
                onClick={() => onStatusUpdate(_id, "active")}
                style={{ backgroundColor: 'grey', color: 'white' }}
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
     
      <Table columns={columns} dataSource={users} />

      
    </div>
  )
}

export default Users

