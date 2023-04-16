import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SelectExpenseList from './SelectExpenseList';

export default function ExpensesDropdown(props) {
  const [expanded, setExpanded] = React.useState(false);
  const [displayValue, setDisplayValue] = React.useState('all');

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const changeSetAs = (value, arr) => {
    setDisplayValue(value);
    props.updateExpenseDisplayed(arr);
  }

  return (
    <div>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          sx={{display: 'flex', alignItems: 'center', background: 'rgb(203, 204, 206)', borderRadius: '4px', borderBottom: '2px solid rgb(168, 171, 178)'}}
        >
          <Typography sx={{flexShrink: 0, mr: 2, color: 'text.secondary'}}>
            Expenses
          </Typography>
          <Typography sx={{ color: 'rgb(137, 140, 147)'}}>Displaying: {displayValue}</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{background: 'rgb(241, 243, 247)', borderTop: '4px solid rgb(168, 171, 178)', marginTop: '-3px', borderRadius: '0px 0px 4px 4px'}}>
          <SelectExpenseList ExpensesArr={props.ExpensesArr} inputValue={changeSetAs}/>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}