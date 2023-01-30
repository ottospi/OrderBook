import {
  Table,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  TableBody
} from '@mui/material';
import { info } from '../../types';

interface Iprops {
  data: info[];
  type: string;
  refValue: {
    label: string;
    value: number;
  };
}

export default function TableOrderBook(props: Iprops) {
  let treatData = props.data;

  let mapped = treatData.map(function (el, i) {
    return { index: i, value: el };
  });

  mapped.sort(function (a, b) {
    return (
      +(Number(a.value?.[1]) > Number(b.value?.[1])) ||
      +(Number(a.value?.[1]) === Number(b.value?.[1])) - 1
    );
  });

  const results = mapped.filter((el) => Number(el?.value?.[1]) >= props.refValue.value);

  return (
    <>
      <TableContainer>
        <Table
          sx={{
            [`& .${tableCellClasses.root}`]: { borderBottom: 'none' }
          }}
          size="small"
          aria-label="a dense table">
          {props.type === 'sell' && (
            <TableHead>
              <TableRow>
                <TableCell>Price</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell align="right">Total</TableCell>
              </TableRow>
            </TableHead>
          )}

          <TableBody>
            {results.slice(0, 5).map((row) => (
              <TableRow key={row?.value?.[0]}>
                <TableCell
                  sx={{ color: props.type === 'sell' ? 'secondary.main' : 'primary.main' }}
                  component="th"
                  scope="row">
                  {Number(row?.value?.[0]).toFixed(2)}
                </TableCell>
                <TableCell align="right">{Number(row?.value?.[1]).toFixed(5)}</TableCell>
                <TableCell align="right">
                  {(Number(row?.value?.[0]) * Number(row?.value?.[1])).toFixed(5)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
