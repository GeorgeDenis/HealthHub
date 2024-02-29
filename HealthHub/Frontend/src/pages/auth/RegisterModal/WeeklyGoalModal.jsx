import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button, Typography, Select, Option } from "@material-tailwind/react";
import { toast } from 'react-toastify';

const WeeklyGoalModal = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { selectedGoal } = location.state || {};
    const [selectedWeeklyGoal, setSelectedWeeklyGoal] = useState(null);
    const handleWeeklyGoalChange = (value) => {
        setSelectedWeeklyGoal(value);
    };
    const handleBack = () => {
        navigate("/auth/set-goal-type");
    };
    const handleNext = () => {
        if (!selectedWeeklyGoal) {
            toast.error("Please select a weekly goal");
            return;
        }
        if (selectedGoal === 1 && parseFloat(selectedWeeklyGoal) > 0) {
            toast.error("Invalid weekly goal for weight loss");
            return;
        }
        if (selectedGoal === 2 && parseFloat(selectedWeeklyGoal) !== 1) {
            toast.error("Invalid weekly goal for weight maintenance");
            return;
        }
        if (selectedGoal === 3 && parseFloat(selectedWeeklyGoal) < 0) {
            toast.error("Invalid weekly goal for weight gain");
            return;
        }
        let weeklyGoal = Math.abs(parseFloat(selectedWeeklyGoal));
        navigate("/auth/set-activity-level", { state: { selectedGoal, selectedWeeklyGoal: weeklyGoal } });
    }
    useEffect(() => {
        if (!selectedGoal) {
            navigate("/auth/set-goal-type");
        }
    }, []);
    return (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[27rem] bg-surface-dark shadow-lg p-4 rounded flex flex-col">
            <Typography variant="h4" className="text-white p-2 select-none">
                Edit Weekly Goal
            </Typography>
            <div className="flex flex-col justify-between h-full">
                <div className="m-2">
                    <Select
                        value={selectedWeeklyGoal}
                        onChange={handleWeeklyGoalChange}
                        className="!border-surface-mid-dark text-surface-light focus:!border-secondary select-none"
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }}
                        placeholder="Select Weekly Goal"
                    >
                        <Option value="-0.25" className="text-surface-mid-light">
                            Lose 0.25 kg per week
                        </Option>
                        <Option value="-0.5" className="text-surface-mid-light">
                            Lose 0.5 kg per week
                        </Option>
                        <Option value="-0.75" className="text-surface-mid-light">
                            Lose 0.75 kg per week
                        </Option>
                        <Option value="-1" className="text-surface-mid-light">
                            Lose 1 kg per week
                        </Option>
                        <Option value="1" className="text-surface-mid-light">
                            Maintain my current weight
                        </Option>
                        <Option value="0.25" className="text-surface-mid-light">
                            Gain 0.25 kg per week
                        </Option>
                        <Option value="0.5" className="text-surface-mid-light">
                            Gain 0.5 kg per week
                        </Option>
                    </Select>
                </div>
            </div>
            <div className="m-2 flex items-center">
                <Button size="lg" className="bg-secondary hover:bg-primary mr-2" onClick={handleBack}>
                    Back
                </Button>
                <Button size="lg" className="bg-secondary hover:bg-primary" onClick={handleNext}>
                    Next
                </Button>
            </div>
        </div>
    )
}

export default WeeklyGoalModal