import './App.css';
import Header from './components/header'
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import createTheme from '@mui/material/styles/createTheme';
import ShoppingList from './components/shoppingList';
import {Component} from "react";

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
                    <Container>
                        <Button
                            color="inherit"
                            variant="contained"
                            startIcon={<AddCircleIcon/>}
                        >
                            Add purchase
                        </Button>
                        <ShoppingList />
                    </Container>
                </ThemeProvider>
            </div>
        );
    }
}

export default App;