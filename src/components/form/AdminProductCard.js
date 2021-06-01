import React from 'react'
import { Card } from "antd";
import {Button} from 'react-bootstrap';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import sneaker from '../../img/defaultimage.jpeg'
import { Link } from "react-router-dom";
const AdminProductCard = ({product,handleRemove}) => {
    const { title, description, images, _id } = product;
    return (
        <div>
    <Card
      cover={
        <img
          src={images && images.length ? images[0].url : sneaker}
          style={{ height: "200px", objectFit: "cover" }}
          className="p-1"
        />
      }
      actions={[
        <Link to={`/admin/product/${_id}`}>
          <EditOutlined className="text-warning" />
        </Link>,
        <DeleteOutlined
          onClick={() => handleRemove(_id)}
          className="text-danger"
        />,
      ]}
    >
      <Card.Meta
        title={title}
        description={`${description && description.substring(0, 40)}...`}
      />
    </Card>
    {/* <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={images && images.length ? images[0].url : sneaker } />
        <Card.Body>
        <Card.Title>{title} </Card.Title>
        <Card.Text>
        {`${description && description.substring(0, 40)}...`}
        </Card.Text>
        <Link to={`/admin/product/${_id}`} >
        <Button variant="primary">Edit</Button>
        </Link>

        <Button variant="danger" onClick={() => handleRemove(_id)}>Delete</Button>

        </Card.Body>
    </Card> */}
        </div>
    )
}

export default AdminProductCard
