/**
 * 
 * @param text --- '\n  \n   \n    田中太郎'(example)
 */
export const splitTeachers = (text: string) => {
  const teachers = [];
  text.split('\n').forEach((eachText) => {
    if (eachText.trim() !== '') teachers.push(eachText.trim());
  });
  return teachers;
}

// If dayPeriod like this, '\n  未定    \n  ', return '未定'
export const dayPeriodParser = (text: string) => {
  if (text.includes('\n')) {
    return text.split('\n').find((eachText) => {
      return eachText.trim() !== '';
    }).trim();
  } else {
    return text;
  }
}