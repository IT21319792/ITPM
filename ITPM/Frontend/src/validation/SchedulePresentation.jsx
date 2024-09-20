import validator from "validator";

const SchedulePresentationValidation = (data) => {
  let errors = {};
  const {
    ScheduleID,
    GroupID,
    date,
    timeDuration,
    location,
    topic,
    examiners,
  } = data; // You forgot to assign 'data' to the destructured variables.

  if (validator.isEmpty(ScheduleID)) {
    errors.ScheduleID = "ScheduleID is required";
  } else if (validator.isInt(ScheduleID)) {
    errors.ScheduleID = "ScheduleID should not be an integer";
  } else {
    const scheduleIDPattern = /^SP[0-9]+$/;
    if (scheduleIDPattern.test(ScheduleID) === false) {
      errors.ScheduleID = "ScheduleID should be in the format SPXXXX";
    }
  }

  if (validator.isEmpty(GroupID)) {
    errors.GroupID = "GroupID is required";
  }

  if (validator.isEmpty(date)) {
    errors.date = "Date is required";
  }

  if (validator.isEmpty(timeDuration)) {
    errors.timeDuration = "Time Duration is required";
  } else if (timeDuration === undefined) {
    errors.timeDuration = "Please enter correct time duration";
  } else {
    const pattern =
      /^(0?[1-9]|1[0-2]):([0-5][0-9])\s(?:AM|PM)\s-\s(0?[1-9]|1[0-2]):([0-5][0-9])\s(?:AM|PM)$/;
    if (pattern.test(timeDuration) === false) {
      errors.timeDuration =
        "Please provide a valid time duration (e.g., 08:30 AM - 09:00 AM)";
    }
  }

  // location should start with capital letter with 3 more integeres only maximum size should be 4
  if (location.length > 4) {
    errors.location = "Location should not be more than 4 characters";
  } else{
    const pattern = /^[A-Z]{1}[0-9]{3}$/;
    if (pattern.test(location) === false) {
      errors.location = "Please provide a valid location (e.g., A123)";
    }
  }

  // if (validator.isEmpty(location)) {
  //   errors.location = "Location is required";
  // } else if (validator.isInt(location)) {
  //   errors.location = "Location should not be an integer";
  // }else{
  //   const pattern = /^[a-zA-Z0-9\s,.'-]{4,}$/;
  //   if (pattern.test(location) === false) {
  //     errors.location = "Please provide a valid location";
  //   }
  // }

  if (validator.isEmpty(topic)) {
    errors.topic = "Topic is required";
  }

  if (examiners.some(examiner => examiner === "Select Examiner")) {
    errors.examiners = "Please select examiners";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};

export default SchedulePresentationValidation;
