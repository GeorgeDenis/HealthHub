import { useUser } from "@/context/LoginRequired";
import {
  Input,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { debounce } from "@mui/material";
import { toast } from "react-toastify";
import UserAvatar from "../utils/UserAvatar";
import api from "../../../services/api";
const SearchUsers = ({ joinChat, fetchMessages, setReceiver }) => {
  const searchRef = useRef(null);
  const inputRef = useRef(null);
  const [searchValue, setSearchValue] = useState("");
  const [foundUsers, setFoundUsers] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const currentUser = useUser();

  useEffect(() => {
    const searchUsers = async () => {
      try {
        if (searchValue) {
          const response = await api.get(
            `/api/v1/Users/search/${searchValue}`,
            {
              headers: {
                Authorization: `Bearer ${currentUser.token}`,
              },
            },
          );

          if (response.status === 200) {
            let users = response.data.users || [];
            if (users.length) {
              users = users.filter(
                (user) => user.userId !== currentUser.userId,
              );
            }
            setFoundUsers(users || []);
            setIsMenuOpen(true);
          }
        } else {
          setFoundUsers([]);
          setIsMenuOpen(false);
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to search users");
        setIsMenuOpen(false);
      }
    };
    const debouncedSearch = debounce(() => {
      searchUsers();
    }, 500);

    debouncedSearch();

    return () => {
      debouncedSearch.clear();
    };
  }, [searchValue]);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);
  const handleMenuItemClick = (userId) => {
    setIsMenuOpen(false);
    setSearchValue("");
    // navigate(`/dashboard/profile/${userId}`);
    fetchMessages(userId);
    joinChat(currentUser.userId, userId);
    setReceiver(userId);
  };

  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };
  return (
    <div className="relative" ref={searchRef}>
      <Input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onFocus={() => searchValue && setIsMenuOpen(true)}
        label="Search"
        color="green"
        crossOrigin={undefined}
        className="text-white w-56"
        icon={<i className="fa-solid fa-search" />}
        inputRef={inputRef}
      />
      <Menu placement="bottom-start" open={isMenuOpen}>
        <MenuHandler>
          {/*Needed for positioning*/}
          <div></div>
        </MenuHandler>
        <MenuList
          className="max-h-[20rem] w-56 bg-surface-dark border-surface-darkest"
          onFocus={() => inputRef?.current?.focus()}
        >
          {foundUsers.length ? (
            foundUsers.map((user) => (
              <MenuItem
                key={user.userId}
                className="hover:bg-surface-mid"
                onClick={() => handleMenuItemClick(user.userId)}
              >
                <div className={"flex items-center"}>
                  <UserAvatar
                    photoUrl={user.profilePictureUrl}
                    className="h-9 w-9 rounded-full object-cover"
                    loadingClassName="h-9 w-9 bg-surface-mid-dark"
                    loadingProps={{ className: "h-4 w-4" }}
                  />
                  <div className={"ml-2"}>
                    <p className={"text-white text-base"}>{user.name}</p>
                    <p className={"text-surface-light text-xs"}>
                      #{user.username}
                    </p>
                  </div>
                </div>
              </MenuItem>
            ))
          ) : (
            <MenuItem className="text-surface-light" disabled>
              No users found
            </MenuItem>
          )}
        </MenuList>
      </Menu>
    </div>
  );
};

export default SearchUsers;
