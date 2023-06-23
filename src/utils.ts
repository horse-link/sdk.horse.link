const getIndexFromId = (id: string): number => {
  const parts = id.split("_");
  return Number(parts[parts.length - 1]);
};
