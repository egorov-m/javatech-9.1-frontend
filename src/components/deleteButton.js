import React, {Component} from 'react';
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import IconButton from "@mui/material/IconButton";

class DeleteButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            item: props.item,
            itemsList: props.itemsList
        }

        this.handleClick = this.handleClick.bind(this);
    }

    async handleClick(event) {
        event.preventDefault();
        await fetch("//127.0.0.1:8080/api/v1/purchase/" + this.state.item.id, {
            method: 'DELETE'
        })
            .then(
                (response) => {
                    const currentIndex = this.state.itemsList.indexOf(this.state.item);
                    this.state.itemsList.slice(currentIndex, 1);
                    window.location.reload();
                },
                (error) => {

                }
            );
    };

    render() {
        return (
            <IconButton
                size="small"
                aria-label="delete"
                onClick={this.handleClick}
            >
                <ClearOutlinedIcon/>
            </IconButton>
        );
    }
}

export default DeleteButton;