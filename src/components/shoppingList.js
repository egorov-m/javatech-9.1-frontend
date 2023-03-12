import React, {Component} from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemCheckbox from "./listItemCheckbox";
import DeleteButton from "./deleteButton";

class ShoppingList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            itemsList: [],
            checked: [],
        };
    }

    /**
     * Вызывается сразу полсе монтирования
     */
    async componentDidMount() {
        await fetch("//127.0.0.1:8080/api/v1/purchase", {
            method: 'GET'
        })
            .then(response => response.json())
            .then(
                (response) => {
                    this.setState({
                        isLoaded: true,
                        itemsList: response
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error: error
                    });
                }
            )
    }

    render() {
        const {error, isLoaded, itemsList} = this.state;

        const list = <List sx={{width: '100%', bgcolor: '#000'}}>
            {
                itemsList.map((item, key) => {
                    const labelId = `checkbox-list-secondary-label-${item.id}`;
                    return (
                        <div>
                            <ListItem>
                                <ListItemButton role={undefined} dense>
                                    <ListItemIcon>
                                        <ListItemCheckbox
                                            item={item}
                                            labelId={labelId}
                                            checked={this.state.checked}
                                            setChecked={this.state.setChecked}
                                        />
                                    </ListItemIcon>
                                </ListItemButton>

                                <ListItemText
                                    id={labelId}
                                    primary={
                                        <React.Fragment>
                                            <Typography
                                                sx={{display: 'inline'}}
                                                component="span"
                                                variant="body2"
                                                color="#fff"
                                            >
                                                {item.title}
                                            </Typography>
                                        </React.Fragment>
                                    }
                                    secondary={item.description}
                                />
                                <ListItemButton role={undefined} dense>
                                    <ListItemIcon>
                                        <DeleteButton
                                            item={item}
                                            itemsList={itemsList}
                                        />
                                    </ListItemIcon>
                                </ListItemButton>
                            </ListItem>
                            <Divider variant="inset" component="li"/>
                        </div>
                    );
                })
            }
        </List>

        if (error) {
            return <p> Error {error.message} </p>
        } else if (!isLoaded) {
            return <p> Loading... </p>
        } else {
            return (
                list
            );
        }
    }
    }

    export default ShoppingList;