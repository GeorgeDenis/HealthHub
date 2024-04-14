import React from 'react';
import { Stack } from '@mui/material';
import { Spinner } from "@material-tailwind/react";

const Loader = () => (
  <div className="flex min-h-screen bg-gradient-to-r from-surface-darkest to-[#262133]">
        <Spinner className={"m-auto w-10 h-10"} />
      </div>
);

export default Loader;