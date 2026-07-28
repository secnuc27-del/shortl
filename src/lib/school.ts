export const getSchoolAge = () => {
  // Fundação: 3 de julho de 1969
  const foundation = new Date(1969, 6, 3); // Mês é zero-indexed, então 6 = Julho
  const today = new Date();
  let age = today.getFullYear() - foundation.getFullYear();
  
  if (
    today.getMonth() < foundation.getMonth() ||
    (today.getMonth() === foundation.getMonth() && today.getDate() < foundation.getDate())
  ) {
    age--;
  }
  return age;
};

export const isSchoolAnniversary = () => {
  const today = new Date();
  return today.getMonth() === 6 && today.getDate() === 3; // 6 = Julho
};
