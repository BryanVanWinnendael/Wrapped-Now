export const fetcher = async (
  url: string,
  method: string,
  acces_token: string
) => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + url, {
    method: method,
    headers: {
      Authorization: "Bearer " + acces_token,
      "Content-Type": "application/json",
    },
  })
    .then(function (response) {
      return response.json()
    })
    .catch(function (error) {
      console.log(
        "There has been a problem with your fetch operation: " + error.message
      )
      throw error
    })
}
