export default function BuildBaseUrl() {
  const url = window.location.href;
  const arr = url.split("/");

  // <protocol:> + "//" + domain & port
  return arr[0] + "//" + arr[2];
}
