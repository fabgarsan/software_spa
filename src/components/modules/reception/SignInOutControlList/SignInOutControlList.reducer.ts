export interface SignInOutState<L> {
  userList: L[];
  selectedUser: L | null;
  openConfirmation: boolean;
  searchText: string;
  textToSearch: string;
  confirmationQuestionOption: "first" | "last" | null;
  correctAnswer: string | null;
  answer: string;
  errorMessage: string;
}

export type SignInOutActions<L> =
  | { type: "setUserList"; fetchedList: L[] }
  | { type: "cancelConfirmation" }
  | { type: "clearFetchedList" }
  | { type: "setError"; errorMessage: string }
  | { type: "completedSignOutInRegistration" }
  | { type: "setSearchText"; text: string }
  | { type: "setAnswerText"; text: string }
  | { type: "search" }
  | { type: "selectUser"; user: L; option: "first" | "last"; answer: string };

export const signInOutInitial = {
  userList: [],
  selectedUser: null,
  openConfirmation: false,
  searchText: "",
  textToSearch: "",
  confirmationQuestionOption: null,
  correctAnswer: null,
  answer: "",
  errorMessage: "",
};

export const reducerSignInOut = <T>() => {
  const reducer: React.Reducer<SignInOutState<T>, SignInOutActions<T>> = (
    state,
    action
  ): SignInOutState<T> => {
    switch (action.type) {
      case "selectUser":
        return {
          ...state,
          selectedUser: action.user,
          openConfirmation: true,
          confirmationQuestionOption: action.option,
          answer: "",
          correctAnswer: action.answer.toString(),
          errorMessage: "",
        };
      case "setUserList":
        return {
          ...state,
          userList: action.fetchedList,
        };
      case "clearFetchedList":
        return {
          ...state,
          userList: [],
        };
      case "setSearchText":
        return {
          ...state,
          searchText: action.text,
        };
      case "setAnswerText":
        return {
          ...state,
          answer: action.text,
        };
      case "cancelConfirmation":
        return {
          ...state,
          openConfirmation: false,
          selectedUser: null,
          answer: "",
          errorMessage: "",
        };
      case "completedSignOutInRegistration":
        return {
          ...state,
          openConfirmation: false,
          selectedUser: null,
          answer: "",
          userList: [],
          errorMessage: "",
        };
      case "setError":
        return {
          ...state,
          errorMessage: action.errorMessage,
        };
      case "search":
        return {
          ...state,
          textToSearch: state.searchText,
        };
      default:
        throw new Error();
    }
  };
  return reducer;
};
