import React from 'react'
import { Link } from "react-router-dom";
import { Menu } from "antd";
import { AppstoreOutlined} from '@ant-design/icons';
import {
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from '@ant-design/icons';

const UserSideBar = () => {
    return (
      <>
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="light"
          // inlineCollapsed={this.state.collapsed}
        >
          <Menu.Item key="1" icon={<PieChartOutlined />}>
          <Link to="/user/history">
              History
            </Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
          <Link to="/user/wishlist">
              Wishlist
            </Link>
          </Menu.Item>
        </Menu>
        {/* <nav>
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link to="/user/history" className="nav-link">
              History
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/user/wishlist" className="nav-link">
              Wishlist
            </Link>
          </li>
        </ul>
      </nav> */}
       </>
    )
}

export default UserSideBar
