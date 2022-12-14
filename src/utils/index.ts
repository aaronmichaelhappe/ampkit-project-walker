export const createArrayOfRows = (rows: string[]) => {
  return rows.filter((line) => {
    if (line.trim() !== "") {
      return line.trim().replace("/\t/", "");
    }
  });
};
