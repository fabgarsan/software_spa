import React, { useReducer } from "react";
import { CONTAINERS, PERMISSION_INSTANCES } from "@utils/index";
import { Box } from "@mui/material";
import { useCheckPermissions } from "@hooks/index";
import {
  reducerSignInOut,
  signInOutInitial,
} from "@components/modules/reception/SignInOutControlList/SignInOutControlList.reducer";

import { ControlSearch } from "./ControlSearch";
import { SignInOutControlConfirmationDialog } from "../SignInOutControlConfirmationDialog";
import { SignInOutControlList } from "../SignInOutControlList";

import { CommonLayout, QueryErrorBoundary } from "@components/shared";
import {
  useAbsentUsersQuery,
  useSignInMutation,
} from "@components/modules/reception/SignInControlPage/SignInControlPage.hooks";
import { ExtendedUser } from "@dto/users";

const generateQuestion = () => {
  const option: ("first" | "last")[] = ["first", "last"];
  return option[Math.floor(Math.random() * option.length)];
};

export const SignInControlPage = () => {
  const [signInState, dispatchSignInAction] = useReducer(
    reducerSignInOut<ExtendedUser>(),
    signInOutInitial
  );

  const absentUsersQueryResult = useAbsentUsersQuery({
    search: signInState.textToSearch,
    enabled: signInState.textToSearch !== "",
  });

  const { data: absentUsersList, refetch: refetchAbsentUsers } =
    absentUsersQueryResult;

  const { mutate: signInMutate } = useSignInMutation({
    onSuccessCallback: refetchAbsentUsers,
    userFullName: signInState?.selectedUser?.fullName || "",
  });

  const onSearch = async () => {
    if (signInState.searchText === "") {
      dispatchSignInAction({ type: "clearFetchedList" });
    } else if (signInState.searchText === signInState.textToSearch) {
      await refetchAbsentUsers();
    } else {
      dispatchSignInAction({ type: "search" });
    }
  };
  const onSelectUser = (user: ExtendedUser) => {
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
      signInMutate(signInState.selectedUser.id);
      dispatchSignInAction({ type: "completedSignOutInRegistration" });
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
        <ControlSearch
          onSearch={onSearch}
          searchText={signInState.searchText}
          handleOnSearchTextChange={(text) =>
            dispatchSignInAction({ type: "setSearchText", text })
          }
        />
        <QueryErrorBoundary queries={[absentUsersQueryResult]}>
          <SignInOutControlList
            list={absentUsersList || []}
            handleOnSelectUser={onSelectUser}
          />
        </QueryErrorBoundary>
      </Box>
    </CommonLayout>
  );
};
