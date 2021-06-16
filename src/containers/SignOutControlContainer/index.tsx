import React, { useEffect, useReducer } from "react";
import { useCRUDGenericApiCall, useNotifications } from "@hooks/index";
import { Escort } from "@dbTypes/escorts";
import {
  API_ROUTES,
  CONTAINERS,
  NOTIFICATION_MESSAGES,
} from "@utils/constants";
import {
  SignInOutControlConfirmationDialog,
  SignInOutControlList,
} from "@components/index";
import { Box, Typography } from "@material-ui/core";

import {
  reducerSignInOut,
  signInOutInitial,
} from "@components/SignInOutControlList/SignInOutControlList.reducer";
import { signOut } from "@api/index";

const generateQuestion = () => {
  const option: ("first" | "last")[] = ["first", "last"];
  return option[Math.floor(Math.random() * option.length)];
};

const SignOutControlContainer = () => {
  const [signOutState, dispatchSignOutAction] = useReducer(
    reducerSignInOut<Escort>(),
    signInOutInitial
  );
  const { createSuccessNotification, createErrorNotification } =
    useNotifications();
  const { fetchAll } = useCRUDGenericApiCall<Escort>(
    API_ROUTES.USER_SIGN_IN_OUT
  );

  useEffect(() => {
    const handleOnFetch = async () => {
      const data = await fetchAll({
        extended_user__present: true,
      });
      dispatchSignOutAction({ type: "setUserList", fetchedList: data });
    };
    handleOnFetch();
    return () => {};
  }, [fetchAll]);

  const onSelectUser = (user: Escort) => {
    const selectedOption = generateQuestion();
    dispatchSignOutAction({
      type: "selectUser",
      user,
      option: selectedOption,
      answer: selectedOption === "first" ? user.firstThree : user.lastThree,
    });
  };

  const onConfirm = async () => {
    const isCorrectAnswer = signOutState.answer === signOutState.correctAnswer;
    if (!isCorrectAnswer) {
      const errorMessage = `Los 3 ${
        signOutState.confirmationQuestionOption === "first"
          ? "PRIMEROS"
          : "ÚLTIMOS"
      } no coinciden con el documento`;
      dispatchSignOutAction({ type: "setError", errorMessage });
    } else if (signOutState.selectedUser) {
      try {
        await signOut(signOutState.selectedUser.id);
        createSuccessNotification(
          `${NOTIFICATION_MESSAGES.SIGN_OUT_SUCCESSFUL_MESSAGE} ${signOutState.selectedUser.fullName}`
        );
        dispatchSignOutAction({ type: "completedSignOutInRegistration" });
        const data = await fetchAll({
          extended_user__present: true,
        });
        dispatchSignOutAction({ type: "setUserList", fetchedList: data });
      } catch (error) {
        createErrorNotification(
          `${NOTIFICATION_MESSAGES.SIGN_OUT_FAILED_MESSAGE} ${signOutState.selectedUser.fullName}`
        );
      }
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom color="primary">
        {CONTAINERS.USER_SIGN_OUT_TITLE}
      </Typography>
      {signOutState.selectedUser && (
        <SignInOutControlConfirmationDialog
          title={CONTAINERS.USER_SIGN_OUT_TITLE}
          errorMessage={signOutState.errorMessage}
          open={Boolean(signOutState.selectedUser)}
          onCancel={() => dispatchSignOutAction({ type: "cancelConfirmation" })}
          onConfirm={onConfirm}
          answer={signOutState.answer}
          fullName={signOutState.selectedUser.fullName}
          questionType={signOutState.confirmationQuestionOption}
          setTextAnswer={(text) =>
            dispatchSignOutAction({ type: "setAnswerText", text })
          }
        />
      )}
      <SignInOutControlList
        list={signOutState.userList}
        handleOnSelectEscort={onSelectUser}
      />
    </Box>
  );
};

export default SignOutControlContainer;
