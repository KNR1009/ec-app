import React from 'react'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const SelectBox = (props) => {
  return (
    <FormControl>
      <InputLabel>{props.label}</InputLabel>
      <Select
        required = {props.required}
        value={age}
        onChange={(event)=> props.select(event.target.value)}
      >
        {props.options.map((option)=>{
          <MenuItem key={option.id} value={option.id} >{option.name}</MenuItem>;
        })}

        
      </Select>
    </FormControl>
  );
}

export default SelectBox;