import moment from "moment";

export const ValidateLogin = (data) => {
  const error = {};
  const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const passwordPattern = /^.*[a-z]+.*$/;

  if (data.email === null) {
    error.email = "Bạn chưa nhập Email";
  } else if (!emailPattern.test(data.email)) {
    error.email = "Email không chính xác";
  } else {
    error.email = "";
  }

  if (data.password === null) {
    error.password = "Bạn chưa nhập Password";
  } else if (!passwordPattern.test(data.password)) {
    error.password = "Password không chính xác";
  } else {
    error.password = "";
  }

  if (data.repeatPassword && data.repeatPassword === data.password) {
    error.repeatPassword = "";
  } else {
    error.repeatPassword = "Mật khẩu chưa trùng khớp";
  }
  return error;
};

export const ValidateCreateTasks = (data) => {
  const error = {};
  const namePattern = /^.*[a-z]+.*$/;
  const compareDate =
    moment(data.start_time).valueOf() - moment(data.end_time).valueOf();
  if (data.name === null) {
    error.name = "* Did you forget something?";
  } else if (!namePattern.test(data.name)) {
    error.name = "* Did you forget something?";
  } else {
    error.name = "";
  }

  if (data.end_time === null) {
    error.end_time = "* Did you forget something?";
  } else if (compareDate > 0) {
    error.end_time = "* Invalid end time!";
  } else {
    error.end_time = "";
  }
  return error;
};
