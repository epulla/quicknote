import { Grid, Typography } from "@mui/material";

type TitleRowProps = {
  title: string;
  imageSrc: string | undefined;
};

const TitleRow = ({ title, imageSrc }: TitleRowProps) => (
  <Grid id="title-row" item textAlign="center">
    <Typography variant="h3">{title}</Typography>
  </Grid>
);

export default TitleRow;
