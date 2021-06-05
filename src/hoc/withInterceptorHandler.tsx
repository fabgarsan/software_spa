import React, { useEffect, useCallback } from "react";
import { mainAxiosClientManager } from "@clients/axios";
import { useAuth, useNotifications } from "@hooks/index";
import { Notify, SignInForm } from "@components/index";
import { Box, Typography } from "@material-ui/core";

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
      (error: any) => {
        switch (error.response.status) {
          case 401:
            setIsNotAuthenticated();
            createErrorNotification(error.response.data.detail);
            mainAxiosClientManager.removeToken();
            break;
          case 403:
            createErrorNotification(error.response.data.detail);
            break;
          default:
            console.log(
              `ERROR ${error.response.status}`,
              error.response.data.detail
            );
            break;
        }
      },
      [createErrorNotification, setIsNotAuthenticated]
    );

    const handleRequestError = useCallback((error: any) => {
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
          return request;
        },
        async (error) => {
          await handleRequestError(error);
          throw error;
        }
      );
      mainAxiosClientManager.client.interceptors.response.use(
        (response) => {
          return response;
        },
        async (error: any) => {
          await handleResponseError(error);
          throw error;
        }
      );
    }, [handleResponseError, handleRequestError]);
    if (auth.loading) {
      return (
        <Box mt={5} m="auto" textAlign="center">
          <Typography color="textSecondary" variant="h5" paragraph>
            Loading...
          </Typography>
        </Box>
      );
    }

    return (
      <>
        <Notify />
        {!auth.isAuthenticated ? (
          <SignInForm logIn={logIn} errors={auth.error} />
        ) : (
          <WrappedComponent {...(props as P)} />
        )}
      </>
    );
  };
};
export default withInterceptorHandler;
