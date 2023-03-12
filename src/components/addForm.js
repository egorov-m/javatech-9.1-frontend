import React, {Component} from 'react';
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

class AddForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: 'Purchase',
            description: 'Purchase description',
            itemsList: props.itemsList
        };

        this.handleClick = this.handleClick.bind(this);
    }

    async handleClick(event) {
        event.preventDefault();
        const purchase = {title: this.state.title, description: this.state.description, state: 'SELECTED'};
        await fetch("//127.0.0.1:8080/api/v1/purchase", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(purchase)
        })
            .then(response => response.json())
            .then(
            (response) => {
                this.state.itemsList.push(response);
                window.location.reload();
            },
            (error) => {

            }
        );
    };

    render() {
        return (
            <form noValidate autoComplete="off" style={{alignItems: 'center'}}>
                <TextField
                    required
                    id="outlined-required"
                    label="Title"
                    defaultValue={this.state.title}
                    value={this.state.title}
                    onChange={(event) => {this.setState({title: event.target.value})}}
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Description"
                    defaultValue={this.state.description}
                    sx={{marginLeft: '24px'}}
                    value={this.state.description}
                    onChange={(event) => {this.setState({description: event.target.value})}}
                />
                <Fab
                    size="small"
                    color="inherit"
                    aria-label="add"
                    sx={{marginLeft: '24px'}}
                    onClick={this.handleClick}
                >
                    <AddIcon />
                </Fab>
            </form>
        );
    }
}

export default AddForm;