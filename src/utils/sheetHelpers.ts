// The functions are used to take soem data from a spreadsheet and format them tfor the homepage blocks
export const getSheetValuesByTitle = (data, title) =>
  data.find((sheet) => sheet.title === title).values;

export const formatValues = (values) =>
  values
    .filter((value) => value[0] && value[0] !== "")
    .map((value) => value[0]);

export const getAverageValue = (values) => {
  const total = formatValues(values).reduce((a, b) => Number(a) + Number(b), 0);

  return total / values.length;
};

export const renderStars = (number) => {
  let stars = "";
  for (let i = 0; i <= number; i++) {
    stars += "★";
  }

  for (let i = 0; i <= 6 - stars.length; i++) {
    stars += "☆";
  }

  return stars;
};

export const renderList = (values) =>
  values.map((text) => ({
    type: "section",
    text: {
      type: "mrkdwn",
      text: `◆ ${text.charAt(0).toUpperCase() + text.slice(1)}`,
    },
  }));
