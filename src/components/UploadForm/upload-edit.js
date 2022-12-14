import axios from 'axios';
import { APIBase } from '../../store/reducers/api';
import { toast } from 'react-toastify';

export default function uploadAndEdit(
  updatedPage,
  route,
  fd,
  config,
  goBackHandler,
  msg,
  updatedType
) {
  const id = toast.loading('');

  if (updatedPage && updatedType === 'image') {
    axios
      .patch(`${APIBase}${route}/updateimage`, fd, config)
      .then((res) => {
        toast.update(id, {
          // render: `${msg} updated successfully 👌`,
          // render: '✅',
          render: '',
          type: 'success',
          isLoading: false,
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        goBackHandler();
      })
      .catch((err) => {
        const errMsg = err.response.data;
        toast.update(id, {
          render: `${errMsg} ⛔`,
          type: 'error',
          isLoading: false,
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      });
    return;
  }
  if (updatedPage && updatedType === 'text') {
    axios
      .patch(`${APIBase}${route}/update`, fd, config)
      .then((res) => {
        toast.update(id, {
          // render: `${msg} updated successfully 👌`,
          // render: '✅',
          render: '',
          type: 'success',
          isLoading: false,
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        goBackHandler();
      })
      .catch((err) => {
        const errMsg = err.response.data.message;
        toast.update(id, {
          render: `${errMsg} ⛔`,
          type: 'error',
          isLoading: false,
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      });
    return;
  }
  if (updatedPage) {
    axios
      .patch(`${APIBase}${route}/update`, fd, config)
      .then((res) => {
        toast.update(id, {
          // render: `${msg} updated successfully 👌`,
          // render: '✅',
          render: '',
          type: 'success',
          isLoading: false,
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        if (goBackHandler) goBackHandler();

        return;
      })
      .catch((err) => {
        // console.log(err);
        const errMsg =
          err.response && err.response.data && err.response.data.message
            ? err.response.data.message
            : err.response;
        toast.update(id, {
          render: `${errMsg} ⛔`,
          type: 'error',
          isLoading: false,
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      });
    return;
  }
  if (
    (!updatedPage && route === 'governoment') ||
    route === 'city' ||
    route === 'country'
  ) {
    return axios
      .post(`${APIBase}${route}`, fd, config)
      .then((res) => {
        toast.update(id, {
          // render: `${msg} uploaded successfully 👌`,
          // render: '✅',
          render: '',
          type: 'success',
          isLoading: false,
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        if (goBackHandler) goBackHandler();
      })
      .catch((err) => {
        const errMsg = err.response.data.message;
        toast.update(id, {
          render: `${errMsg} ⛔`,
          type: 'error',
          isLoading: false,
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      });
  }
  if (!updatedPage) {
    axios
      .post(`${APIBase}${route}/create`, fd, config)
      .then((res) => {
        toast.update(id, {
          // render: `${msg} uploaded successfully 👌`,
          // render: '✅',
          render: '',
          type: 'success',
          isLoading: false,
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        if (goBackHandler) goBackHandler();
      })
      .catch((err) => {
        const errMsg = err.response.data.message;
        toast.update(id, {
          render: `${errMsg} ⛔`,
          type: 'error',
          isLoading: false,
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      });
  }
}
