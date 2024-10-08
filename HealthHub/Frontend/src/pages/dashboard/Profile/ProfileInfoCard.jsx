import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import { PencilIcon } from "@heroicons/react/24/solid";
import { BioTextField, DataField } from "./ProfileInfoCardFields";
import { useEffect } from "react";
import ProfileGoalsSettings from "./ProfileGoalsSettings";
function EditActionButtons({ onSaveEdit, onCancelEdit }) {
  return (
    <div className="flex items-center gap-2 mt-2">
      <Button
        onClick={onSaveEdit}
        className={"bg-green-600 hover:bg-green-900"}
        size={"sm"}
      >
        Save
      </Button>
      <Button
        onClick={onCancelEdit}
        className={"bg-surface-mid-light hover:bg-surface-mid"}
        size={"sm"}
      >
        Cancel
      </Button>
    </div>
  );
}
export function ProfileInfoCard({
  bio,
  details = {},
  isEditable,
  isInEditMode,
  onEnterEditMode,
  editedUserData,
  setEditedUserData,
  onSaveEdit,
  onCancelEdit,
}) {
  return (
    <Card color="transparent" shadow={false}>
      <CardHeader
        color="transparent"
        shadow={false}
        floated={false}
        className="mx-0 mt-0 flex items-center justify-between gap-4"
      >
        <Typography className="text-surface-light text-base md:text-2xl font-semibold">
          Profile Information
        </Typography>
        {isEditable && !isInEditMode && (
          <div className="flex items-center gap-1">
            <Tooltip
              content="Edit Profile"
              animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0, y: 25 },
              }}
            >
              <PencilIcon
                onClick={onEnterEditMode}
                className="h-6 w-6 md:h-5 md:w-5 cursor-pointer text-surface-light"
              />
            </Tooltip>
            <ProfileGoalsSettings />
          </div>
        )}
      </CardHeader>
      <CardBody className="p-0">
        <BioTextField
          bio={bio}
          editedBio={editedUserData.bio}
          onChange={(newBio) =>
            setEditedUserData({ ...editedUserData, bio: newBio })
          }
          isInEditMode={isInEditMode}
        />
        <hr className="my-2 border-surface-mid" />
        <ul className="flex flex-col gap-4 p-0 mt-4">
          <DataField
            label={"Email 📧"}
            value={details.email}
            isInEditMode={isInEditMode}
            editedValue={editedUserData.email}
            onChangeEditedValue={(value) =>
              setEditedUserData({ ...editedUserData, email: value })
            }
          />
          <DataField
            label={"Mobile 📱"}
            value={details.mobile}
            isInEditMode={isInEditMode}
            editedValue={editedUserData.mobile}
            onChangeEditedValue={(value) =>
              setEditedUserData({ ...editedUserData, mobile: value })
            }
          />
          <DataField
            label={"Location 📍"}
            value={details.location}
            isInEditMode={isInEditMode}
            editedValue={editedUserData.location}
            onChangeEditedValue={(value) =>
              setEditedUserData({ ...editedUserData, location: value })
            }
          />

          {isInEditMode && (
            <EditActionButtons
              onSaveEdit={onSaveEdit}
              onCancelEdit={onCancelEdit}
            />
          )}
        </ul>
      </CardBody>
    </Card>
  );
}

export default ProfileInfoCard;
