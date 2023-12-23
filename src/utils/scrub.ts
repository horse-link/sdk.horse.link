export const scrub = (name: string):string => {
  return name.replace(/"("[A-Z]{3}")"/g, "").trim();
};
