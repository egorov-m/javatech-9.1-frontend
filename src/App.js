import './App.css';
import Header from './components/header'
import Container from '@mui/material/Container';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import createTheme from '@mui/material/styles/createTheme';
import ShoppingList from './components/shoppingList';
import {Component} from "react";
import AddForm from "./components/addForm";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#000',
        },
    },
});

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            itemsList: []
        };
    }

    render() {
        return(
            <div className="App">
                <ThemeProvider theme={darkTheme}>
                    <Header/>
                    <Container
                        sx={{paddingTop: '24px', textAlign: 'left'}}
                    >
                        <AddForm
                            itemsList={this.state.itemsList}
                        />
                        <ShoppingList />
                    </Container>
                </ThemeProvider>
            </div>
        );
    }
}

export default App;