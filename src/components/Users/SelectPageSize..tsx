import React, {useState,useEffect} from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {TControlledOpenSelectProps} from "../GlobalTypes/UsersTypes/UsersTypes";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            display: 'block',
            marginTop: theme.spacing(2),
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
    }),
);

const ControlledOpenSelect : React.FC<TControlledOpenSelectProps> = (props) => {
    const classes = useStyles();
    const [count, setCount] = useState<string | number>('');
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setCount(props.PageSize)
        }, [props.PageSize]
    )

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setCount(event.target.value as number);
        props.OnPageSizeChange(event.target.value as number)
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <div>

            <FormControl className={classes.formControl}>
                <InputLabel id="demo-controlled-open-select-label">show users</InputLabel>
                <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    value={count}
                    onChange={handleChange}
                >

                    <MenuItem value={20}>20</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                    <MenuItem value={100}>100</MenuItem>
                </Select>
            </FormControl>

        </div>
    );
}
export default ControlledOpenSelect