import React, { Component } from 'react';
import './App.css';
import './App.sass';
import Chapters from './Chapters';
import Errors from './Errors';
import ErrorBoundary from './ErrorBoundary';
import ErrorsMsg from './ErrorsMsg';
import Footer from './Footer';
import config from './config';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isAppLoading: true,
      isChapterLoading: false,
      chaptersCounter: 0,
      errorsCounter: 0,
      chapters: [],
      errors: []
    };

    this.getResource = this.getResource.bind(this);
    this.addNextChapter = this.addNextChapter.bind(this);
    this.handleError = this.handleError.bind(this);
    this.handleChoice = this.handleChoice.bind(this);
  }

  handleError(error, errorInfo) {
    const errorObj = {
      error: error,
      errorInfo: errorInfo,
      id: `${this.state.errorsCounter + 1}@${Date.now()}`
    };
    this.setState(prevState => {
      return {
        errors: [...prevState.errors, errorObj],
        errorsCounter: prevState.errorCounter + 1
      };
    });
    // throw new Error(errorObj.errorInfo);
  }

  handleChoice(e) {
    const nextId = e.target.attributes.getNamedItem('data-to-id').value;
    const originIndex = e.target.attributes.getNamedItem('data-index').value;
    this.setState(prevState => {
      prevState.chapters[originIndex].transitionData.map(t => {
        return (t.disabled = true);
      });
    });
    this.addNextChapter(nextId);
  }

  getResource(url, { errorTitle, errorBody }) {
    return fetch(url)
      .then(res => {
        if (res.ok === false) {
          this.handleError(errorTitle, errorBody);
          throw new Error(errorBody);
        }
        return res.json();
      })
      .catch(err => {
        const errorApiMessage = 'Problem z połączeniem z API';
        this.handleError(errorTitle, errorApiMessage);
        throw new Error(errorApiMessage);
      });
  }

  async addNextChapter(id) {
    this.setState({ isChapterLoading: true });
    const fetchStatePromise = this.getResource(
      `${config.gameAdres}API/states/${id}`,
      {
        errorTitle: 'Błąd',
        errorBody: 'Nie udało się pobrać danych o rozdziale'
      }
    );

    const fetchTransitionPromise = this.getResource(
      `${config.gameAdres}API/transitions/${id}`,
      {
        errorTitle: 'Błąd',
        errorBody: 'Nie udało się pobrać danych o przejściu'
      }
    );

    return Promise.all([fetchStatePromise, fetchTransitionPromise])
      .then(([state, transition]) => {
        const stateData = state;
        const transitionData = transition;
        const id = `${this.state.chaptersCounter + 1}@${Date.now()}`;
        if (!stateData || !transitionData) {
          this.handleError('Błąd', 'Błąd');
          throw new Error('Błąd');
        }
        transitionData.map(transition => (transition['disabled'] = false));
        this.setState(prevState => {
          return {
            isChapterLoading: false,
            chapters: [
              ...prevState.chapters,
              {
                stateData,
                transitionData,
                id
              }
            ],
            chaptersCounter: prevState.chaptersCounter + 1
          };
        });
      }) //?
      .catch(err => {
        console.error(err);
      });
  }

  componentDidMount() {
    (async () => {
      await this.addNextChapter(config.firstStateId);
      this.setState({
        isAppLoading: false,
        isChapterLoading: false
      });
    })();
  }

  render() {
    let errors = null;
    let errorsMsgDownload = null;
    if (this.state.errors && this.state.errors.length !== 0) {
      errors = <Errors className="errors" errors={this.state.errors} />;
      errorsMsgDownload = <ErrorsMsg msg="Nie udało się pobrać danych" />;
    }

    return (
      <div className="App">
        <header>
          <h1 className="title">Game of Choices</h1>
        </header>
        <main className="Site-content">
          <section>{errorsMsgDownload}</section>
          <section>{errors}</section>
          <section>
            <ErrorBoundary>
              <br />
              {this.state.isAppLoading ? (
                // '...'
                <img src="45.gif" alt="loading spinner" />
              ) : (
                <Chapters
                  chaptersData={this.state.chapters}
                  handleChoice={this.handleChoice}
                />
              )}
              <br />
              {this.state.isChapterLoading && !this.state.isAppLoading && (
                <img src="45.gif" alt="loading spinner" />
              )}
            </ErrorBoundary>
          </section>
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
