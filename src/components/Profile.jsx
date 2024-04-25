"use client";

import { useState } from "react";
import { FaPenToSquare } from "react-icons/fa6";
import { FaSave } from "react-icons/fa";
import Button from "./Button";
import InputGroup from "./InputGroup";

function Profile() {
  const [editMode, setEditMode] = useState(true);
  return (
    <div className="flex flex-col gap-4 justify-center items-center border border-gray-200 bg-white shadow p-4 md:p-10 rounded-xl">
      <div className="w-full flex justify-between items-center">
        <h1 className="font-bold text-2xl md:text-4xl">My Profile</h1>
        <Button customClass="bg-red-500">Log Out</Button>
      </div>
      <div className="w-full h-[1px] bg-[#D9D9D9]"></div>
      <div className="w-full flex flex-col md:flex-row justify-between gap-4 md:gap-10">
        <div className="flex flex-col gap-4 justify-center items-center">
          <div className="relative inline-block">
            <label
              htmlFor="fileInput"
              //   className={!editMode ? `cursor-pointer` : ""}
            >
              <img
                src={"https://github.com/shadcn.png"}
                alt="Profile Image"
                className="rounded-full w-40 h-32 object-cover"
              />
            </label>
            <input
              id="fileInput"
              type="file"
              className="hidden"
              // onChange={onImgUrlChange}
              // disabled={editMode}
            />
          </div>
          <button
            // onClick={onSubmit}
            className="text-lg flex items-center gap-2"
          >
            {editMode ? (
              <>
                <FaPenToSquare />
                Edit
              </>
            ) : (
              <>
                <FaSave /> Save
              </>
            )}
          </button>
        </div>
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
          <InputGroup
            title="First Name"
            type="text"
            placeholder=""
            id="firstName"
            className="outline-none text-lg"
            //   disabled={editMode}
            //   onChange={onChange}
            //   value={inputData.firstName}
          />
          <InputGroup
            title="Last Name"
            type="text"
            placeholder=""
            id="lastName"
            className="outline-none text-lg"
            //   disabled={editMode}
            //   onChange={onChange}
            //   value={inputData.lastName}
          />
          <InputGroup
            title="Email"
            type="text"
            placeholder=""
            id="email"
            className="outline-none text-lg"
            //   disabled={true}
            //   value={data?.email}
          />
          <InputGroup
            title="Phone Number"
            type="text"
            placeholder=""
            id="phoneNumber"
            className="outline-none text-lg"
            //   disabled={editMode}
            //   onChange={onChange}
            //   value={inputData.phoneNumber}
          />
        </div>
      </div>
    </div>
  );
}

export default Profile;
