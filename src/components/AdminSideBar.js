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



const AdminSideBar = () => {

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
            <Link to="/admin/dashboard">
            Dashboard
            </Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            <Link to="/admin/product">
            Product
            </Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<ContainerOutlined />}>
            <Link to="/admin/products">
            Products
            </Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<MailOutlined />}>
            <Link to="/admin/category">
            Category
            </Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<AppstoreOutlined />}>
            <Link to="/admin/coupon">
            Coupon
            </Link>
          </Menu.Item>
        </Menu>
        
        {/* <Menu mode="inline" openKeys={openKeys} onOpenChange={onOpenChange} style={{ width: 256 }}>
      <SubMenu key="sub1" icon={<AppstoreOutlined />} title="Menu">
        <Menu.Item key="1">
        <Link to="/admin/dashboard" className="nav-link">
          Dashboard
        </Link>
        </Menu.Item>
        <Menu.Item key="2">
        <Link to="/admin/product" className="nav-link">
          Product
        </Link>
        </Menu.Item>
        <Menu.Item key="3">
        <Link to="/admin/products" className="nav-link">
          Products
        </Link>
        </Menu.Item>
        <Menu.Item key="4">
        <Link to="/admin/category" className="nav-link">
          Category
        </Link>
        </Menu.Item>
        <Menu.Item key="5">
        <Link to="/admin/coupon" className="nav-link">
          Coupon
        </Link>
        </Menu.Item>
      </SubMenu>
    </Menu> */}
    </>
    )
}

export default AdminSideBar
