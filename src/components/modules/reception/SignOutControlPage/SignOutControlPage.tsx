import React, { useReducer } from "react";
import { useCheckPermissions } from "@hooks/index";
import { CONTAINERS, PERMISSION_INSTANCES } from "@utils/constants";

import { SignInOutControlConfirmationDialog } from "../SignInOutControlConfirmationDialog";
import { SignInOutControlList } from "../SignInOutControlList";
import { CommonLayout, QueryErrorBoundary } from "@components/shared";

import {
  usePresentUsersQuery,
  useSignOutMutation,
} from "./SignOutControlPage.hooks";

import {
  reducerSignInOut,
  signInOutInitial,
} from "@components/modules/reception/SignInOutControlList/SignInOutControlList.reducer";
import { ExtendedUser } from "@dto/users";

const generateQuestion = () => {
  const option: ("first" | "last")[] = ["first", "last"];
  return option[Math.floor(Math.random() * option.length)];
};

export const SignOutControlPage = () => {
  const [signOutState, dispatchSignOutAction] = useReducer(
    reducerSignInOut<ExtendedUser>(),
    signInOutInitial
  );
  const presentUsersQueryResult = usePresentUsersQuery();
  const { data: presentUsersList, refetch: refetchPresentUsers } =
    presentUsersQueryResult;

  const { mutate: signOutMutate } = useSignOutMutation({
    onSuccessCallback: refetchPresentUsers,
    userFullName: signOutState?.selectedUser?.fullName || "",
  });

  const canView = useCheckPermissions([
    PERMISSION_INSTANCES.SIGN_IN_CONTROL.MADE_SIGN_OUT_OTHERS,
  ]);

  const onSelectUser = (user: ExtendedUser) => {
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
      signOutMutate(signOutState.selectedUser.id);
      dispatchSignOutAction({ type: "completedSignOutInRegistration" });
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
      <QueryErrorBoundary
        queries={[presentUsersQueryResult]}
        loadOnFetching={true}
      >
        <SignInOutControlList
          list={presentUsersList || []}
          handleOnSelectUser={onSelectUser}
        />
      </QueryErrorBoundary>
    </CommonLayout>
  );
};
