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
        }else{
            const scheduleIDPattern = /^SP[0-9]+$/;
            if (scheduleIDPattern.test(ScheduleID) == false){
                errors.ScheduleID = "ScheduleID should be in the format SPXXXX";
        }

        
        if(validator.isEmpty(GroupID)){
            errors.GroupID = "GroupID is required";
        }

        

    
    }

    
};
export default validateSchedulePresentation;