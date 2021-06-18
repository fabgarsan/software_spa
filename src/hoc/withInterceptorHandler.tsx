import React, { useEffect, useCallback } from "react";
import { AxiosError } from "axios";
import { mainAxiosClientManager } from "@clients/axios";
import { useAuth, useNotifications } from "@hooks/index";
import { Notify, FormSignIn, LoadingOverlay } from "@components/index";
import { theme } from "@theme/index";
import { ThemeProvider } from "@material-ui/core/styles";
import { camelizeKeys, decamelizeKeys } from "humps";

// https://morioh.com/p/8e8b33c25ea1 for camelize humps

type WithInterceptorHandlerProps = {
  loading?: boolean;
};

const withInterceptorHandler = <P extends WithInterceptorHandlerProps>(
  WrappedComponent: React.ComponentType<P>
) => {
  return (props: Omit<P, keyof WithInterceptorHandlerProps>) => {
    const { createErrorNotification } = useNotifications();
    const { auth, logIn, setIsNotAuthenticated } = useAuth();
    const handleResponseError = useCallback(
      (error: AxiosError) => {
        const { response, message } = error;
        if (response) {
          switch (response.status) {
            case 400:
              if (response.data.detail) {
                createErrorNotification(response.data.detail);
              }
              break;
            case 401:
              setIsNotAuthenticated();
              createErrorNotification(response.data.detail);
              mainAxiosClientManager.removeToken();
              break;
            case 403:
              createErrorNotification(response.data.detail);
              break;
            case 500:
              if (message) alert(message);
              break;
            default:
              if (response.data.detail) {
                createErrorNotification(response.data.detail);
              }
              console.log(
                `ERROR ${response?.status}`,
                error.response?.data.detail
              );
              break;
          }
        } else if (message) {
          alert(message);
        } else {
          console.log("FUE OTRO ERROR", error);
        }
      },
      [createErrorNotification, setIsNotAuthenticated]
    );

    const handleRequestError = useCallback((error: AxiosError) => {
      switch (error.request.status) {
        case 500:
          break;
        default:
          break;
      }
    }, []);

    useEffect(() => {
      mainAxiosClientManager.client.defaults.params = {};
      mainAxiosClientManager.client.interceptors.request.use(
        (request) => {
          if (request.headers["Content-Type"] === "multipart/form-data")
            return request;
          if (request.params) {
            request.params = decamelizeKeys(request.params);
          }
          if (request.data) {
            request.data = decamelizeKeys(request.data);
          }
          return request;
        },
        async (error) => {
          await handleRequestError(error);
          // eslint-disable-next-line @typescript-eslint/no-throw-literal
          throw camelizeKeys(error);
        }
      );
      mainAxiosClientManager.client.interceptors.response.use(
        (response) => {
          if (
            response.data &&
            response.headers["content-type"] === "application/json"
          ) {
            response.data = camelizeKeys(response.data);
          }
          return response;
        },
        async (error: any) => {
          await handleResponseError(error);
          // eslint-disable-next-line @typescript-eslint/no-throw-literal
          throw camelizeKeys(error);
        }
      );
    }, [handleResponseError, handleRequestError]);
    // }

    return (
      <ThemeProvider theme={theme}>
        <LoadingOverlay />
        <Notify />
        {!auth.isAuthenticated ? (
          <FormSignIn logIn={logIn} errors={auth.error} />
        ) : (
          <WrappedComponent {...(props as P)} />
        )}
      </ThemeProvider>
    );
  };
};
export default withInterceptorHandler;
