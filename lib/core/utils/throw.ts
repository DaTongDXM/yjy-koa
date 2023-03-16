export default function (flag, message) {
  if (!flag) {
    throw new Error(message);
  }
}