import { Button, Input, Modal, message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetUserById, UpdateUser, fetchData } from "../Redux/Slice/apiSlice";

export const UpdateModal = (props) => {

  const dispatch = useDispatch();

  const { getById } = useSelector(state => state.content);
  // console.log("id",getById)


  const [id, setId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [job, setJob] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");

//modala datayı bastık,aşağıdakigetUserById apisinden aldık  dataları ve state aktardık.
  useEffect(() => {
    setId(getById.id);
    setFirstName(getById.name);
    setLastName(getById.surname);
    setJob(getById.job);
    setAddress(getById.address);
    setEmail(getById.email);
  }, [getById])


  useEffect(() => {
    if(props.userId){
     dispatch(GetUserById(props.userId))
    }
    // console.log("user",props.userId)
  }, [props.userId])
  

  const cancelButton=()=>{ 
    message.success("cancel buttonuna basıldı");
    props.handleOpen(false);
  }

  //Update api ile save yaptım ve değişikleri kaydettim.
  const saveModal=()=>{
    const res = {
      id:id,
      name: firstName,
      surname: lastName,
      job: job,
      address: address,
      email: email,
    };

    dispatch(UpdateUser(res))
    // console.log(res)

    setTimeout(() => {
    dispatch(fetchData())
    }, 200);

    props.handleOpen(false);
  }

  return (
    <div>
      <Modal
        title="User Claims"
        open={props.isOpen}
        // onOk={handleOk}
        onCancel={cancelButton}
      >
        <form className="text-form  text-form-update">
          <label className="form-label"> Name:</label>
          <Input
            placeholder="Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <label className="form-label"> Surname:</label>
          <Input
            placeholder="Surname"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <label className="form-label"> Address:</label>
          <Input
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <label className="form-label"> Job: </label>
          <Input
            placeholder="Job"
            value={job}
            onChange={(e) => setJob(e.target.value)}
          />

          <label className="form-label"> Email: </label>
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button
            style={{ margin: "10px" }}
            type="primary"
            onClick={()=>saveModal()}
          >
            Save
          </Button>
        </form>
      </Modal>
    </div>
  );
};
