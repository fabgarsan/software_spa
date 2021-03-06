import React, { useEffect, useReducer } from "react";
import {
  useCheckPermissions,
  useCRUDGenericApiCall,
  useNotifications,
} from "@hooks/index";
import { Escort } from "@dto/escorts";
import {
  API_ROUTES,
  CONTAINERS,
  NOTIFICATION_MESSAGES,
  PERMISSION_INSTANCES,
} from "@utils/constants";
import {
  CommonLayout,
  SignInOutControlConfirmationDialog,
  SignInOutControlList,
} from "@components/index";

import {
  reducerSignInOut,
  signInOutInitial,
} from "@components/SignInOutControlList/SignInOutControlList.reducer";
import { signOut } from "@api/index";
import { trackPromise } from "react-promise-tracker";

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

  const canView = useCheckPermissions([
    PERMISSION_INSTANCES.SIGN_IN_CONTROL.MADE_SIGN_OUT_OTHERS,
  ]);
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
    if (canView) handleOnFetch();
    return () => {};
  }, [fetchAll, canView]);

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
          : "??LTIMOS"
      } no coinciden con el documento`;
      dispatchSignOutAction({ type: "setError", errorMessage });
    } else if (signOutState.selectedUser) {
      try {
        await trackPromise(signOut(signOutState.selectedUser.id));
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
    <CommonLayout title={CONTAINERS.USER_SIGN_OUT_TITLE} canView={canView}>
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
    </CommonLayout>
  );
};

export default SignOutControlContainer;
