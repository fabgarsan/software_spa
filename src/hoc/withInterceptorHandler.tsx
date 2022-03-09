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

type DjangoResponseDataError = {
  detail: string;
};

const withInterceptorHandler = <P extends WithInterceptorHandlerProps>(
  WrappedComponent: React.ComponentType<P>
) => {
  return (props: Omit<P, keyof WithInterceptorHandlerProps>) => {
    const { createErrorNotification } = useNotifications();
    const {
      auth: { isAuthenticated, error: authError },
      logIn,
      setIsNotAuthenticated,
    } = useAuth();
    const handleResponseError = useCallback(
      (error: AxiosError<DjangoResponseDataError>) => {
        const { response, message } = error;
        if (response) {
          const {
            status,
            data: { detail: errorDetail },
          } = response;
          switch (status) {
            case 400:
              if (errorDetail) {
                createErrorNotification(errorDetail);
              }
              break;
            case 401:
              setIsNotAuthenticated();
              createErrorNotification(errorDetail);
              mainAxiosClientManager.removeToken();
              break;
            case 403:
              createErrorNotification(errorDetail);
              break;
            case 500:
              if (message) alert(message);
              break;
            default:
              if (errorDetail) {
                createErrorNotification(errorDetail);
              }
              console.log(`ERROR ${status}`, errorDetail);
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
          const { params, data } = request;
          let newRequest = { ...request };
          if (request.headers["Content-Type"] === "multipart/form-data")
            return request;
          if (params)
            newRequest = { ...newRequest, params: decamelizeKeys(params) };

          if (data) newRequest = { ...newRequest, data: decamelizeKeys(data) };

          return newRequest;
        },
        async (error) => {
          await handleRequestError(error);
          // eslint-disable-next-line @typescript-eslint/no-throw-literal
          throw camelizeKeys(error);
        }
      );
      mainAxiosClientManager.client.interceptors.response.use(
        (response) => {
          const { data, headers } = response;
          let newResponse = { ...response };
          if (data && headers["content-type"] === "application/json") {
            newResponse = { ...newResponse, data: camelizeKeys(data) };
          }
          return newResponse;
        },
        async (error: AxiosError<DjangoResponseDataError>) => {
          await handleResponseError(error);
          // eslint-disable-next-line @typescript-eslint/no-throw-literal
          throw camelizeKeys(error);
        }
      );
    }, [handleResponseError, handleRequestError]);

    return (
      <ThemeProvider theme={theme}>
        <LoadingOverlay />
        <Notify />
        {!isAuthenticated ? (
          <FormSignIn logIn={logIn} errors={authError} />
        ) : (
          <WrappedComponent {...(props as P)} />
        )}
      </ThemeProvider>
    );
  };
};
export default withInterceptorHandler;
