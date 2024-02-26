import React,{useState} from "react";
import { Modal } from "@mui/material";
import { Button, Typography, Select, Option } from "@material-tailwind/react";
import api from "../../../../services/api";
import { useUser } from "@/context/LoginRequired";
import { toast } from "react-toastify";

const EditGenderModal = ({
  open,
  onClose,
  onGenderUpdate
}) => {
  const [selectedGender, setSelectedGender] = useState("");
  const currentUser = useUser();
  const handleGenderChange = (value) => {
    setSelectedGender(value);
  };
  const handleSave = async () => {
    try{
      const response = await api.put(
        `/api/v1/Users/${currentUser.userId}`,
        {
          id: currentUser.userId,
          gender: parseInt(selectedGender,10),
        },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        },
      );
      if (response.status === 200) {
        onGenderUpdate();
        toast.success("User gender updated successfully");
        onClose();
      }

    }catch (error) {
      console.error('Error updating user gender:', error);
      toast.error('Failed to update user gender');
    }
  }

  return (
    <Modal open={open} onClose={onClose}>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[25rem] bg-surface-darkest shadow-lg p-4 rounded">
        <Typography variant="h4" className="text-white p-2">
          Edit Gender
        </Typography>
        <div className="flex flex-col justify-between h-full">
          <div className="m-2">
            <Select
              value={selectedGender}
              onChange={(value) => handleGenderChange(value)}
              className="!border-surface-mid-dark text-surface-light focus:!border-secondary"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              placeholder="Select Gender"
            >
              <Option value="1" className="text-surface-mid-light">
                Male
              </Option>
              <Option value="2" className="text-surface-mid-light">
                Female
              </Option>
            </Select>
          </div>
          <div className="m-2 self-end">
            <Button
              size="sm"
              className="bg-secondary hover:bg-primary"
              onClick={handleSave}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EditGenderModal;
