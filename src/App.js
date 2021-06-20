import { Component } from "react";

class App extends Component {
  state = {
    cats: [],
  };
  catsImg = [
    "abyssinian-cat",
    "american-wirehair-cat",
    "bengal-cat",
    "birman-cat",
    "cat",
    "bobtail-cat",
    "bobtail-cat",
    "cymric-cat",
    "cymric-cat",
    "pussy-cat",
  ];

  renderCats() {
    let i = 0;
    let cats = [];
    while (i < this.getRandomArbitrary(1, 20)) {
      cats.push({
        pageX: this.getRandomArbitrary(1, 1000),
        pageY: this.getRandomArbitrary(1, 1000),
        transitionDuration: this.getRandomArbitrary(2, 10),
        isTitle: false,
        id: Math.random(),
        img: `/assets/icons/${
          this.catsImg[this.getRandomArbitrary(1, 10)]
        }.svg`,
      });
      i++;
    }

    this.setState({
      cats: [...cats],
    });
  }

  getRandomArbitrary(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
  handleMouseMove = (e) => {
    let cats = this.state.cats.map((item) => {
      return { ...item, pageX: e.pageX, pageY: e.pageY };
    });

    this.setState({
      cats: [...cats],
    });
  };

  handdleOnCat = (e) => {
    let index;
    if (e.target.closest("img").id) {
      index = this.state.cats.findIndex(
        (item) => item.id === +e.target.closest("img").id
      );
      let cats = this.state.cats;
      cats[index].isTitle = true;
      this.setState({
        cats: [...cats],
      });
    }
  };
  render() {
    return (
      <>
        {this.state.cats.map((item) => {
          return (
            <div
              key={item.id}
              style={{
                left: item.pageX + "px",
                top: item.pageY + "px",
                transitionDuration: item.transitionDuration + "s",
              }}
            >
              <p
                style={{
                  display: item.isTitle ? "block" : "none",
                }}
              >
                Покорми меня!
              </p>
              <img
                onMouseOver={this.handdleOnCat}
                id={item.id}
                src={item.img}
                alt="Cat"
              />
            </div>
          );
        })}
      </>
    );
  }
  componentWillUnmount() {
    document.removeEventListener("mousemove", this.handleMouseMove);
  }

  componentDidMount() {
    this.renderCats();
    console.log("start");
    document.addEventListener("mousemove", this.handleMouseMove);
  }
}

export default App;
