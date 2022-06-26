import React, { useReducer } from "react";
import { Escort } from "../../dto/index";
import {
  API_ROUTES,
  CONTAINERS,
  NOTIFICATION_MESSAGES,
  PERMISSION_INSTANCES,
} from "@utils/index";
import { Box } from "@mui/material";
import { signIn } from "@api/index";
import {
  useCheckPermissions,
  useCRUDGenericApiCall,
  useNotifications,
} from "@hooks/index";
import {
  reducerSignInOut,
  signInOutInitial,
} from "@components/SignInOutControlList/SignInOutControlList.reducer";
import {
  SignInOutControlList,
  SignInControlSearch,
  SignInOutControlConfirmationDialog,
} from "@components/index";
import { trackPromise } from "react-promise-tracker";
import CommonLayout from "@components/CommonLayout";

const generateQuestion = () => {
  const option: ("first" | "last")[] = ["first", "last"];
  return option[Math.floor(Math.random() * option.length)];
};

const SignInControlContainer = () => {
  const { createSuccessNotification, createErrorNotification } =
    useNotifications();
  const [signInState, dispatchSignInAction] = useReducer(
    reducerSignInOut<Escort>(),
    signInOutInitial
  );
  const { fetchAll } = useCRUDGenericApiCall<Escort>(
    API_ROUTES.USER_SIGN_IN_OUT
  );
  const onSearch = async () => {
    if (signInState.searchText === "") {
      dispatchSignInAction({ type: "clearFetchedList" });
    } else {
      const data = await fetchAll({
        is_active: true,
        extended_user__present: false,
        search: signInState.searchText,
      });
      dispatchSignInAction({ type: "setUserList", fetchedList: data });
    }
  };
  const onSelectUser = (user: Escort) => {
    const selectedOption = generateQuestion();
    dispatchSignInAction({
      type: "selectUser",
      user,
      option: selectedOption,
      answer: selectedOption === "first" ? user.firstThree : user.lastThree,
    });
  };
  const onConfirm = async () => {
    const isCorrectAnswer = signInState.answer === signInState.correctAnswer;
    if (!isCorrectAnswer) {
      const errorMessage = `Los 3 ${
        signInState.confirmationQuestionOption === "first"
          ? "PRIMEROS"
          : "ÚLTIMOS"
      } no coinciden con el documento`;
      dispatchSignInAction({ type: "setError", errorMessage });
    } else if (signInState.selectedUser) {
      try {
        await trackPromise(signIn(signInState.selectedUser.id));
        createSuccessNotification(
          `${NOTIFICATION_MESSAGES.SIGN_IN_SUCCESSFUL_MESSAGE} ${signInState.selectedUser.fullName}`
        );
        dispatchSignInAction({ type: "completedSignOutInRegistration" });
      } catch (error) {
        createErrorNotification(
          `${NOTIFICATION_MESSAGES.SIGN_IN_FAILED_MESSAGE} ${signInState.selectedUser.fullName}`
        );
      }
    }
  };
  return (
    <CommonLayout
      title={CONTAINERS.USER_SIGN_IN_TITLE}
      canView={useCheckPermissions([
        PERMISSION_INSTANCES.SIGN_IN_CONTROL.MADE_SIGN_IN_OTHERS,
      ])}
    >
      <Box>
        {signInState.selectedUser && (
          <SignInOutControlConfirmationDialog
            title={CONTAINERS.USER_SIGN_IN_TITLE}
            errorMessage={signInState.errorMessage}
            open={Boolean(signInState.selectedUser)}
            onCancel={() =>
              dispatchSignInAction({ type: "cancelConfirmation" })
            }
            onConfirm={onConfirm}
            answer={signInState.answer}
            fullName={signInState.selectedUser.fullName}
            questionType={signInState.confirmationQuestionOption}
            setTextAnswer={(text) =>
              dispatchSignInAction({ type: "setAnswerText", text })
            }
          />
        )}
        <SignInControlSearch
          onSearch={onSearch}
          searchText={signInState.searchText}
          handleOnSearchTextChange={(text) =>
            dispatchSignInAction({ type: "setSearchText", text })
          }
        />
        <SignInOutControlList
          list={signInState.userList}
          handleOnSelectEscort={onSelectUser}
        />
      </Box>
    </CommonLayout>
  );
};

export default SignInControlContainer;
