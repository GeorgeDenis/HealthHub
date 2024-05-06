import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
  ScaleIcon,
} from "@heroicons/react/24/solid";

import { Home, Profile } from "@/pages/dashboard";
import LogFood from "./pages/dashboard/LogFood/LogFood";
import { SignIn, SignUp } from "@/pages/auth";
import SendResetCode from "./pages/auth/SendResetCode";
import VerifyResetCode from "./pages/auth/VerifyResetCode";
import ResetPassword from "./pages/auth/ResetPassword";
import ActivityLevelModal from "./pages/auth/RegisterModal/ActivityLevelModal";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import MainInfoCard from "./pages/auth/RegisterModal/MainInfoCard";
import GoalTypeModal from "./pages/auth/RegisterModal/GoalTypeModal";
import WeeklyGoalModal from "./pages/auth/RegisterModal/WeeklyGoalModal";
import LogWeight from "./pages/dashboard/LogMeasurements/LogMeasurements";
import RecipesPages from "./pages/dashboard/Recipes/RecipesPages";
import Cuisine from "./pages/dashboard/Recipes/Cuisine";
import SearchedRecipe from "./pages/dashboard/Recipes/SearchedRecipe";
import RecipeDetails from "./pages/dashboard/Recipes/RecipeDetails/RecipeDetails";
import KitchenIcon from "@mui/icons-material/Kitchen";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import MessageIcon from '@mui/icons-material/Message';
import Workout from "./pages/dashboard/Workout/Workout";
import ExerciseDetails from "./pages/dashboard/Workout/ExerciseDetails/ExerciseDetails";
import Chat from "./pages/dashboard/Chat/Chat";
import ExerciseCounter from "./pages/dashboard/ExerciseCounter/ExerciseCounter";
const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element: <Profile />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "other-profile",
        path: "/profile/:userId?",
        dynamic: true,
        element: <Profile />,
      },
      {
        icon: <RestaurantIcon {...icon} />,
        name: "log food",
        path: "/log-food",
        element: <LogFood />,
      },
      {
        icon: <ScaleIcon {...icon} />,
        name: "log measures",
        path: "/log-weight",
        element: <LogWeight />,
      },
      {
        icon: <KitchenIcon {...icon} />,
        name: "recipes",
        path: "/recipes",
        element: <RecipesPages />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "cuisine",
        path: "/recipes/cuisine/:type",
        element: <Cuisine />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "search-recipe",
        path: "/recipes/search/:query",
        element: <SearchedRecipe />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "recipe-details",
        path: "/recipes/details/:id",
        element: <RecipeDetails />,
      },
      {
        icon: <FitnessCenterIcon {...icon} />,
        name: "workout",
        path: "/workout",
        element: <Workout />,
      },
      {
        icon: <FitnessCenterIcon {...icon} />,
        name: "workout-details",
        path: "/workout/:id",
        element: <ExerciseDetails />,
      },
      {
        icon: <FitnessCenterIcon {...icon} />,
        name: "exercise-counter",
        path: "/exercise-counter",
        element: <ExerciseCounter />,
      },
      {
        icon: <MessageIcon {...icon} />,
        name: "chat",
        path: "/chat",
        element: <Chat />,
      }
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "set goal type",
        path: "/set-goal-type",
        element: <GoalTypeModal />,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "set weekly goal",
        path: "/set-weekly-goal",
        element: <WeeklyGoalModal />,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "set activity level",
        path: "/set-activity-level",
        element: <ActivityLevelModal />,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "main info card",
        path: "/main-info-card",
        element: <MainInfoCard />,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "send reset code",
        path: "/send-reset-code",
        element: <SendResetCode />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "verify reset",
        path: "/verify-reset",
        element: <VerifyResetCode />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "reset password",
        path: "/reset-password",
        element: <ResetPassword />,
      },
    ],
  },
];

export default routes;
