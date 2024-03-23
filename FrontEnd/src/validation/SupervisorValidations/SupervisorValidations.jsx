
export const validateForm = (reportType, selectedGroup, Mark1, Mark2, Mark3, Mark4) => {
    const errors = {};
  
    // Validate reportType
    if (!reportType) {
      errors.reportType = 'Report type is required';
    }
  
    // Validate selectedGroup
    if (!selectedGroup) {
      errors.selectedGroup = 'Group is required';
    }
  
    // Validate Mark1
    if (!Mark1) {
      errors.Mark1 = 'Mark 1 is required';
    } else if (isNaN(Mark1) || Mark1 < 0 || Mark1 > 100) {
      errors.Mark1 = 'Mark 1 must be a number between 0 and 100';
    }
  
    // Validate Mark2
    if (!Mark2) {
      errors.Mark2 = 'Mark 2 is required';
    } else if (isNaN(Mark2) || Mark2 < 0 || Mark2 > 100) {
      errors.Mark2 = 'Mark 2 must be a number between 0 and 100';
    }
  
    // Validate Mark3
    if (!Mark3) {
      errors.Mark3 = 'Mark 3 is required';
    } else if (isNaN(Mark3) || Mark3 < 0 || Mark3 > 100) {
      errors.Mark3 = 'Mark 3 must be a number between 0 and 100';
    }
  
    // Validate Mark4
    if (!Mark4) {
      errors.Mark4 = 'Mark 4 is required';
    } else if (isNaN(Mark4) || Mark4 < 0 || Mark4 > 100) {
      errors.Mark4 = 'Mark 4 must be a number between 0 and 100';
    }
  
    return errors;
  };
  