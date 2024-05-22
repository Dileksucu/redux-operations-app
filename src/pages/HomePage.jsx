import React, { useEffect, useState } from "react";
import { Button, Col, Input, Row, Space, Spin, Table } from "antd";
import "../assets/css/home.css";
import { UpdateModal } from "../Components/UpdateModal";
import { useDispatch, useSelector } from "react-redux";
import { DeleteData, PostData, fetchData } from "../Redux/Slice/apiSlice";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {

  const dispatch = useDispatch();

  const navigate= useNavigate();

  const [firstName, setFirstName] = useState([]);
  const [lastName, setLastName] = useState([]);
  const [job, setJob] = useState([]);
  const [address, setAddress] = useState([]);
  const [email, setEmail] = useState([]);

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [userId, setUserId] = useState("") //update modal da tıklanan verinin idsini sakladık

  const openUpdateModal = (record) => {
    setIsUpdateModalOpen(true);
    setUserId(record.id)
  };

  const handleOpen = (value) => {
    setIsUpdateModalOpen(value);
  };

  const handleSubmitName = (event) => {
    setFirstName(event.target.value);
  };
  const handleSubmitSurname = (event) => {
    setLastName(event.target.value);
  };
  const handleSubmitJob = (event) => {
    setJob(event.target.value);
  };
  const handleSubmitEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleSubmitAddress = (event) => {
    setAddress(event.target.value);
  };


  const succesContents = useSelector((state) => state.content); //burada content kısmındaki : pedding, fulfilled ve rejected kısımlarını hepsini alıyoruz.
  //ilk content kısmı name ve store kısmındaki content alıntındaki data'yı alsın dedik.

  //get isteği
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);


  const postUser = () => {
    const request = {
      name: firstName,
      surname: lastName,
      job: job,
      address: address,
      email: email,
    };

    dispatch(PostData(request));
    setTimeout(() => {
      dispatch(fetchData())
    }, 200); // burada 200 ms kısmı bekleme 
  };

  const deleteUser = (id) => {
    dispatch(DeleteData(id));
    setTimeout(() => {
      dispatch(fetchData())
    }, 200);

    // console.log(succesContents.isLoading)
  };


  //details sayfasına navigate yapıldı
  const detailsNavigate=(record)=>{
    navigate(`/UserDetails/${record.id}`)
    // console.log(record.id)
  }

  const columns = [
    {
      title: "ID",
      dataIndex: "id", //vt daki kolan ismini vermem grekiyor
      key: "id", //vt daki kolan ismini vermem grekiyor
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Surname",
      dataIndex: "surname",
      key: "surname",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Job",
      dataIndex: "job",
      key: "job",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            style={{ backgroundColor: "#b41b1b", color: "white" }}
            type="dashed"
            onClick={() => deleteUser(record.id)}
          >
            Delete
          </Button>
          <Button
            style={{ backgroundColor: "#214778", color: "white" }}
            onClick={() => openUpdateModal(record)}
            type="dashed"
          >
            Update
          </Button>
          <Button
            type="dashed"
            style={{ backgroundColor: "SteelBlue", color: "white" }}
            onClick={()=>detailsNavigate(record)}
          >
            Details
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgb(220 ,220, 220)",
      }}
    >
      <div id="first-section"
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "50px",
          width: "30%",
        }}
      >
        <Row
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Col lg={10}>
            <span
              style={{
                fontSize: "medium",
                fontWeight: "bold",
                display: "flex",
              }}
            >
              Name
            </span>
            <Input
              value={firstName}
              onChange={(e) => handleSubmitName(e)}
              style={{ height: "50px", marginTop: "10px" }}
            />

            <span
              style={{
                fontSize: "medium",
                fontWeight: "bold",
                display: "flex",
              }}
            >
              Email
            </span>
            <Input
              value={email}
              onChange={handleSubmitEmail}
              style={{ height: "50px", marginTop: "10px" }}
            />
          </Col>

          <Col lg={10} style={{ marginLeft: "20px" }}>
            <span
              style={{
                fontSize: "medium",
                fontWeight: "bold",
                display: "flex",
              }}
            >
              Surname
            </span>
            <Input
              value={lastName}
              onChange={handleSubmitSurname}
              style={{ height: "50px", marginTop: "10px" }}
            />
            <span
              style={{
                fontSize: "medium",
                fontWeight: "bold",
                display: "flex",
              }}
            >
              Address
            </span>
            <Input
              value={address}
              onChange={handleSubmitAddress}
              style={{ height: "50px", marginTop: "10px" }}
            />
          </Col>

          <Col lg={10}>
            <span
              style={{
                fontSize: "medium",
                fontWeight: "bold",
                display: "flex",
              }}
            >
              Job
            </span>
            <Input
              value={job}
              onChange={handleSubmitJob}
              style={{ height: "50px", marginTop: "10px" }}
            />
          </Col>

          <Col
            lg={24}
            style={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <Button
              style={{
                marginTop: "20px",
                width: "100px",
                height: "60%",
                fontSize: "medium",
                fontWeight: "bold",
                backgroundColor: "green",
              }}
              onClick={() => postUser()}
            >
              Post
            </Button>
          </Col>
        </Row>
      </div>

        {!succesContents.isLoading ?
      <div id="second-section">
        <Row>
          <Col lg={24}>
            <Table
              className="table"
              dataSource={succesContents?.data}
              columns={columns}
            />
          </Col>
        </Row>
      </div>
      :
      <Spin className="d-flex justify-content-center" /> //loading durumu için spin ile kontrol ettik.
      }

      <UpdateModal userId={userId} isOpen={isUpdateModalOpen} handleOpen={handleOpen} />
    </div>
  );
};
