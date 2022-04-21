// Axios
import { AxiosError, AxiosResponse } from 'axios';

// store
import { addModal } from '../ErrorInterceptorModal/actions';
import { dispatch } from '..';

//sentry
import { captureException } from '@sentry/react';

import { IShowRespErrorsProps } from './models';
import { logoutAction } from '../Auth/actions';

const onLogOut = () => dispatch(logoutAction())

const showErrorModal = (title: string) => dispatch(addModal(title));

const showRespErrors = ({ response, message }: IShowRespErrorsProps) => {
  if (response?.data?.errors?.length) {
    response.data.errors.forEach(({ detail, title }: AxiosResponse['data']) => {
      detail && showErrorModal(detail);
      title && showErrorModal(title);
    });
  } else if (response?.data?.message) {
    response.data.message && showErrorModal(response?.data?.message);
  } else {
    message && showErrorModal(message);
  }
};

export const apiErrorHandler = (error: Error & AxiosError) => {
  switch (error?.response?.status) {
    case 401: {
      onLogOut();
      break;
    }
    case 404: {
      captureException(error);
      // TODO some page or modal
      break;
    }
    default: {
      showRespErrors(error);
    }
  }
  return Promise.reject(error);
};
