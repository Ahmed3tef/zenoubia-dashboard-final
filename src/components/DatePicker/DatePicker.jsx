import React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ImCalendar } from 'react-icons/im';
import { MdArrowLeft, MdArrowRight } from 'react-icons/md';
const DatePick = ({ value, setValue, label }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        value={value}
        onChange={newValue => {
          setValue(newValue);
        }}
        // showDaysOutsideCurrentMonth
        components={{
          OpenPickerIcon: ImCalendar,
          RightArrowIcon: MdArrowRight,
          LeftArrowIcon: MdArrowLeft,
        }}
        InputProps={{
          sx: {
            '& .MuiIconButton-root svg': {
              color: 'black',
              fontSize: '2rem',
            },
          },
        }}
        PopperProps={{
          sx: {
            '& .MuiPaper-root': {
              border: '2px solid var(--color-main-darkest)',
              backgroundColor: 'var(--color-main-darker)',
              borderRadius: '1rem',
              overflow: 'hidden',
            },
            '& .MuiPickersCalendarHeader-root div': {
              fontFamily: 'Merriweather, serif',
              fontSize: '1.8rem',
              backgroundColor: 'var(--color-main-darker)',
              color: 'white',
              // marginTop: '0',
              // marginBottom: '0',
              // paddingTop: '16px',
              // paddingBottom: '8px',
            },
            '& .MuiPickersCalendarHeader-root .MuiButtonBase-root svg': {
              fontSize: '2rem',
              fill: 'white',
              // marginTop: '0',
              // marginBottom: '0',
              // paddingTop: '16px',
              // paddingBottom: '8px',
            },
            '& .MuiPickersDay-root': {
              fontFamily: 'Merriweather, serif',
              fontSize: '1.4rem',
              color: 'var(--color-main-darkest)',
            },
            '& .MuiDayPicker-weekDayLabel': {
              fontSize: '1.8rem',
              color: 'var(--color-black)',
              fontFamily: 'Merriweather, serif',
            },
            '& .MuiPickersFadeTransitionGroup-root': {
              backgroundColor: 'white',
            },
            '& .MuiDayPicker-header': {
              marginTop: '2rem',
            },
          },
        }}
        renderInput={params => (
          <TextField
            {...params}
            sx={{
              '& .MuiTextField-root': {
                fontSize: '1.6rem',
              },
              '& .MuiInputBase-root': {
                // fontSize: '1.6rem',
                color: 'var(--color-black)',
                width: '40rem',
                backgroundColor: 'var(--color-alt)',
                border: '2px solid var(--color-main-darker)',
              },
              '& .MuiFormLabel-root': {
                fontFamily: 'Merriweather, serif',
                fontSize: '1.2rem',
                color: 'var(--color-black)',
                outline: 'none',
              },
              '& .MuiOutlinedInput-root:active,& .MuiOutlinedInput-root:hover, & .MuiOutlinedInput-root:focus': {
                outline: 'none',
              },
            }}
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default DatePick;
