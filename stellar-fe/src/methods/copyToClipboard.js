// 🌎 Import library we’re using to handle copying to clipboard
import copy from "copy-to-clipboard";

// 🌎 Copy text to device’s clipboard
export const copyToClipboard = (text) => {
  if (text) {
    copy(text);
  }
};