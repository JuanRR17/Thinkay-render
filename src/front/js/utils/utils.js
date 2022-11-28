export const capitalize = (str) => {
  return str
    .split(" ")
    .map((word, index) => {
      if (word.length > 3 || index === 0) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      } else return word;
    })
    .join(" ");
};

export function getFetch(url) {
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        console.log("Response from GET is not ok");
        throw Error(response.statusText);
      }
      return response.json();
    })
    .catch((error) => {
      console.log("Looks like there was a problem doing GET: \n", error);
      return false;
    });
}

export const makeRequest = async (url) => {
  const res = await getFetch(url);
  const data = await res;
  console.log("data1", data);
  return data;
};
