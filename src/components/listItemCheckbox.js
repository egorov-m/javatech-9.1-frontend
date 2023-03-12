import {Component} from 'react';
import Checkbox from "@mui/material/Checkbox";
import LoopIcon from '@mui/icons-material/Loop';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

class ListItemCheckbox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: false,
            isLoaded: true,
            item: props.item,
            labelId: props.labelId,
            checked: props.checked,
            setChecked: props.setChecked
        };
        this.checkbox = <Checkbox
            edge="start"
            key={this.state.item.id}
            tabIndex={-1}
            disableRipple
            color="success"
            defaultChecked={this.state.item.state === 'PURCHASED'}
            onChange={this.handleToggle(this.state.item)}
            inputProps={{'aria-labelledby': this.state.labelId}}
        />
        if (this.state.item.state === 'PURCHASED') {
            this.state.checked.push(this.state.item.id);
        }
    }

    fetchStateData = async (item, state) => {
        this.setState({
            //isLoaded: false
        });

        item.state = state;
        return await fetch("//127.0.0.1:8080/api/v1/purchase/" + item.id, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: item.id, title: item.title, description: item.description, state: state})
        })
            .then(
                (response) => {

                    this.setState({
                        isLoaded: true,
                    });
                },
                (error) => {
                    this.setState({
                        error: true
                    });
                }
            )
    };

    handleToggle = (item) => () => {
        if (item.state === "PURCHASED")
        {
            this.fetchStateData(item, "SELECTED").then(() => {
                if (!this.state.error) {
                    const currentIndex = this.state.checked.indexOf(item.id);
                    this.state.checked.splice(currentIndex, 1);
                }
            });
        } else {
            this.fetchStateData(item, "PURCHASED").then(() => {
                if (!this.state.error) {
                    this.state.checked.push(item.id);
                }
            });
        }
    };

    render() {
        const {error, isLoaded} = this.state;

        if (error) {
            return (
                <ErrorOutlineIcon
                    size="small"
                    aria-label="error"
                />
            );
        } else if (!isLoaded) {
            return (
                <LoopIcon
                    size="small"
                    aria-label="error"
                />
            );
        } else {
            return (
                this.checkbox
            );
        }
    }
}

export default ListItemCheckbox;