import api from "../../apiService";

const uploadimages = (image) => async (dispatch) => {
    try {
        console.log(image)
      dispatch({ type: "UPLOADIMAGES_REQUEST_START", payload: null });
      const data = await api.post(`/cloudinary/uploadimages`,image);
      dispatch({
        type: "UPLOADIMAGES_REQUEST_SUCCESS",
        payload: { data: data },
      });
    } catch (error) {
      dispatch({ type: "UPLOADIMAGES_REQUEST_FAIL", payload: error.message });
    }
};

const removeimages = (id) => async (dispatch) => {
    try {
        console.log(id)
      dispatch({ type: "REMOVEIMAGES_REQUEST_START", payload: null });
      const data = await api.post(`/cloudinary/removeimages`,id);
      dispatch({
        type: "REMOVEIMAGES_REQUEST_SUCCESS",
      });
    } catch (error) {
      dispatch({ type: "REMOVEIMAGES_REQUEST_FAIL", payload: error.message });
    }
};


export const cloudinaryActions = {
    uploadimages,
    removeimages,
};