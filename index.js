function App() {

    const [quotes, setQuotes] = React.useState([]);
    const [randomQuote, setRandomQuote] = React.useState("");
    const [color, setColor] = React.useState("#000")

    React.useEffect(() => {
        async function fetchData() {
            const response = await fetch("https://type.fit/api/quotes")
            const data = await response.json();

            setQuotes(data);
            let randIndex = Math.floor(Math.random() * data.length);
            setRandomQuote(data[randIndex])
        }
        fetchData();
    }, [])

    const getNewQuote = () => {

        const colors = [
            "#16a085",
            "#27ae60",
            "#2c3e50",
            "#f39c12",
            "#e74c3c",
            "#9b59b6",
            "#fb6964",
            "#342224",
            "#472e32",
            "#bdbb99",
            "#77b1a9",
            "#73a857",
        ]
        let randIndex = Math.floor(Math.random() * quotes.length);
        let randColorIndex = Math.floor(Math.random() * colors.length)
        setRandomQuote(quotes[randIndex])
        setColor(colors[randColorIndex])
    }


    return (
        <div style={{ backgroundColor: color, minHeight: "100vh" }}>
            <div className="container pt-5">
                <div className="jumbotron">
                    <div className="card">
                        <div className="card-header border-bottom border-white text-center">Inspiration Quotes</div>
                        <div className="card-body">
                            {randomQuote ? (
                                <>
                                    <h5 className="card-title">- {randomQuote.author || "No Author"}</h5>
                                    <p className="card-text">&quot;{randomQuote.text}&quot;</p>
                                </>
                            ) : (
                                <h2>Loading</h2>
                            )}

                            <div className="d-flex justify-content-evenly">
                                <button onClick={getNewQuote} className="g-col-4 btn btn-primary ml-3">New Quote</button>
                                <a href={"https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" +
                                    encodeURIComponent(
                                        '"' + randomQuote.text + '"' + randomQuote.author
                                    )
                                }
                                    target="_blank" className="g-col-4 btn btn-warning">
                                    <i className="fa fa-twitter"></i>
                                </a>
                                <a href={"https://www.tumblr.com/widgets/share/too?posttype=quote&tags=quotes,freecodecamp&caption=" +
                                    encodeURIComponent(randomQuote.author) +
                                    "&content=" +
                                    encodeURIComponent(randomQuote.text) +
                                    "&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbutton&shareSource=thumbr_share_button"
                                }
                                    className="g-col-4 btn btn-danger">
                                    <i className="fa fa-tumblr"></i>
                                </a>
                                <a
                                    href={`whatsapp://send?text=${encodeURIComponent(
                                        `"${randomQuote.text}" - ${randomQuote.author}`
                                    )}`}
                                    target="_blank"
                                    className="g-col-4 btn btn-success"
                                >
                                    <i className="fa fa-whatsapp"></i>
                                </a>

                            </div>
                        </div>
                    </div>
                </div>


            </div>
            <p className="text-center">By Arnaud</p>
        </div>

    );

}

ReactDOM.render(<App />, document.getElementById('app'))