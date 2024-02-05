import React from "react";
import { TbEdit } from "react-icons/tb";
import { MdOutlineDone } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { SelectPicker } from "rsuite";

const UpdateInputs = ({
  product,
  keyName,
  updateValues,
  setupdateValues,
  editing,
  setediting,
  setchangesMade,
  catNames,
}) => {
  return (
    <div className="">
      <p className="text-[1.3rem] font-medium">{keyName}:</p>
      <div className="grid grid-cols-2 items-end gap-4">
        <div>
          {editing === keyName ? (
            <>
              {keyName === "categoryId" ? (
                <SelectPicker
                  data={catNames}
                  searchable={false}
                  style={{ width: 224 }}
                  placeholder="Select category name"
                  onChange={(value) => {
                    setupdateValues({
                      ...updateValues,
                      categoryId: value,
                    });
                    setchangesMade(true);
                  }}
                />
              ) : (
                <input
                  type={
                    keyName === "price" || keyName === "discountPrice"
                      ? "number"
                      : "text"
                  }
                  value={updateValues[`${keyName}`]}
                  className="font-semibold text-[1.2rem] placeholder-black w-auto outline-0 border-b-[2px] border-orange-300"
                  onChange={(e) => {
                    setupdateValues({
                      ...updateValues,
                      [keyName]: e.target.value,
                    });
                  }}
                />
              )}
            </>
          ) : keyName === "categoryId" ? (
            ""
          ) : (
            <p className="font-semibold text-[1.2rem] placeholder-black">
              {product[`${keyName}`] ? product[`${keyName}`] : "No Value"}
            </p>
          )}
        </div>
        <div>
          {editing === keyName ? (
            <div className="flex ">
              <MdOutlineDone
                className="text-[2rem] hover:text-green-500 cursor-pointer "
                onClick={() => {
                  setediting("");
                  setchangesMade(true);
                  product[`${keyName}`] = updateValues[`${keyName}`];
                }}
              />
              <RxCross2
                className="text-[2rem] hover:text-red-500 cursor-pointer "
                onClick={() => {
                  setediting("");
                  setupdateValues({
                    ...updateValues,
                    [keyName]: "",
                  });
                }}
              />
            </div>
          ) : (
            <>
              <TbEdit
                className="text-[2rem] hover:text-orange-500 cursor-pointer "
                onClick={() => {
                  setediting(keyName);
                  setupdateValues({
                    ...updateValues,
                    [keyName]: product[`${keyName}`],
                  });
                }}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateInputs;
