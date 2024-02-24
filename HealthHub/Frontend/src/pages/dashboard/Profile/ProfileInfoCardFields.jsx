import React from "react";
import { Link } from "react-router-dom";
import { Input, Textarea, Tooltip, Typography } from "@material-tailwind/react";

export function DataField({
  label,
  value,
  isInEditMode,
  editedValue,
  onChangeEditedValue,
}) {
  return (
    <li className="flex items-center gap-4">
      {!isInEditMode ? (
        value && (
          <>
            <Typography
              variant="small"
              className="font-semibold capitalize text-surface-light"
            >
              {label}:
            </Typography>
            <Typography
              variant="small"
              className="font-normal text-surface-mid-light"
            >
              {value}
            </Typography>
          </>
        )
      ) : (
        <Input
          value={editedValue || ""}
          onChange={(e) => onChangeEditedValue(e.target.value)}
          type={"text"}
          variant={"outlined"}
          label={label}
          size={"md"}
          color={"green"}
          className={"text-white"}
          crossOrigin={undefined}
        />
      )}
    </li>
  );
}
export function BioTextField({ bio, editedBio, onChange, isInEditMode }) {
  if (isInEditMode) {
    return (
      <Textarea
        value={editedBio || ""}
        onChange={(e) => onChange(e.target.value)}
        label={"Bio"}
        color={"green"}
        containerProps={{ className: "mt-2" }}
        className={"text-white"}
      />
    );
  }

  if (bio) {
    return (
      <Typography
        variant="small"
        className="font-normal text-surface-light mt-4"
      >
        {bio}
      </Typography>
    );
  }
}
