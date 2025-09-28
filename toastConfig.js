// toastConfig.js
import React from "react";
import { BaseToast, ErrorToast } from "react-native-toast-message";

export const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: "green" }}
      text1Style={{ fontSize: 16, fontWeight: "bold" }}
      text2Style={{ fontSize: 14 }}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: "red" }}
      text1Style={{ fontSize: 16, fontWeight: "bold" }}
      text2Style={{ fontSize: 14 }}
    />
  ),
};
