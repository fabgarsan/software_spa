import React, { useEffect, useCallback, Suspense } from "react";
import { AxiosError } from "axios";
import { mainAxiosClient } from "@clients/axios";
import { useAuth, useNotifications } from "@hooks/index";
import { FormSignIn } from "@components/index";
import { LoadingOverlay, BackdropLoading, Notify } from "@components/shared";
import { theme } from "@theme/index";
import {
  ThemeProvider,
  Theme,
  StyledEngineProvider,
} from "@mui/material/styles";
import { camelizeKeys, decamelizeKeys } from "humps";
import { BrowserRouter } from "react-router-dom";

declare module "@mui/styles/defaultTheme" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

const client = mainAxiosClient.getInstance();

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

        if (!response) {
          return (
            (message && alert(message)) || console.log("ANOTHER ERROR", error)
          );
        }

        const errorResponseMapper: Record<
          number,
          (error: string, status?: number) => void
        > = {
          400: (errorDetail: string) => createErrorNotification(errorDetail),
          401: (errorDetail: string) => {
            setIsNotAuthenticated();
            createErrorNotification(errorDetail);
            mainAxiosClient.removeToken();
          },
          403: (errorDetail: string) => {
            createErrorNotification(errorDetail);
          },
          404: (errorDetail: string) => {
            createErrorNotification(errorDetail);
          },
          500: (errorDetail: string) => {
            createErrorNotification(errorDetail);
          },
          0: (errorDetail: string, status) => {
            if (errorDetail) {
              if (errorDetail === "Token inválido.") {
                createErrorNotification(errorDetail, 15000);
                mainAxiosClient.removeToken();
                setIsNotAuthenticated();
              } else {
                createErrorNotification(errorDetail);
              }
              console.log(`Error ${status}`, errorDetail);
            }
          },
        };

        const {
          status,
          data: { detail: errorDetail },
        } = response;

        let errorResponseFunction = errorResponseMapper[status];

        if (errorResponseFunction)
          errorResponseFunction = errorResponseMapper[0];

        return errorResponseFunction && errorResponseFunction(errorDetail);
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
      client.defaults.params = {};
      client.interceptors.request.use(
        (request) => {
          const { params, data, headers = {} } = request;
          if (headers["Content-Type"] === "multipart/form-data") return request;

          let newRequest = { ...request };
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
      client.interceptors.response.use(
        (response) => {
          const { data, headers } = response;
          if (data && headers["content-type"] === "application/json")
            return { ...response, data: camelizeKeys(data) };
          return response;
        },
        async (error: AxiosError<DjangoResponseDataError>) => {
          await handleResponseError(error);
          // eslint-disable-next-line @typescript-eslint/no-throw-literal
          throw camelizeKeys(error);
        }
      );
    }, [handleResponseError, handleRequestError]);

    return (
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <LoadingOverlay />
          <Notify />
          <BrowserRouter>
            <Suspense fallback={<BackdropLoading isOpen />}>
              {(!isAuthenticated && (
                <FormSignIn logIn={logIn} errors={authError} />
              )) || <WrappedComponent {...(props as P)} />}
            </Suspense>
          </BrowserRouter>
        </ThemeProvider>
      </StyledEngineProvider>
    );
  };
};
export default withInterceptorHandler;
