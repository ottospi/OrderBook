import { useState, useRef } from 'react';
import { useWebSocket } from 'react-use-websocket/dist/lib/use-websocket';
import TableOrderBook from './components/TableOrderBook';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import {
  Typography,
  Grid,
  Box,
  FormControl,
  TextField,
  Autocomplete,
  Button,
  Paper
} from '@mui/material';
import { valuesListTypes } from '../types';

const valuesList: valuesListTypes = [
  { label: '0.01', value: 0.01 },
  { label: '0.1', value: 0.1 },
  { label: '1', value: 1 },
  { label: '10', value: 10 },
  { label: '50', value: 50 },
  { label: '100', value: 100 }
];

export default function Home() {
  const [oldAvgPrice, setOldAvgPrice] = useState<string>('');
  const [sell, setSell] = useState<[]>([]);
  const [buy, setBuy] = useState<[]>([]);
  const [code, setCode] = useState<string>('btcusdt');
  const text = useRef<any>();
  const [inputValue, setInputValue] = useState<Object>(valuesList[0]);
  const [dataPrice, setDataPrice] = useState<string>('');

  const handleSubmit = () => {
    setCode(text?.current.value?.toLowerCase());
  };

  const { lastJsonMessage } = useWebSocket(
    `wss://stream.binance.com:9443/ws/${code.toLowerCase()}@depth`,
    {
      onOpen: () => {},
      onMessage: () => {
        if (lastJsonMessage) {
          setSell(lastJsonMessage!.b);
          setBuy(lastJsonMessage!.a);
        }
      },
      onError: (event) => {
        console.log(event);
        console.error(event);
      },
      shouldReconnect: () => true,
      reconnectInterval: 3000
    }
  );

  const { lastJsonMessage: lastDataTicker } = useWebSocket(
    `wss://stream.binance.com:9443/ws/${code.toLowerCase()}@ticker`,
    {
      onOpen: () => {},
      onMessage: () => {
        if (lastDataTicker) {
          setOldAvgPrice(dataPrice ?? '-');
          setDataPrice(lastDataTicker.c);
        }
      },
      onError: (event) => console.error(event),
      shouldReconnect: () => true,
      reconnectInterval: 3000
    }
  );

  let statusPrice = dataPrice >= oldAvgPrice ? 'up' : 'down';
  return (
    <Grid container>
      <Grid
        item
        xs={12}
        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', m: 1 }}>
        <h1>Order Book</h1>
        <Autocomplete
          disablePortal
          id="SizeSelect"
          disableClearable
          options={valuesList}
          value={inputValue}
          color="info"
          sx={{ width: 100 }}
          onChange={(event: any, newValue: object) => {
            setInputValue(newValue);
          }}
          getOptionLabel={(option: any) => option.label}
          isOptionEqualToValue={(option: any) => option.label}
          PaperComponent={({ children }) => (
            <Paper style={{ background: '#2C3139' }}>{children}</Paper>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              sx={{
                '& label.Mui-focused': { color: 'yellow', backgroundColor: '#2C3139' },
                '& .MuiInput-underline:after': { borderBottomColor: 'yellow' },
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': { borderColor: 'yellow' },
                  '&.Mui-focused fieldset': { borderColor: 'yellow' }
                }
              }}
            />
          )}
        />
      </Grid>

      <Grid item xs={12}>
        <FormControl sx={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            sx={{
              '& .MuiInputBase-input': { backgroundColor: '#2C3139', borderRadius: 2 },
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': { borderColor: 'yellow' },
                '&.Mui-focused fieldset': { borderColor: 'yellow' }
              }
            }}
            color="info"
            label="Enter the currency pair code."
            variant="outlined"
            defaultValue={code}
            inputRef={text}
          />
          <Button
            variant="contained"
            type="submit"
            color="info"
            sx={{ my: 2 }}
            onClick={handleSubmit}>
            Search
          </Button>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <TableOrderBook type={'sell'} data={sell} refValue={inputValue} />
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', mx: 2 }}>
          <Typography
            variant="h4"
            sx={{
              color: statusPrice == 'up' ? 'primary.main' : 'secondary.main',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            {dataPrice && Number(dataPrice).toFixed(2)}
            {dataPrice && (statusPrice == 'up' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />)}
          </Typography>
          &nbsp;&nbsp;
          <Typography variant="h5">{oldAvgPrice && Number(oldAvgPrice).toFixed(2)}</Typography>
        </Box>
        <TableOrderBook type={'buy'} data={buy} refValue={inputValue} />
      </Grid>
    </Grid>
  );
}
