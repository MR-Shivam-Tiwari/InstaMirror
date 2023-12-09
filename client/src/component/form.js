import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import "./css/form.css";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import * as Yup from "yup";

const Addpost = ({ setOpen, name }) => {
  const [formData, setFormData] = useState({
    description: "",
    author: "",
    location: "",
    image: null,
  });
  const [validationErrors, setValidationErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      image: file,
    });
  };

  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validate the form data using the Yup schema
      await validationSchema.validate(formData, { abortEarly: false });

      const { description, author, location, image } = formData;

      const formDataToSend = new FormData();
      formDataToSend.append("image", image);
      formDataToSend.append("author", author);
      formDataToSend.append("location", location);
      formDataToSend.append("description", description);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const res = await axios.post(
        "https://instamirror-back.onrender.com/post",
        formDataToSend,
        config
      );

      if (res.data.status === 401 || !res.data) {
        console.log("error");
      } else {
        nav(`/postview`);
      }
    } catch (error) {
      // Handle validation errors
      if (error.name === "ValidationError") {
        // Yup validation error
        const validationErrors = {};
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
        // Set validation errors in state
        setValidationErrors(validationErrors);
      } else {
        // Handle other errors
        console.error(error);
      }
    }
  };

  // Create a validation schema for your form fields
  const validationSchema = Yup.object().shape({
    description: Yup.string().required("Description is required"),
    author: Yup.string().required("Author is required"),
    location: Yup.string().required("Location is required"),
    image: Yup.mixed().required("Image is required"),
  });

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const styles = {
    width: '40%',
    marginTop: '10%',
  };

  if (width <= 768) {
    // Adjust styles for smaller screens
    styles.width = '100%';
    // Add more responsive styles here as needed
  }

  return (
    <>
      <div
        className=" rounded-3 d-flex align-items-center justify-content-center container  "
        style={styles}
      >
        <form
          fullWidth
          method="POST"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="card p-3 w-100 mb-3 rounded-4 bg-light"
          id="postForm" // Add an 'id' attribute to your form
        >
          <div className="fw-bold d-flex align-item-center fs-19 mt-2 mb-1 ">
            <CloudUploadIcon />
            &nbsp; Upload Your Image
          </div>
          <label htmlFor="image">Image</label>

          <Input
            type="file"
            id="image"
            name="image"
            // className="inputbox rounded-3"
            onChange={handleImageUpload}
            encType="multipart/form-data"
            form="postForm" // Use 'form' attribute to associate with the form
            style={{ border: "2px solid #999494" }}
          />
          <br />
          <div className="mb-3">
            <label htmlFor="author">Author</label>
            <Input
              id="author"
              name="author"
              placeholder="Author"
              onChange={handleInputChange}
              error={validationErrors.author}
            />
             {validationErrors.author && (
              <div className="text-danger">{validationErrors.author}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="author">Location</label>
            <Input
              id="location"
              name="location"
              placeholder="Location"
              onChange={handleInputChange}
              error={validationErrors.location}
            />
            {validationErrors.location && (
              <div className="text-danger">{validationErrors.location}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="description">Description</label>
            <Input
              id="description"
              name="description"
              placeholder="Description"
              onChange={handleInputChange}
              error={validationErrors.description}
            />
            {validationErrors.description && (
              <div className="text-danger">{validationErrors.description}</div>
            )}
          </div>

          <br />
          <Button
            fullWidth
            variant="outlined"
            className="mb-2"
            type="submit"
            onClick={() => setOpen(false)}
          >
            Post
          </Button>
        </form>
      </div>
    </>
  );
};

export default Addpost;
