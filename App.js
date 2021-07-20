import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import WinOverlay from "./win_overlay";
import { getGameStatus } from "./game";
import ScaleIn from "./scalein";

export default class App extends Component {
  state = {
    user: "♟",
    moves: {},
    boardSize: 5,
  };

  async componentDidMount() {
    const values = await AsyncStorage.multiGet(["XWins", "OWins"]);
    this.setState({
      [values[0][0]]: parseInt(values[0][1], 10) || 0,
      [values[1][0]]: parseInt(values[1][1], 10) || 0
    });
  }

  updateStorage = (XWins, OWins) => {
    AsyncStorage.multiSet([["XWins", `${XWins}`], ["OWins", `${OWins}`]]);
  };

  increaseBoardSize = () => {
    this.setState({
      boardSize: this.state.boardSize + 1,
    });
  }

  decreaseBoardSize = () => {
    this.setState({
      boardSize: this.state.boardSize - 1,
    });
  }

  handleRestart = () => {
    this.setState({
      moves: {},
      user: "♟",
      gameStatus: undefined
    });
  };

  handleReset = () => {
    this.updateStorage(0, 0);
    this.setState({
      XWins: 0,
      OWins: 0
    });
  };

  handlePlaceMove = index => {
    this.setState(
      state => {
        const moves = { ...state.moves, [index]: state.user };
        const gameStatus = getGameStatus(moves, state.boardSize);

        return {
          moves,
          user: state.user === "♟" ? "♙" : "♟",
          gameStatus,
          XWins: gameStatus === "X_WIN" ? (state.XWins += 1) : state.XWins,
          OWins: gameStatus == "O_WIN" ? (state.OWins += 1) : state.OWins
        };
      },
      () => {
        if (this.state.gameStatus) {
          this.updateStorage(this.state.XWins, this.state.OWins);
        }
      }
    );
  };
  render() {
    const { moves, user, gameStatus, boardSize } = this.state;
    const { width } = Dimensions.get("window");

    const squareSize = width / boardSize;
    const squares = [...Array(boardSize * boardSize).keys()];

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.turn}>{user}{' Turn'}</Text>
          <View style={styles.resize}>
            <TouchableOpacity
              style={[styles.resetButton, styles.greenButton]}
              onPress={() => this.decreaseBoardSize()}
            >
              <Text style={styles.resetButtonText}>{'-'}</Text>
            </TouchableOpacity>
            <Text style={styles.turn}>{boardSize}{'x'}{boardSize}</Text>
            <TouchableOpacity
              style={[styles.resetButton, styles.greenButton]} 
              onPress={() => this.increaseBoardSize()}
            >
              <Text style={styles.resetButtonText}>{'+'}</Text>
            </TouchableOpacity>
          </View>   
        </View>
        <View style={styles.content}>
          <View style={styles.board}>
            {squares.map(i => {
              return (
                <View key={i} style={[styles.square, { width: squareSize, height: squareSize }]}>
                  <TouchableOpacity
                    style={styles.touchSquare}
                    onPress={!moves[i] ? () => this.handlePlaceMove(i) : undefined}
                  >
                    {!!moves[i] && (
                      <ScaleIn>
                        <Text style={styles.value}>{moves[i]}</Text>
                      </ScaleIn>
                    )}
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </View>
        <View style={styles.footer}>
          <Text style={styles.winValue}>{this.state.XWins}{' ♟ Wins'}</Text>
          <TouchableOpacity style={styles.resetButton} onPress={this.handleReset}>
            <Text style={styles.resetButtonText}>{'Reset'}</Text>
          </TouchableOpacity>
          <Text style={styles.winValue}>{this.state.OWins}{' ♙ Wins'}</Text>
        </View>
        {!!gameStatus && <WinOverlay value={gameStatus} onRestart={this.handleRestart} />}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    alignItems: "center",
    justifyContent: "center"
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  footer: {
    paddingHorizontal: 20,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  turn: {
    fontSize: 24
  },
  resize: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-around', 
    width: '70%', 
    marginTop: 24
  },
  board: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center"
  },
  square: {
    borderWidth: 1,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center"
  },
  touchSquare: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%"
  },
  value: {
    fontSize: 100
  },
  winValue: {
    fontSize: 18
  },
  resetButton: {
    borderRadius: 8,
    backgroundColor: "tomato",
    paddingHorizontal: 10,
    paddingVertical: 7,
    alignItems: "center",
    justifyContent: "center"
  },
  greenButton: {
    backgroundColor: 'green', 
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  resetButtonText: {
    color: "#FFF",
    fontSize: 20
  }
});
