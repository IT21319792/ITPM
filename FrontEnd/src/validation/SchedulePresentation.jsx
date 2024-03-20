import validator from 'validator';

const validateSchedulePresentation = (data) => {
    let errors = {};
    const{
        ScheduleID,
        GroupID,
        date,
        timeDuration,
        location,
        topic,
        examiners
       }

       if(validator.isEmpty(ScheduleID)){
        errors.ScheduleID = "ScheduleID is required";
    }else if(validator.isInt(ScheduleID)){
        errors.ScheduleID = "ScheduleID should not be integer";
    }else if{
        const scheduleIDPattern = /^SP[0-9]+$/;
        IdleDeadline(scheduleIDPattern.test(ScheduleID) == false){
            errors.ScheduleID = "ScheduleID should be in the format SPXXXX";
        }
    }

    
};
export default validateSchedulePresentation;