import React, { useState, useEffect } from "react";
import { Modal } from "@mui/material";

const AddCardioExerciseModal = ({
  isCardioExerciseModalOpen,
  handleCloseCardioExerciseModal,
}) => {
  return (
    <>
      <Modal
        open={isCardioExerciseModalOpen}
        onClose={handleCloseCardioExerciseModal}
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:w-[25rem] w-[90vw] bg-surface-darkest shadow-lg p-5 rounded-lg">
          cardio
        </div>
      </Modal>
    </>
  );
};

export default AddCardioExerciseModal;
