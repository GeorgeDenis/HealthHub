import React from 'react'
import { Modal } from "@mui/material";

const ActivityLevelModal = () => {
  return (
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[25rem] bg-surface-darkest shadow-lg p-4 rounded">
        <Typography variant="h4" className="text-white p-2">
          Edit Goal Type
        </Typography>
        <div className="flex flex-col justify-between h-full">
          <div className="m-2">
            <Select
              value={selectedGoalType}
              onChange={(value) => handleGoalTypeChange(value)}
              className="!border-surface-mid-dark text-surface-light focus:!border-secondary"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              placeholder="Select Goal Type"
            >
              <Option value="1" className="text-surface-mid-light">
                  Lose Weight
                </Option>
                <Option value="2" className="text-surface-mid-light">
                  Maintain Weight
                </Option>
                <Option value="3" className="text-surface-mid-light">
                  Gain Weight
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
  );
}

export default ActivityLevelModal