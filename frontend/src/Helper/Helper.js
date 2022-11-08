import { message } from "antd";

export const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  return false;
};

export const toRangeObject = (momentArray) => {
	return {
		start: momentArray[0],
		end: momentArray[1],
	}
}

// compare function for sorting
export const CompareNames = (a, b) => {
  const nameA = a.title.toLowerCase();
  const nameB = b.title.toLowerCase();
  if (nameA < nameB) return -1;
  if (nameA > nameB) return 1;
  return 0;
};