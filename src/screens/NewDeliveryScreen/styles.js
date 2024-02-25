import { StyleSheet, Platform } from 'react-native';
import { Padding, FontFamily, Border } from "../../../GlobalStyles";

export default StyleSheet.create({
  backBtn: {
    padding: 10,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  backBtn1: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  dateInputDatePickerLabel: {
    color: "rgba(0, 0, 0, 0)",
  },
  dateInputDatePickerCaption: {
    color: "rgba(0, 0, 0, 0)",
  },
  dateInputDatePickerPlaceHolder: {
    fontWeight: "500",
    // fontFamily: "Inter-Medium",
    color: "#a9a9a9",
    fontSize: 12,
  },
  dateInputDatePickerValue: {},
  postButtonBtn: {
    color: 'white',
    fontSize: 18,
    fontWeight: "500",
    // fontFamily: "Inter-Medium",
    paddingHorizontal: 12,
  },
  postButtonBtn1: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  postGroupScrollViewContent: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  frameFlexBox: {
    justifyContent: "center",
    alignSelf: "stretch",
  },
  inputFlexBox: {
    maxHeight: 50,
    minWidth: 200,
    paddingVertical: Padding.p_xs,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  frame1: {
    width: 232,
    height: 50,
    flexDirection: "row",
    overflow: "hidden",
  },
  frame: {
    overflow: "hidden",
  },
  sourceInput: {
    paddingHorizontal: 8,
    backgroundColor: "white",

  },
  destinationInput: {
    paddingHorizontal: 8,
    marginTop: 10,
    backgroundColor: "white"
  },
  sizeInput: {
    paddingHorizontal: 8,
    marginTop: 10,
    backgroundColor: "white"
  },
  dateInput: {
    marginTop: 10,
  },
  inputs: {
    paddingHorizontal: 24,
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
  },
  postButton: {
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4b6cb7",
    paddingHorizontal: 20,
  },
  postGroup: {
    alignSelf: "center",
    flex: 1, // Added
    backgroundColor: "#f1f1f1",
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    elevation: 4,
    shadowOpacity: 1,
    padding: 15,
    borderRadius: Border.br_6xl,
  },
  frame2: {
    marginTop: 20,
    overflow: "hidden",
    justifyContent: 'center',
    alignSelf: "stretch",
  },
  addDrive: {
    backgroundColor: "#fff",
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: "center",
    overflow: "hidden",
  },
  buttonContainer: {
    paddingHorizontal: 20,
    alignItems: "center",
  },
  picker: {
    marginTop: 10,
    width: "30%",
    fontSize:16,
    borderColor: 'gray',
    borderWidth: 0,
  },
});