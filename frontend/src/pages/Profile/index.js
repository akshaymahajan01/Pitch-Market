import React from 'react'
import { Tabs } from 'antd'
import Products from './Products/index'
import User from './User'



const Profile = () => {
    return (
        <div>
            <Tabs defaultActiveKey='1'>
                <Tabs.TabPane tab="Products" key="1">
                    <Products/>
                </Tabs.TabPane>
                <Tabs.TabPane tab="User" key="2">
                     <User/>
                </Tabs.TabPane>
            </Tabs>
        </div>
    )
}

export default Profile