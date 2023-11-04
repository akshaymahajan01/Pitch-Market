import { Card } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'



const User = () => {

    const { user } = useSelector((state) => state.users)

  return (
<div className="flex">
      <Card title="User Details" style={{ width: 300 , backgroundColor: '#E6E6FA'}}>
        <p className="mb-2">
          <strong className="font-semibold">Name:</strong> {user.name}
        </p>
        <p className="mb-2">
          <strong className="font-semibold">Email:</strong> {user.email}
        </p>
        <p className="mb-2">
          <strong className="font-semibold">Created On:</strong> {user.createdAt}
        </p>
      </Card>
    </div>
  )
}

export default User