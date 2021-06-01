import React,{ useState, useEffect } from 'react'
import Resizer from "react-image-file-resizer";
import { useSelector,useDispatch } from "react-redux";
import {cloudinaryActions} from '../../redux/actions/cloudinary.action';
import { Badge } from "antd";
import Avatar from 'react-avatar';
const FileUpload = ({values,setValues}) => {
    const dispatch= useDispatch();
    console.log("this is values",values)
    const allUploadedCloudinary = useSelector((state)=>state.cloudinary.images.data)
    let allUploadedFiles = values.images;
    // console.log("this is fileupload",allUploadedFiles)
    const fileUploadAndResize = (e) => {
        // console.log(e.target.files);
        // resize
        let files = e.target.files; // 3
        if (files) {
          for (let i = 0; i < files.length; i++) {
            Resizer.imageFileResizer(
              files[i],
              720,
              720,
              "PNG",
              100,
              0,
              (uri) => {
                dispatch(cloudinaryActions.uploadimages({image:uri}))
              },
              "base64",
              720,
              720,
            );
          }
        }
        // send back to server to upload to cloudinary
        // set url to images[] in the parent component state - ProductCreate
      };
      const handleImageRemove = (public_id) =>{
        dispatch(cloudinaryActions.removeimages({public_id}))
        const { images } = values;
        let filteredImages = images.filter((item) => {
          return item.public_id !== public_id;
        });
        setValues({ ...values, images: filteredImages });
      }
    useEffect(()=>{
        if(allUploadedCloudinary&&allUploadedCloudinary.data){
            allUploadedFiles.push(allUploadedCloudinary.data);
            setValues({ ...values, images: allUploadedFiles });
        }
    },[allUploadedCloudinary])
    console.log(values)
    return (
        <>
        <div className="row">
          {values.images &&
            values.images.map((image) => (
              <Badge
                count="X"
                key={image.public_id}
                onClick={() => handleImageRemove(image.public_id)}
                style={{ cursor: "pointer" }}
              >
                <Avatar
                  src={image.url}
                  round={true}
                  size={100}
                  className="ml-3"
                />
              </Badge>
            ))}
        </div>
        <div className="row">
          <label className="btn btn-primary">
            Choose File
            <input
              type="file"
              multiple
              hidden
              accept="images/*"
              onChange={fileUploadAndResize}
            />
          </label>
        </div>
      </>

    )
}

export default FileUpload
