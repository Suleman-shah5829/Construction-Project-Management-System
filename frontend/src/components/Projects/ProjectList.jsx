import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteProjects, getAllProjects } from "../../services/projectService";
import ReactPaginate from "react-paginate"; // Import ReactPaginate
import {
  Spinner,
  Modal,
  Button,
  OverlayTrigger,
  Tooltip,
  Badge,
} from "react-bootstrap";
import Select from "react-select";
import { Search } from "@mui/icons-material";
import { AddCircle, Visibility, Delete, Edit, Add } from "@mui/icons-material";
import { useLocation } from "react-router-dom"; // Import useLocation
import { Alert } from "react-bootstrap"; // Import Alert for success message
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // Import success icon from Material UI
const ProjectList = () => {
  const customSelectStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "rgba(255, 255, 255, 0.1)", // Transparent background like other fields
      color: "white",
      borderRadius: "15px", // Rounded corners
      // border: "1px solid rgba(255, 255, 255, 0.4)", // Light white border
      border: "none",
      boxShadow: state.isFocused
        ? "0 0 8px rgba(255, 255, 255, 0.5); "
        : "none", // White glow on focus
      transition: "all 0.3s ease-in-out",
      backdropFilter: "blur(5px)", // Optional glass-like effect
      padding: "5px", // Padding to match other inputs
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "rgba(255, 255, 255, 0.6)", // Light white placeholder like other fields
      fontStyle: "italic", // Italic placeholder styling
      fontSize: "16px", // Same size as other inputs
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "white", // Selected text color white
    }),
    input: (provided) => ({
      ...provided,
      color: "white", // Input text color white
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "rgba(255, 255, 255, 0.9)", // Transparent dropdown menu background
      backdropFilter: "blur(50px)", // Optional glass-like effect
      borderRadius: "10px", // Rounded corners for the dropdown
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused
        ? "rgba(41, 49, 255, 0.9)"
        : "transparent", // Light background on hover
      color: state.isFocused ? "white" : "#000", // White text on hover, black otherwise
      padding: "10px", // Option padding for better readability
      borderRadius: "5px", // Rounded corners for options
    }),
  };

  const [project, setProject] = useState([]);
  const [projectOption, setProjectOption] = useState([]);
  const [filteredProject, setFilteredProject] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const [success, setSuccess] = useState(location.state?.success || false);
  const [type, setType] = useState(location.state?.type || ""); // "add" or "update"
  // console.log(location);
  const [currentPage, setCurrentPage] = useState(0); // Current page state
  const projectPerPage = 3; // Number of project per page
  const offset = currentPage * projectPerPage; // Calculate offset for pagination
  const pageCount = Math.ceil(filteredProject.length / projectPerPage); // Total page count

  function FecthProject() {
    setLoading(true);
    getAllProjects()
      .then((res) => {
        const projectsOptions = res.data.map((project) => ({
          value: project.id,
          label: project.name,
        }));
        setProjectOption(projectsOptions);

        setProject(res.data);
        setFilteredProject(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    FecthProject();
  }, []);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false);
        setType(""); // Clear type after alert is hidden
        navigate("/projects", { replace: true }); // Clear the success state from history
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  const handleDelete = () => {
    deleteProjects(projectToDelete)
      .then(() => {
        FecthProject();
        setShowModal(false);
      })
      .catch((err) => console.error("Error deleting project:", err));
  };

  const confirmDelete = (id) => {
    setProjectToDelete(id);
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  const handleFilterChange = () => {
    let filtered = [...project];
    console.log("fiter change triggerd:", selectedProject);
    if (selectedProject) {
      filtered = filtered.filter(
        (project) => project.id === selectedProject.value
      );
    }

    // if (selectedEmployee) {
    //   filtered = filtered.filter(
    //     (projects) => projects.assigned_to === selectedEmployee.value
    //   );
    // }

    setFilteredProject(filtered);
    setCurrentPage(0); // Reset to the first page when filters are applied
  };

  useEffect(() => {
    handleFilterChange();
  }, [selectedProject]);

  // function handleDelete(id) {
  //   deleteProjects(id)
  //     .then((res) => {
  //       console.log(res);
  //       // window.location.reload();
  //       FecthProject();
  //     })
  //     .catch((err) => console.log(err));
  // }
  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };
  return (
    <div className="container-fluid">
      {/* Conditionally show the appropriate alert based on "type" */}
      {success && type === "add" && (
        <Alert
          variant="success"
          className="mt-4 d-flex align-items-center"
          style={{ backgroundColor: "#d4edda", color: "#155724" }}
        >
          <CheckCircleIcon style={{ marginRight: "10px", fontSize: "24px" }} />
          <span>projects added successfully!</span>
        </Alert>
      )}

      {success && type === "update" && (
        <Alert
          variant="success"
          className="mt-4 d-flex align-items-center"
          style={{ backgroundColor: "#d4edda", color: "#155724" }}
        >
          <CheckCircleIcon style={{ marginRight: "10px", fontSize: "24px" }} />
          <span>projects updated successfully!</span>
        </Alert>
      )}

      <div className="row">
        <div className="col-12">
          {/* <h1 className="mt-3">projects List</h1> */}

          {/* Filters Section */}
          <div className="row mb-3">
            <div className="col-md-6 col-sm-12">
              <OverlayTrigger overlay={<Tooltip>Filter by Project</Tooltip>}>
                <div className="filter-select">
                  <Select
                    styles={customSelectStyles}
                    // components={{
                    //   DropdownIndicator: () => (

                    //     <Search className="search-icon" />
                    //   ),
                    // }}
                    placeholder="Filter by Project"
                    options={projectOption}
                    value={selectedProject}
                    onChange={(selectedOption) =>
                      setSelectedProject(selectedOption)
                    }
                    isClearable
                  />
                </div>
              </OverlayTrigger>
            </div>
            {/* <div className="col-md-6 col-sm-12">
              <OverlayTrigger overlay={<Tooltip>Filter by Employee</Tooltip>}>
                <div className="filter-select">
                  <Select
                    styles={customSelectStyles}
                    components={{
                      DropdownIndicator: () => (
                        <Search className="search-icon" />
                      ),
                    }}
                    placeholder="Filter by Employee"
                    options={employees}
                    value={selectedEmployee}
                    onChange={(selectedOption) =>
                      setSelectedEmployee(selectedOption)
                    }
                    isClearable
                  />
                </div>
              </OverlayTrigger>
            </div> */}
          </div>

          <div className="mb-3">
            <OverlayTrigger
              overlay={<Tooltip className="tooltip">Add New projects</Tooltip>}
            >
              <Link to="/projects/new" className="add-icon">
                <Add />
              </Link>
            </OverlayTrigger>
          </div>
          {/* projects Table */}
          {loading ? (
            <>
              <Spinner animation="border" />
              <p
                style={{ color: "white", backgroundColor: "rgba(0,0,0, 0.5)" }}
              >
                The database for the Construction Project Management System has
                not been uploaded yet, which is why the <b>project</b> list is
                empty. Please be patient , it will be uploaded soon.
              </p>
            </>
          ) : (
            <>
              <div className="table-responsive ">
                <table responsive className="table table-custom  ">
                  <thead>
                    <tr>
                      {/* <th>id</th> */}
                      <th> Project name</th>
                      {/* <th>description</th> */}
                      <th>location</th>
                      {/* <th>start date</th>
                      <th>end date</th> */}
                      <th>status</th>
                      <th>budget</th>
                      <th>expenses</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProject
                      .slice(offset, offset + projectPerPage)
                      .map((projects) => (
                        <tr
                          key={projects.id}
                          onDoubleClick={() =>
                            navigate(`/projects/detail/${projects.id}`)
                          } // Navigate to projects detail on row click
                          style={{ cursor: "pointer" }} // Add pointer to indicate it's clickable
                        >
                          {/* <td>{projects.id}</td> */}
                          <td>{projects.name}</td>
                          {/* <td>{projects.description}</td> */}
                          <td>{projects.location}</td>
                          {/* <td>{projects.start_date}</td>
                          <td> {projects.end_date}</td> */}
                          <td>
                            <Badge
                              bg={
                                projects.status === "Completed"
                                  ? "success"
                                  : projects.status === "Ongoing"
                                  ? "warning"
                                  : "secondary"
                              }
                            >
                              {projects.status}
                            </Badge>
                          </td>

                          <td>
                            <span style={{ color: "#00c445" }}> PKR</span>{" "}
                            {projects.budget}
                          </td>
                          <td>{projects.expenses}</td>

                          <td>
                            <div className="d-flex justify-content-around">
                              <OverlayTrigger overlay={<Tooltip>View</Tooltip>}>
                                <Link
                                  style={{ borderRadius: "50%" }}
                                  to={`/projects/detail/${projects.id}`}
                                  className="btn btn-info btn-sm  "
                                >
                                  <Visibility />
                                </Link>
                              </OverlayTrigger>
                              <OverlayTrigger overlay={<Tooltip>Edit</Tooltip>}>
                                <Link
                                  style={{ borderRadius: "50%" }}
                                  to={`/projects/update/${projects.id}`}
                                  className="btn btn-warning btn-sm  "
                                >
                                  <Edit />
                                </Link>
                              </OverlayTrigger>
                              <OverlayTrigger
                                overlay={<Tooltip>Delete</Tooltip>}
                              >
                                <Button
                                  style={{ borderRadius: "50%" }}
                                  variant="danger"
                                  size="sm"
                                  onClick={() => confirmDelete(projects.id)}
                                >
                                  <Delete />
                                </Button>
                              </OverlayTrigger>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              <ReactPaginate
                previousLabel={"← Previous"}
                nextLabel={"Next →"}
                breakLabel={"..."}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                onPageChange={handlePageClick}
                containerClassName={"react-paginate"}
                activeClassName={"selected"}
                disabledClassName={"disabled"}
              />
            </>
          )}

          {/* Modal for Delete Confirmation */}
          <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Confirm Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to delete this projects?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="danger" onClick={handleDelete}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default ProjectList;
