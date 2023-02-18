import { Grid } from '@mui/material';
import DocumentCard from './DocumentCard';

export default function DocumentList({ docs, onDocumentClick, ...props }) {
  return (
    <Grid container spacing={3} {...props}>
      {docs?.map((doc) => (
        <Grid key={doc._id} item xs={12} sm={6} md={3}>
          <DocumentCard doc={doc} onClick={() => onDocumentClick(doc)} />
        </Grid>
      ))}
    </Grid>
  );
}
