const runNews = () => {
  fetch(`${NEWS_API.API_ENDPOINT}?function=NEWS_SENTIMENT&tickers=AAPL&apikey=${NEWS_API.API_KEY}`)
  .then(body => body.json())
  .then(res => console.log(res))
}