import { toast } from 'react-toastify';

export const toasty = (pendingMsg, successMsg, errorMsg) => {
  const id = toast.loading(pendingMsg);

  if (successMsg && !errorMsg) {
    toast.update(id, {
      // render: `${successMsg} successfully 👌`,
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
    return;
  }
  if (errorMsg && !successMsg) {
    toast.update(id, {
      ender: `${errorMsg} ❌`,
      type: 'error',
      isLoading: false,
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }
};
